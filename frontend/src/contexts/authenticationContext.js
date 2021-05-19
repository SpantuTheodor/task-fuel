import React from 'react'

export default React.createContext({
    accessToken: null,
    userId: null,
    username: null,
    logIn: () => {},
    logOut: () => {}
})