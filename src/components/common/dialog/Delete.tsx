import { Button } from '@/components/common/button/button';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { AxiosResponse } from 'axios';
import { deleteStudent } from '@/app/api/student';

interface DeleteProps {
  setOpen: () => any;
  name: string;
  onDelete:() => Promise<AxiosResponse<any, any> | undefined>
  open: boolean;
}

export default function Delete(props: DeleteProps) {
  const { name, onDelete, setOpen, open } = props;
  const [deleted, setDeleted] = useState(false);

  const handleClose = () => {
    setOpen();
  };

  const handleDelete = async () => {
    console.log('handleDelete clicked');  // Add this for debugging
    try {
      onDelete()
      setDeleted(true);
      console.log('deleted');
    } catch (error) {
      console.error('Failed to delete', error);
    }
    handleClose();
  };
  
  useEffect(() => {
    if (deleted) {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  }, [deleted]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ color: '#0C4177' }} id="alert-dialog-title">
        Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete student ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
