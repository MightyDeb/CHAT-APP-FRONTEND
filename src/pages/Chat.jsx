import React, { Fragment, useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack, Typography } from '@mui/material'
import { AttachFile, Send } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import FileMenu from '../components/dialogs/FileMenu'
import { sampleMessage } from '../constants/sampleData'
import MessageComponent from '../components/shared/MessageComponent'

const user={
  _id: 'ndnce', name: "Abhishek"
}

const Chat = () => {
  const containerRef= useRef(null)
  const fileMenuRef= useRef(null)
  return (
    <Fragment>
      <Stack ref={containerRef} boxsizzing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={'rgba(247,247,247,0.7)'} height={'90%'} sx={{
        overflowX: 'hidden', overflowY: 'auto'
      }}>
        {
          sampleMessage.map(i=> <MessageComponent key={i._id} message={i} user={user}/>)
        }
      </Stack>

      <form style={{height:'10%'}}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <IconButton sx={{
             rotate:'30deg'
          }} >
            <AttachFile/>
          </IconButton>
          <InputBox placeholder='Type message here...'/>
          <IconButton type='submit' sx={{ backgroundColor: '#ea7070',color:'white',marginLeft: '1rem',padding:'0.5rem','&:hover':{bgcolor:'error.dark',rotate:'-10deg',}
          }}>
            <Send/>
          </IconButton>
        </Stack>
      </form>
      <FileMenu/>
    </Fragment>
  )
}

export default AppLayout()(Chat)