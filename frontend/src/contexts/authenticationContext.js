import React from 'react'

export default React.createContext({
    accessToken: null,
    userId: null,
    logIn: () => {},
    logOut: (userId, accessToken) => {}
})