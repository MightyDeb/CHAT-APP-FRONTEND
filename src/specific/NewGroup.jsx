import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle,  Skeleton,  Stack, TextField, Typography} from '@mui/material'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/UserItem'
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../redux/api/api'
import toast from 'react-hot-toast'
import { setIsNewGroup } from '../redux/reducers/misc'
import { useAsyncMutation } from '../hooks/hook'

const NewGroup = () => {
  const dispatch= useDispatch()
  const {isNewGroup}= useSelector(state=> state.misc)
  const {isError,isLoading,error,data}= useAvailableFriendsQuery()
  const [newGroup,isLoadingNewGroup]= useAsyncMutation(useNewGroupMutation)
  const groupName= useInputValidation('')
  
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
  const submitHandler=()=>{
    if(!groupName.value){
      return toast.error("Group name is required")
    }
    if(selectedMembers.length < 2){
      return toast.error("Group consists of atleast three members")
    }
    //create group
    newGroup("Creating new group...",{name: groupName.value, members: selectedMembers})
    closeHandler()
  }
  const closeHandler=()=>{
    dispatch(setIsNewGroup(false))
  }
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{xs:'1rem',sm:'3rem'}} width={'25rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant='h4'>New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant='body1'>Members</Typography>
        <Stack>
          { isLoading ? <Skeleton/> : 
            data?.friends?.map((i)=>
            <UserItem user={i} key={i._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />
          )}
        </Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button variant='outlined' color='error' size='large' onClick={closeHandler}>Cancel</Button>
          <Button variant='contained' size='large' onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup