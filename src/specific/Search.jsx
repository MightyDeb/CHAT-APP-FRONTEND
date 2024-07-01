import React, { useState } from 'react'
import {Dialog, DialogTitle, InputAdornment, List, ListItemText, Stack, TextField} from '@mui/material'
import {useInputValidation} from '6pp'
import {Search} from '@mui/icons-material'
import UserItem from '../components/shared/UserItem'
import { sampleUsers } from '../constants/sampleData'


const SearchDialog = () => {
  const search= useInputValidation("");
  const [users,setUsers]= useState(sampleUsers)
  let isLoadingSendFriendRequest= false
  const addFriendHandler= (id)=>{
    console.log(id)
  }
  return (
    <Dialog open>
      <Stack p={'2rem'} direction={'column'} width={'25rem'}>
        <DialogTitle textAlign={'center'}>Find People</DialogTitle>
        <TextField label="" value={search.value} onChange={search.changeHandler} variant='outlined' size='small' InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search/>
            </InputAdornment>
          )
        }}/>
        <List>
          {users.map((user)=>
            <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest}/>
          )}
        </List>
      </Stack>
    </Dialog>
  )
}

export default SearchDialog