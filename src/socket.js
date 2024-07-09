
import { createContext, useContext, useMemo } from 'react'
import io from 'socket.io-client'
import { server } from './constants/config'

const SocketContent= createContext()
const getSocket= ()=> useContext(SocketContent)

const SocketProvider= ({children})=>{
  const socket=  useMemo(()=> 
    io(server, {withCredentials: true}) 
  ,[])
  return(
    <SocketContent.Provider value={socket}>
      {children}
    </SocketContent.Provider>
  )
}

export {getSocket,SocketProvider}


