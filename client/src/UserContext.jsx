import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const Context = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        if(!user){
            axios.get("/profile").then(({data})=>{
                setUser(data)
            })
        }
    })
  return (
    <Context.Provider value={{user, setUser}}>
        {children}
    </Context.Provider>
  )
}

export default UserContext