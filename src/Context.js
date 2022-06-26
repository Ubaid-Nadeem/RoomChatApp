import React, { Children, useState } from 'react'
import Todo from './room'
import CreateRoom from './CreateRoom.js'

export const AppContext = React.createContext({});



export function AppProvider({children}) {
    const [chat, setChat] = useState(false)

    return(
        <AppContext.Provider value={{ chat, setChat }}>
            {children}
        </AppContext.Provider>
    )
}