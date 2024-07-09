import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import chatBg from '../constants/chatBg.jpg'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { AttachFile, Send } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import FileMenu from '../components/dialogs/FileMenu'

import MessageComponent from '../components/shared/MessageComponent'
import { getSocket } from '../socket'
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events'
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api'
import { useSocketEvents } from '../hooks/hook'
import { useInfiniteScrollTop } from '6pp'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setIsFileMenu } from '../redux/reducers/misc'
import { removeNewMessagesAlert } from '../redux/reducers/chat'
import { TypingLoader } from '../components/layout/Loaders'
import { useNavigate } from 'react-router-dom'

const Chat = ({chatId, user}) => {
  const containerRef= useRef(null)
  const fileMenuRef= useRef(null)
  const bottomRef= useRef(null)
  const socket= getSocket()
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const [messages,setMessages]= useState([])
  const [message,setMessage]= useState("")
  const [page,setPage]= useState(1)
  const [fileMenuAnchor, setFileMenuAnchor]= useState(null)
  const [IamTyping,setIamTyping]= useState(false)
  const [userTyping,setUserTyping]= useState(false)
  const typingTimeout = useRef(null)
  const chatDetails= useChatDetailsQuery({chatId, skip: !chatId})
  const oldMessagesChunk= useGetMessagesQuery({chatId, page})
  const members= chatDetails?.data?.chat?.members

  const {data: oldMessages,setData: setOldMessages} = useInfiniteScrollTop( containerRef, oldMessagesChunk.data?.totalPages,page,setPage, oldMessagesChunk.data?.messages )
  
  const allMessages= [...oldMessages,...messages]

  const messageOnChange= (e)=>{
    setMessage(e.target.value)
    if(!IamTyping){
      socket.emit(START_TYPING, {members,chatId})
      setIamTyping(true)
    }
    if(typingTimeout.current) 
      clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(()=>{
      socket.emit(STOP_TYPING, {members,chatId})
      setIamTyping(false)
    }, [2000])
  }

  const handleFileOpen = (e)=>{
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }

  const submitHandler= (e)=>{
    e.preventDefault()
    if(!message.trim())  return
    //emitting message to the server
    socket.emit(NEW_MESSAGE, {chatId, members, message })
    setMessage("")
  }

  useEffect(()=>{
    dispatch(removeNewMessagesAlert(chatId))
    return ()=>{
      setMessage("")
      setMessages([])
      setOldMessages([])
      setPage(1)
    }
  },[chatId])

  useEffect(()=>{
    if(bottomRef.current)
      bottomRef.current.scrollIntoView({behaviour: "smooth"})
  },[messages])

  useEffect(()=>{
    if(chatDetails.isError){
      return navigate("/")
    }
  },[chatDetails.isError])

  const newMessagesHandler= useCallback((data)=>{
    if(data.chatId !== chatId)  return
    setMessages((prev)=> [...prev, data.message])
  }, [chatId])

  const startTypingListener= useCallback((data)=>{
    if(data.chatId !== chatId)  return
    setUserTyping(true)
  }, [chatId])
  const stopTypingListener= useCallback((data)=>{
    if(data.chatId !== chatId)  return
    setUserTyping(false)
  }, [chatId])
  const alertListener= useCallback((data)=>{
    if(!data.chatId) return
    if(data.chatId === chatId) return
    const messageForAlert={
      content: data.message,
      sender: {
        _id: "abcdefghij",
        name: "Admin"
      },
      chat: chatId,
      createdAt: new Date().toISOString()
    } 
    setMessages((prev)=> [...prev, messageForAlert])
  },[chatId])


  const eventHandler= {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesHandler, 
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  }
    
  const errors= [{isError: chatDetails.isError, error: chatDetails.error},{isError: oldMessagesChunk.isError, error: oldMessagesChunk.error}]
  useEffect(()=>{
    errors.forEach(({isError,error})=>{
      if(isError){
        return ()=> toast.error(error?.data?.message || 'Something went wrong')
      }
    }) 
  },[errors])

  useSocketEvents(socket,eventHandler)
  
  return chatDetails.isLoading ? <Skeleton/> : (
    <Fragment>
      <Stack ref={containerRef} boxsizzing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={'white'} height={'90%'} sx={{
        overflowX: 'hidden', overflowY: 'auto',
       backgroundImage: `url(${chatBg})`, backgroundRepeat: 'no-repeat' ,backgroundColor: 'skyblue'
      }}>
        {
          allMessages.map(i=> <MessageComponent key={i._id} message={i} user={user}/>)
        }
        {userTyping && <TypingLoader />}
        <div ref={bottomRef}/>

      </Stack>

      <form style={{height:'10%'}} onSubmit={submitHandler}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <IconButton sx={{
             rotate:'30deg'
          }} onClick={handleFileOpen}>
            <AttachFile/>
          </IconButton>
          <InputBox placeholder='Type message here...' value={message} onChange={messageOnChange} />
          <IconButton type='submit' sx={{ backgroundColor: '#ea7070',color:'white',marginLeft: '1rem',padding:'0.5rem','&:hover':{bgcolor:'error.dark',rotate:'-10deg',}
          }}>
            <Send/>
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}/>
    </Fragment>
  )
}

export default AppLayout()(Chat)