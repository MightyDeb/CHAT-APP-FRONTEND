import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducers/misc'
import { Delete, ExitToApp } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAsyncMutation } from '../../hooks/hook'
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api'



const DeleteChatDialog = ({dispatch,deleteOptionAnchor}) => {
  const navigate= useNavigate()
  const {isDeleteMenu,selectedDeleteChat}= useSelector(state=> state.misc)
  const [deleteChat, _,deleteChatData]= useAsyncMutation(useDeleteChatMutation)
  const [leaveGroup, __,leaveGroupData]= useAsyncMutation(useLeaveGroupMutation)
  const chatId= selectedDeleteChat.chatId
  const closeHandler=()=>{
    dispatch(setIsDeleteMenu(false))
    deleteOptionAnchor.current= null
  }

  const leaveGroupHandler=()=>{
    closeHandler()
    leaveGroup("Leaving Group...",{chatId})
  }
  const deleteChatHandler=()=>{
    closeHandler()
    deleteChat("Deleting Chat...",{chatId})
  }

  useEffect(()=>{
    if(deleteChatData || leaveGroupData){
      navigate("/")
    }
  },[deleteChatData,leaveGroupData])
  return (
    <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteOptionAnchor.current} anchorOrigin={{
      vertical: "bottom", horizontal: "right"
    }} transformOrigin={{
      vertical: "center", horizontal: "center"
    }}>
      <Stack sx={{
        width: '10rem', padding: '0.5rem', cursor: 'pointer'
      }} direction={'row'} alignItems={'center'} spacing={'0.5rem'} onClick={selectedDeleteChat.groupChat? leaveGroupHandler : deleteChatHandler}>
        {
          selectedDeleteChat.groupChat? (
            <> <ExitToApp/>
              <Typography>
                <span className='nes-text' style={{fontSize: '0.5rem'}}>Leave Group</span></Typography>
            </>
          ): ( <> <Delete/>
              <Typography>
              <span className='nes-text' style={{fontSize: '0.5rem'}}>Unfriend</span></Typography>
              </> )
        }
      </Stack>
    </Menu>
  )
}

export default DeleteChatDialog