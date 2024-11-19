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

interface ImportData {
  setOpen: () => any;
  
  handleImport: (file: File | null) => void
  open: boolean;
}

export default function ImportData(props: ImportData) {
  const {  handleImport, setOpen, open } = props;
  const [deleted, setDeleted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClose = () => {
    setOpen();
  };

  const handleSubmit = async () => {
    console.log('handleSubmit clicked');
    try {
      handleImport(selectedFile);
      // setDeleted(true);
      console.log('submit');
    } catch (error) {
      console.error('Failed to submit', error);
    }
    handleClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
    }
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
      maxWidth={'xs'}
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{borderRadius: '30px'}}
    >
      <DialogTitle
        sx={{ color: '#0C4177', fontWeight: 'bold' }}
        id="alert-dialog-title"
      >
        Import
        <hr className="mt-1 border-[#0c42777c]"></hr>
      </DialogTitle>
      <DialogContent>
        <Button size={'full'} variant={'white'}>
          Download Template
        </Button>
        <div className="mt-5 ">
          <div className="text-sm text-[#0c4277c0]">
          {selectedFile ? selectedFile.name : 'Choose File from Your Computer'}
          </div>
          <form>
            <Button className="my-2" size={'full'} variant={'default'}>
              <input
                className="absolute w-full opacity-0"
                accept=".xlsx, .xls"
                type="file"
                onChange={handleFileChange}
                title="Choose a file to import"
              />
              {selectedFile ? 're-Choose File' : 'Choose File'}
            </Button>
          </form>
          <div className="text-[10px]">
            *the file must be in the correct template format
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{paddingX: '25px'}}>
        <Button size={'full'}  variant={'white'} onClick={handleClose}>
          Cancel
        </Button>
        <Button size={'full'}  variant={'default'} onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
