import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useInputValidation, useStrongPassword} from '6pp'
import { userNameValidator } from '../utils/validator'

const handleLogin= (e)=>{
  e.preventDefault()
}

const Login = () => {
  const username= useInputValidation("", userNameValidator)
  const password=useStrongPassword()
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
        <Typography variant='h5'>Login</Typography>
        <form style={{
          width: '100%',
          marginTop: '1rem'
        }} onSubmit={handleLogin}>
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
          <br/>
          <Button sx={{margin:'1rem'}} variant='contained' color='primary' type='submit'>Login</Button>
          <p>Not registered already?  
          <span><Link to='/register'> Regsiter</Link></span> </p>
        </form>
      </Paper>
    </Container>
  )
}

export default Login