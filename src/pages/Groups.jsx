import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from '@mui/icons-material'
import { Grid, IconButton, Tooltip, Box, Drawer, Stack, Typography, TextField, Button, Backdrop, CircularProgress } from '@mui/material'
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/shared/AvatarCard'
import { sampleChats, sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/UserItem'
import { useAddGroupMembersMutation, useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api'
import { LayoutLoader } from '../components/layout/Loaders'
import { useAsyncMutation } from '../hooks/hook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../redux/reducers/misc'
const AddMemberDialog= lazy(()=> import('../components/dialogs/AddMemberDialog'))
const ConfirmDeleteDialog= lazy(()=> import('../components/dialogs/ConfirmDeleteDialog'))


const Groups = () => {
  const chatId= useSearchParams()[0].get('group')
  const navigate= useNavigate()
  const dispatch= useDispatch()

  const {isAddMember}= useSelector(state=> state.misc)
  const myGroups= useMyGroupsQuery("")
  const groupDetails= useChatDetailsQuery({chatId,populate: true}, {skip: !chatId})
  const [updateGroup,isLoadingGroupName]= useAsyncMutation(useRenameGroupMutation)
  const [removeMember,isLoadingRemoveMember]= useAsyncMutation(useRemoveGroupMemberMutation)
  const [deleteGroup,isLoadingDeleteGroup]= useAsyncMutation(useDeleteChatMutation)
  
  const [isMobileMenuOpen,setIsMobileMenuOpen]= useState(false)
  const [isEdit,setIsEdit]= useState(false)
  const [groupName,setGroupName]= useState('')
  const [groupNameUpdatedValue,setGroupNameUpdatedValue]= useState('')
  const [members,setMembers]= useState([])
  
  const [confirmDeleteDialog,setConfirmDeleteDialog]= useState(false)

  const errors= [{isError: myGroups.isError, error: myGroups.error},{isError: groupDetails.isError, error: groupDetails.error}]
  useEffect(()=>{
    errors.forEach(({isError,error})=>{
      if(isError){
        return ()=> toast.error(error?.data?.message || 'Something went wrong')
      }
    }) 
  },[errors])

  useEffect(()=>{
    if(groupDetails.data){
      setGroupName(groupDetails.data?.chat?.name)
      setGroupNameUpdatedValue(groupDetails.data?.chat?.name)
      setMembers(groupDetails.data?.chat?.members)
    }
    return ()=>{
      setGroupName(""),
      setGroupNameUpdatedValue(""),
      setMembers([]),
      setIsEdit(false)
    }
  },[groupDetails])
  
  const navigateBack=()=>{
    navigate('/')
  }
  const handleMobile=()=>{
    setIsMobileMenuOpen(prev=> !prev)
  }
  const handleMobileClose=()=> setIsMobileMenuOpen(false)
  const updateGroupName=()=>{
    setIsEdit(false)
    updateGroup("Updating Group Name...", {chatId, name: groupNameUpdatedValue})
  }
  const openConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(true)
  }
  const closeConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(false)
  }
  const openAddMemberHandler=()=>{
    dispatch(setIsAddMember(true))
  }
  const deleteHandler=()=>{
    deleteGroup("Deleting Group...", {chatId})
    closeConfirmDeleteHandler()
    navigate("/")
  }
  const removeMemberHandler=(userId)=>{
    removeMember("Removing Member...", {chatId, userId})
  }

  useEffect(()=>{
    if(chatId){
      setGroupName(`Group Name ${chatId}`)
    setGroupNameUpdatedValue(`Group Name ${chatId}`)
    }
    //cleanup function
    return ()=>{
      setGroupName('')
      setGroupNameUpdatedValue('')
      setIsEdit(false)
    }
  },[chatId])

  const IconBtns= <>
    <Box  sx={{
        display:{xs:'block',sm:'none'}, position:'fixed', right:'1rem',top:'1rem'
    }}>
      <IconButton onClick={handleMobile}>
        <Menu/>
      </IconButton>
    </Box>
    <Tooltip title='back'>
      <IconButton sx={{
        position:'absolute', top:'2rem', left: '2rem', bgcolor: 'rgba(0,0,0,0.8)', color: 'white', ':hover': {bgcolor:'rgba(0,0,0,0.7)'}}} onClick={navigateBack}>
        <KeyboardBackspace/>
      </IconButton>
    </Tooltip>
  </>
  const GroupName= <>
  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={'1rem'} padding={'3rem'}>
    { isEdit ? (<>
      <TextField value={groupNameUpdatedValue} onChange={e=> setGroupNameUpdatedValue(e.target.value)}/>
      <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}><Done/></IconButton>
    </>) 
    : (<>
      <Typography variant='h4'>{groupName}</Typography>
      <IconButton onClick={()=> setIsEdit(true)} disabled={isLoadingGroupName}><Edit/></IconButton>
    </>) }    
  </Stack>
  </>
  const ButtonGroup= <Stack direction={{sm: 'row' ,xs: 'column-reverse'}} spacing={'1rem'} p={{ xs: '0', sm: '1rem', md: '1rem 4rem'}}>
    <Button size='large' color='error' startIcon={<Delete/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
    <Button size='large' variant='contained' startIcon={<Add/>} onClick={openAddMemberHandler}>Add Member</Button>
  </Stack>
  return myGroups.isLoading? <LayoutLoader/> :(
    <Grid container height={'100vh'}>
      <Grid item sx={{
        display: { xs: 'none', sm: 'block'}, backgroundImage: 'linear-gradient(rgb(255 225 209), rgb(249 159 159))'
      }} sm={4} >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId}/>
      </Grid>
      <Grid item xs={12} sm={8} sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', padding: '1rem 3rem'
      }}> 
        {IconBtns}
        {groupName && 
        <>
          {GroupName}
          <Typography margin={'2rem'} alignSelf={'flex-start'} variant='body1'>Members</Typography>
          <Stack maxWidth={'45rem'} width={'100%'} boxsizzing={'border-box'} padding={{ sm: '1rem', xs: '0', md: '1rem 4rem'}} spacing={'2rem'} height={'50vh'} overflow={'auto'}>
            { isLoadingRemoveMember ?            <CircularProgress/> :
              members.map(i=>
                <UserItem key={i._id} user={i} isAdded styling={{ boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)', padding: '0.5rem 2rem', borderRadius: '1rem'}} handler={removeMemberHandler}/>
              )
            }
          </Stack>
          {ButtonGroup}
        </>}
      </Grid>
      {
        isAddMember && 
        <Suspense fallback={<Backdrop open/>}> <AddMemberDialog chatId={chatId}/>
        </Suspense>
      }
      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open/>}><ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler}/></Suspense>
      } 
      <Drawer sx={{
        display:{ xs: 'block', sm: 'none'}, 
      }} open={isMobileMenuOpen} onClick={handleMobileClose}>
        <GroupList w={'50vw'} myGroups={myGroups?.data?.groups} chatId={chatId}/>
      </Drawer>
    </Grid>
  )
}

const GroupList=({w='100%', myGroups=[],chatId})=>{
  return <Stack width={w} sx={{backgroundImage: 'linear-gradient(rgb(255 225 209), rgb(249 159 159))', height: '100vh'}}>
    {
      myGroups.length>0 ? myGroups.map((group)=>
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ) : <Typography textAlign={'center'} padding='1rem'>No Groups</Typography>
    }
  </Stack>
}

const GroupListItem= memo(({group, chatId})=>{
  const {name,avatar,_id}= group;
  return( <Link to={`?group=${_id}`} onClick={
    e=>{
      if(chatId===_id)  e.preventDefault()
    }
  }>
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      <AvatarCard avatar={avatar}/>
      <Typography>{name}</Typography>
    </Stack>
  </Link>)
})

export default Groups