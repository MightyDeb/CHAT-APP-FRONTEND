import React from 'react'
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import {CameraAlt as Camera} from "@mui/icons-material"
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'
import {useFileHandler, useInputValidation, useStrongPassword} from '6pp'
import { userNameValidator } from '../utils/validator'

const handleSignUp= (e)=>{
  e.preventDefault()
}

const Register = () => {
  const name= useInputValidation("")
  const username= useInputValidation("", userNameValidator)
  const bio=useInputValidation("")
  const password=useStrongPassword()
  const avatar= useFileHandler("single",2)
  return (
    <Container component={'main'} maxWidth='xs' sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Paper elevation={3} sx={{
        padding: 4, display: 'flex', 
        flexDirection: 'column', alignItems: 'center'
      }}>
        <Typography variant='h5'>Register</Typography>
        <form style={{
          width: '100%',
          marginTop: '1rem'
        }} onSubmit={handleSignUp}>
          <Stack position={'relative'} width={'10rem'} margin={'auto'}>
            <Avatar sx={{
              width:'10rem', height:'10rem', objectFit:"contain"
            }} src={avatar.preview}/>
            <IconButton sx={{
              position: 'absolute', bottom: '0', right: '0', bgcolor: 'rgba(0,0,0,0.4)', ":hover":{
                bgcolor: 'rgba(255,255,255,0.8)'
              }
            }} component='label'>
              <>
                <Camera/>
                <VisuallyHiddenInput type="file" onChange={avatar.changeHandler}/>
              </>
            </IconButton>
          </Stack>
          {
            avatar.error && (
              <Typography m={"1rem auto"} width={'fit-content'} display={'block'} color='error' variant='caption'>
                {avatar.error}
              </Typography>
            )
          }
          <TextField required fullWidth label='Name' margin='normal' variant='outlined' value={name.value} onChange={name.changeHandler}/>
          <TextField required fullWidth label='Username' margin='normal' variant='outlined' value={username.value} onChange={username.changeHandler}/>
          {
            username.error && (
              <Typography color='error' variant='caption'>
                {username.error}
              </Typography>
            )
          }
          <TextField required fullWidth label='Password' type='password' margin='normal' variant='outlined' value={password.value} onChange={password.changeHandler}/>
          {
            password.error && (
              <Typography color='error' variant='caption'>
                {password.error}
              </Typography>
            )
          }
          <TextField fullWidth label='Bio' margin='normal' variant='outlined' value={bio.value} onChange={bio.changeHandler}/>
          <br/>
          <Button sx={{margin:'1rem'}} variant='contained' color='primary' type='submit'>Register</Button>
          <p>Already registered?  
          <span><Link to='/login'> Sign In </Link></span> </p>
          
        </form>
      </Paper>
    </Container>
  )
}

export default Register