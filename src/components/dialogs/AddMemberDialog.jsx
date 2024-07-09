import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import { sampleUsers } from '../../constants/sampleData'
import toast from 'react-hot-toast'
import UserItem from '../shared/UserItem'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'


const AddMemberDialog = ({chatId}) => {
  const dispatch= useDispatch()
  const {isAddMember}= useSelector(state=> state.misc)
  const {isLoading,data,isError,error}= useAvailableFriendsQuery(chatId)
  
  const [addMembers,isLoadingAddMembers]= useAsyncMutation(useAddGroupMembersMutation)
  
  const [selectedMembers,setSelectedMembers]= useState([])
  
  const errors= [{isError, error}]
  useEffect(()=>{
    errors.forEach(({isError,error})=>{
      if(isError){
        return ()=> toast.error(error?.data?.message || 'Something went wrong')
      }
    }) 
  },[errors])

  const selectMemberHandler=(id)=>{
    setSelectedMembers(prev=> prev.includes(id)? prev.filter((i)=> i!==id) :[...prev,id])
  }
  const addMemberSubmitHandler=()=>{
    addMembers("Adding Mmembers...",{members: selectedMembers,chatId})
    closeHandler()
  }
  const closeHandler=()=>{
    setSelectedMembers([])
    dispatch(setIsAddMember(false))
  }
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'}><h5 className='nes-text is-primary' style={{
          textDecoration: 'underline'
        }}>Add Member</h5></DialogTitle>
        <Stack spacing={'1rem'}>
          { isLoading ? <Skeleton/> : 
          data?.friends?.length>0 ? 
            data?.friends?.map(i=>
              <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
            ) : <Typography textAlign={'center'}>
              <span className='nes-text' style={{fontSize: '0.5rem'}}>No Friends</span></Typography>
          }
        </Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'} alignItems={'center'}>
          <Button color='error' onClick={closeHandler}>Cancel</Button>
          <Button onClick={addMemberSubmitHandler}  disabled={isLoadingAddMembers}>Submit Changes</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AddMemberDialog