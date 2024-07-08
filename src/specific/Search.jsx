import React, { useEffect, useState } from 'react'
import {Dialog, DialogTitle, InputAdornment, List, ListItemText, Stack, TextField} from '@mui/material'
import {useInputValidation} from '6pp'
import {Search} from '@mui/icons-material'
import UserItem from '../components/shared/UserItem'
import { sampleUsers } from '../constants/sampleData'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSearch } from '../redux/reducers/misc'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../redux/api/api'
import toast from 'react-hot-toast'
import axios from 'axios'


const SearchDialog = () => {
  const dispatch= useDispatch()
  const {isSearch}= useSelector((state)=> state.misc)
  const [searchUser]= useLazySearchUserQuery()
  const [sendFriendRequest]= useSendFriendRequestMutation()
  const search= useInputValidation("");
  const [users,setUsers]= useState([])
  let isLoadingSendFriendRequest= false

  const addFriendHandler= async(id)=>{
    try {
      const res= await sendFriendRequest({userId: id})
      if(res.data){
        toast.success("Friend Request sent")
        console.log(res.data)
      }else{
        toast.error(res?.error?.data?.message || "Something went wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const searchCloseHandler= ()=>{
    dispatch(setIsSearch(false))
  }

  //prevent repeated calls of useEffect with every input of character- debouncing
  useEffect(()=>{
    const timeOutId= setTimeout(()=>{
      searchUser(search.value)
      .then(({data})=> setUsers(data.users))
      .catch((error)=> console.log(error))
    },1000)
    return ()=>{
      clearTimeout(timeOutId)
    }
  }, [search.value])

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
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