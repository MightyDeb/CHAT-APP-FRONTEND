import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import "@fontsource/press-start-2p"
import React, {Suspense, lazy, useCallback, useEffect, useState} from 'react'
import navLogo from '../../constants/navlogo.png'
import { Add, Edit, Group, ImportContacts, Logout, Menu, Notifications, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../constants/config'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExists } from '../../redux/reducers/auth'
import { setIsMobileMenu, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc'
import { incrementNotifications, resetNotifications } from '../../redux/reducers/chat'
import { getSocket } from '../../socket'
import { NEW_REQUEST } from '../../constants/events'

const SearchDialog= lazy(()=> import('../../specific/Search'))
const NotificationDialog= lazy(()=> import('../../specific/Notifications'))
const NewGroupDialog= lazy(()=> import('../../specific/NewGroup'))




const Header = () => {
  
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const socket= getSocket()
  const {isSearch,isNotification,isNewGroup}= useSelector(state=> state.misc)
  const {notificationCount}= useSelector(state=> state.chat)

  

  const handleMobile=()=>{
    dispatch(setIsMobileMenu(true))
  }
  const openSearchDialog=()=>{
    dispatch(setIsSearch(true))
  }
  const openNewGroup=()=>{
    dispatch(setIsNewGroup(true))
  }
  const openNotification=()=>{
    dispatch(setIsNotification(true))
    dispatch(resetNotifications())
  }
  const navigateToGroup=()=>{navigate("/groups")}


  const getAllCommunitiesHandler=()=>{
    navigate("/communities")
  }
  const editProfileHandler=()=>{}

  const logoutHandler= async()=>{
    try {
      const {data}= await axios.get(`${server}/api/v1/user/logout`,{withCredentials: true})
      dispatch(userNotExists())
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div>
      <Box sx={{flexGrow:1}} height={'4rem'}>
        <AppBar position='static' sx={{
          bgcolor: '#2E8B57',
        }}>
          <Toolbar >
            <Typography variant='h6' sx={{
              display: {xs: 'none', sm: 'block'},
            }}  >
              <h4 className="nes-text" >
                Chit_Chat
            </h4>
            </Typography>
            <Box sx={{display:{xs: 'block', sm: 'none'}}}>
              <IconButton color='inherit' onClick={handleMobile}>
                <Menu/>

              </IconButton>
            </Box>
            <Box sx={{flexGrow: 1,}}/>
            <Box>
            {
              isSearch && 
                <Suspense fallback={<Backdrop open/>}><SearchDialog/></Suspense>
            }
             <Tooltip title='Search'>
             <IconButton color='inherit' size="large" onClick={openSearchDialog}><Search/></IconButton>
            </Tooltip> 
            {
              isNewGroup && 
                <Suspense fallback={<Backdrop open/>}><NewGroupDialog/></Suspense>
            }
            <Tooltip title='New Group'>
            <IconButton color='inherit' size="large" onClick={openNewGroup}><Add/></IconButton>
            </Tooltip> 
            <Tooltip title='Manage Groups'>
            <IconButton color='inherit' size="large" onClick={navigateToGroup}><Group/></IconButton>
            </Tooltip>
            <Tooltip title='All Communities'>
              <IconButton color='inherit' size='large' onClick={getAllCommunitiesHandler}><ImportContacts/></IconButton>
            </Tooltip>
            {
              isNotification && 
                <Suspense fallback={<Backdrop open/>}><NotificationDialog/></Suspense>
            }
            <Tooltip title='Notifications'>
            <IconButton color='inherit' size="large" onClick={openNotification}>
              <Badge badgeContent={notificationCount} color="error"><Notifications/></Badge>
            </IconButton>
            </Tooltip>
            <Tooltip title='Logout'>
            <IconButton color='inherit' size="large" onClick={logoutHandler}><Logout/></IconButton>
            </Tooltip>        
            </Box>
            </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Header