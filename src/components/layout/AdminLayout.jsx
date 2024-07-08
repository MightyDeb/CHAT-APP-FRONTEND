import { Close, ExitToApp, Menu } from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, Link as LinkComponent, Navigate } from 'react-router-dom'
import { adminTabs } from '../../constants/route'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../../redux/thunks/admin'

const Link= styled(LinkComponent)`
text-decoration: none;  border-radius: 2rem;  
padding: 1rem 2rem;  color: black;  
&:hover{ color: rgba(0,0,0,0.54) }`


const Sidebar=({w='100%'})=>{
  const location= useLocation()
  const dispatch= useDispatch()

  const logoutHandler=()=>{
    dispatch(adminLogout())
  }
  return(
    <Stack width={w} p={'3rem'} spacing={'3rem'}>
      <Typography variant='h5'>CHATTU</Typography>
      <Stack spacing={'1rem'}>
        {
          adminTabs.map((tab)=> (
            <>
              <Link key={tab.path} to={tab.path}
              sx={
                location.pathname===tab.path && {
                  bgcolor: 'black', color: 'white', ':hover': {color: '#f5f5f5'}
                }
              }>
                <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
                  {tab.icon}
                  <Typography fontSize={'1.2rem'}>{tab.name}</Typography>
                </Stack>
              </Link>
            </>
          ) )
        }
        <Link onClick={logoutHandler}>
          <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
            <ExitToApp/>
            <Typography fontSize={'1.2rem'}>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  )
}



const AdminLayout = ({children}) => {
  const {isAdmin}= useSelector(state=> state.auth);
  const [isMobile,setIsMobile]=useState(false)
  const handleMobile=()=>{
    setIsMobile(prev=> !prev)
  }
  const handleClose=()=> setIsMobile(false)
  if(!isAdmin) return <Navigate to='/admin' />
  return (
    <Grid container minHeight={'100vh'}>
      <Box sx={{
        display: {xs: 'block', md: 'none'},
        position: 'fixed', right:'1rem', top:'1rem'
      }}>
        <IconButton onClick={handleMobile}>
          {
            isMobile ? <Close/> : <Menu/>
          }
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{
        display: {xs: 'none', md: 'block'}
      }}>
        <Sidebar/>
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{
        bgcolor: 'gray'
      }}>
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w='50vw' />
      </Drawer>
    </Grid>
    
  )
}

export default AdminLayout