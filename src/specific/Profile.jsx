import { AlternateEmail, Face } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
import { transformImage } from '../lib/features'

const Profile = ({user}) => {
  return (
    <Stack spacing={'2rem'}vdirection={'column'} alignItems={'center'}>
      <Avatar sx={{width: 200, height:200, objectFit:'contain', marginBottom:'1rem', border: '5px solid white'}} src={transformImage(user?.avatar?.url)} />
      <ProfileCard heading={'Bio'} text={user?.bio} />
      <ProfileCard heading={'Username'} text={user?.username} Icon={<Face/>}/>
      <ProfileCard heading={'Name'} text={user?.name} Icon={<AlternateEmail/>}/>
      <ProfileCard heading={'Joined'} text={moment(user?.createdAt).fromNow()} Icon={<AlternateEmail/>}/>
    </Stack>
  )
}


const ProfileCard=({text,Icon,heading})=> (
  <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} color={'white'} textAlign={'center'}>
    { Icon && Icon}
    <Stack>
    <Typography variant='body1'>{text}</Typography>
    <Typography color={'gray'} variant='caption'>{heading}</Typography>
    </Stack>
  </Stack>
)

export default Profile