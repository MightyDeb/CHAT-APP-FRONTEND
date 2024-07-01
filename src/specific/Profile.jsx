import { AlternateEmail, Face } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'

const Profile = () => {
  return (
    <Stack spacing={'2rem'}vdirection={'column'} alignItems={'center'}>
      <Avatar sx={{width: 200, height:200, objectFit:'contain', marginBottom:'1rem', border: '5px solid white'}}/>
      <ProfileCard heading={'Bio'} text={'Fuck me or fuck off'} />
      <ProfileCard heading={'Username'} text={'Mighty_Class05'} Icon={<Face/>}/>
      <ProfileCard heading={'Name'} text={'Debapriya Maity'} Icon={<AlternateEmail/>}/>
      <ProfileCard heading={'Joined'} text={moment('2024-06-27T00:00:00.000Z').fromNow()} Icon={<AlternateEmail/>}/>
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