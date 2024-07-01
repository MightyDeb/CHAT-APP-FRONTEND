import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import React, {Suspense, lazy, useState} from 'react'
import { Add, Group, Logout, Menu, Notifications, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
const SearchDialog= lazy(()=> import('../../specific/Search'))
const NotificationDialog= lazy(()=> import('../../specific/Notifications'))
const NewGroupDialog= lazy(()=> import('../../specific/NewGroup'))

const Header = () => {
  const navigate= useNavigate()
  const [isMobile, setIsMobile]= useState(false)
  const [isSearch, setIsSearch]= useState(false)
  const [isNewGroup, setIsNewGroup]= useState(false)
  const [isNotification, setIsNotification]= useState(false)

  const handleMobile=()=>{
    setIsMobile(prev=> !prev)
  }
  const openSearchDialog=()=>{
    setIsSearch(prev=> !prev)
  }
  const openNewGroup=()=>{
    setIsNewGroup(prev=> !prev)
  }
  const openNotification=()=>{
    setIsNotification(prev=> !prev)
  }
  const navigateToGroup=()=>{navigate("/groups")}
  const logoutHandler=()=>{}

  return (
    <div>
      <Box sx={{flexGrow:1}} height={'4rem'}>
        <AppBar position='static' sx={{
          bgcolor: '#ea7070',
        }}>
          <Toolbar >
            <Typography variant='h6' sx={{
              display: {xs: 'none', sm: 'block'}
            }}>Chattu</Typography>
            <Box sx={{display:{xs: 'block', sm: 'none'}}}>
              <IconButton color='inherit' onClick={handleMobile}><Menu/></IconButton>
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
            {
              isNotification && 
                <Suspense fallback={<Backdrop open/>}><NotificationDialog/></Suspense>
            }
            <Tooltip title='Notifications'>
            <IconButton color='inherit' size="large" onClick={openNotification}><Notifications/></IconButton>
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