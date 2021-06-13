/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { createStore, set as idbSet, get as idbGet} from 'idb-keyval';
const CryptoJS = require("crypto-js");

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

const store = createStore('GraphQL-Cache', 'PostResponses');
const mutationStore = createStore('GraphQL-Mutations-Cache', 'MutationQueue')

// workbox.routing.registerRoute(
//   new RegExp('/graphql(/)?'),
//   // Uncomment below to see the error thrown from Cache Storage API.
//   //workbox.strategies.staleWhileRevalidate(),
//   async ({
//     event
//   }) => {
//     return staleWhileRevalidate(event);
//   },
//   'POST'
// );

self.addEventListener('activate', (event) => {
  console.log("Service worker has been activated.")
})

self.addEventListener('fetch', async (event) => {
  let graphQLRegularExpression = new RegExp('graphql')
  if (event.request.method === 'POST' && graphQLRegularExpression.test(event.request.url)) {
    try{
      await event.respondWith(getResponseByQueryType(event))
    }catch(err){
      console.log("error: ", err)
    }
  }
})

async function getResponseByQueryType(event) {

  let body = await event.request.clone().json()
  if(body.query.startsWith("query")){
    let cachedResponse = await getCache(event.request.clone());
    let fetchPromise = fetch(event.request.clone())
      .then((response) => {
        setCache(event.request.clone(), response.clone());
        return response;
      })
      .catch((err) => {
        console.error(err);
        return cachedResponse
      });
    console.log(1)
    return fetchPromise
  
  
  } else if(body.query.startsWith("mutation")){
    if (!navigator.onLine) {

      return serializeForMutation(event.request).then(async (serialized) => {
  
        let queue = (await idbGet("queue", mutationStore)) || []

        queue.push(serialized)
        console.log(`Setting response to cache.`);

        idbSet('queue', queue, mutationStore);

        console.log(2)

        return new Response(
          JSON.stringify([{
            text: 'You are offline'
          }]),
          { headers: { 'Content-Type': 'application/json' } }
        )
      })

    } else {
      console.log(3)
      flushQueue()
      return fetch(event.request.clone())
    }
  }

}

async function serializeForQuery(response) {
  let serializedHeaders = {};
  for (var entry of response.headers.entries()) {
    serializedHeaders[entry[0]] = entry[1];
  }
  let serialized = {
    headers: serializedHeaders,
    status: response.status,
    statusText: response.statusText
  };
  serialized.body = await response.json();
  return serialized;
}

async function setCache(request, response) {
  let body = await request.json();

  if(body.query.startsWith("query")){

    let bodyVariables;
    for (const [key, value] of Object.entries(body.variables)) {
      bodyVariables = String(key) + String(value);
    }

    let id = CryptoJS.MD5(body.query + bodyVariables).toString();

    console.log(`Setting response to cache.`);

    var entry = {
      query: body.query,
      response: await serializeForQuery(response),
      timestamp: Date.now()
    };
    idbSet(id, entry, store);
  }

}

async function getCache(request) {
  let data;
  try {
    let body = await request.json();

    if(body.query.startsWith("query")){

      let bodyVariables;
      for (const [key, value] of Object.entries(body.variables)) {
        bodyVariables = String(key) + String(value);
      }
      let id = CryptoJS.MD5(body.query + bodyVariables).toString();
      data = await idbGet(id, store);
      if (!data) return null;

      // Check cache max age.
      let cacheControl = request.headers.get('Cache-Control');
      let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
      if (Date.now() - data.timestamp > maxAge * 1000) {
        console.log(`Cache expired. Load from API endpoint.`);
        return null;
      }

      console.log(`Load response from cache.`);
      return new Response(JSON.stringify(data.response.body), data.response);
    }

  } catch (err) {
    return null;
  }
  
}

async function serializeForMutation(request) {
  var headers = {};

  let data = await request.json()

  for (var entry of request.headers.entries()) {
    headers[entry[0]] = entry[1];
  }
  var serialized = {
    body: JSON.stringify(data),
    url: request.url,
    headers: headers,
    method: request.method,
    mode: request.mode,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    referrer: request.referrer
  };

  return Promise.resolve(serialized);
}

async function flushQueue() {

    return await idbGet("queue", mutationStore).then((queue) => {
      /* eslint no-param-reassign: 0 */
      queue = queue || [];

      if (!queue.length) {
        return Promise.resolve();
      }

      console.log('Sending ', queue.length, ' requests...');
      return sendInOrder(queue).then(function() {

        return idbSet('queue', [], mutationStore);
        
      })
    })
  }

  function sendInOrder(requests) {
      var sending = requests.reduce((prevPromise, serialized) => {
        console.log('Sending', serialized.method, serialized.url);
        return prevPromise.then(() => {
          return deserializeForMutation(serialized).then((request) =>{
            return fetch(request);
          });
        });
      }, Promise.resolve());
      return sending;
    }

    function deserializeForMutation(data) {
      return Promise.resolve(new Request(data.url, data));
    }