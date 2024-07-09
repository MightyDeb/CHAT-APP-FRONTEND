import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open,handleClose,deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <h5 className='nes-text is-primary' style={{
          textDecoration: 'underline'
        }}>Confirm Delete</h5>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        <span className='nes-text' style={{fontSize: '0.5rem'}}>Are you sure you want to delete this group?</span>
          
        </DialogContentText>
      </DialogContent>
      <DialogActions >
        <Button onClick={handleClose}>No</Button>
        <Button color='error' onClick={deleteHandler}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog