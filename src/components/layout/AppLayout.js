import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Grid } from '@mui/material'
import ChatList from '../../specific/ChatList'
import { sampleChats } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../../specific/Profile'
const AppLayout = ()=> (WrappedComponent)=> {
  return(props)=>{
    const params=useParams()
    const chatId= params.chatId
    const handleDeleteChat=()=>{}
    return(
      <div>
        <Title/>
        <Header/>
        {/* Accoring to M-UI, screen is divided into 12 grids. */}
        <Grid container height={"calc(100vh-4rem)"} >
          <Grid item sm={4} md={3} sx={{
            display: {xs:'none',sm:'block'},
            }} height={'100vh'} >
            <ChatList chats={sampleChats} chatId={chatId} newMessagesAlert={[{chatId,count:4 }]} onlineUsers={['1','2']} handleDeleteChat={handleDeleteChat}/>
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6}height={'100vh'} ><WrappedComponent {...props} /></Grid>
          <Grid item md={4} lg={3} sx={{
            display: {xs:'none',md:'block'},
            padding:'2rem', bgcolor: 'rgb(0,0,0.85)'
          }} height={'100vh'} ><Profile/></Grid>
        </Grid>


      </div>
    )
  } 
}

export default AppLayout