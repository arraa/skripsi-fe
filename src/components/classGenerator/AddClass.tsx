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
  onDelete?:() => Promise<AxiosResponse<any, any> | undefined>
  open: boolean;
  className: string;
}

export default function AddClass(props: DeleteProps) {
  const { className, setOpen, open } = props;
  const [deleted, setDeleted] = useState(false);

  const handleClose = () => {
    setOpen();
  };

  const handleCreate = async () => {
    
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ color: '#0C4177' }} id="alert-dialog-title">
        Wali Kelas {className}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete student ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
