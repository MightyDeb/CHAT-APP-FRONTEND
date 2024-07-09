import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'
import {motion} from 'framer-motion'
import { Verified } from '@mui/icons-material'
//onContextMenu---> right click


const ChatItem = ({
  avatar=[],name,_id,groupChat=false,sameSender,isAdmin=false,isOnline,newMessageAlert,index=0,handleDeleteChat
}) => {
  const openProfileDialog=()=>{

  }
  return (
    <Link sx={{padding: '0'}} to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}>
      <motion.div 
        initial={{opacity: 0, y: "-100%"}}
        whileInView={{opacity: 1, y: 0}}
        transition={{delay: index*0.1}}
      style={{
        display: 'flex',
        gap:'1rem',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: sameSender? '#A0502D': '#CCE7E4',
        color: sameSender? 'white': 'unset',
        position: 'relative',
      }}>
        <AvatarCard avatar={avatar} onClick={openProfileDialog}/>
        <Stack>
          <Typography>
            <p style={{
              fontSize: '0.7rem'
            }}>{name}</p>
            {isAdmin && <Verified/>}
          </Typography>
          { newMessageAlert && 
          <Typography>
            <p style={{
              fontSize: '0.7rem'
            }}>{newMessageAlert.count} New Messages</p>
            </Typography>}
        </Stack>
        {isOnline && 
        <Box sx={{
          width:'10px',height:'10px',borderRadius:'50%',backgroundColor: 'green',position:'absolute',top:'50%',right:'1rem',transform:'translateY(-50%)'}} />}
      </motion.div>
    </Link>
  )
}

export default memo(ChatItem)