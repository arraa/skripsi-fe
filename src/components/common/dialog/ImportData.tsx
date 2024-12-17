import { Button } from '@/components/common/button/button'
import { useEffect, useState } from 'react'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { AxiosResponse } from 'axios'

interface ImportData {
    setOpen: () => any
    error: string | null
    handleImport: (file: File | null) => Promise<boolean>
    open: boolean
}

export default function ImportData(props: ImportData) {
    const { handleImport, setOpen, open, error } = props
    const [deleted, setDeleted] = useState(false)
    const [load, setLoad] = useState(false)

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleClose = () => {
        setOpen()
    }

    const handleSubmit = async () => {
        setLoad(true)
        try {
            const response = await handleImport(selectedFile)

            if (response) {
                console.log('File uploaded successfully!')
                setLoad(false)
            } else {
                console.log('Failed to upload file.')
                // Handle failure
            }
        } catch (error) {
            setLoad(false)
            setSelectedFile(null)
            console.error('Failed to submit', error)
        }
        // handleClose()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file) // Store the selected file
        }
    }

    useEffect(() => {
        if (deleted) {
            setTimeout(() => {
                window.location.reload()
            }, 200)
        }
    }, [deleted])

    return (
        <Dialog
            maxWidth={'xs'}
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{ borderRadius: '30px' }}
        >
            {load ? (
                <div className="flex h-56 items-center justify-center">
                    loading...
                </div>
            ) : (
                <>
                    <DialogTitle
                        sx={{ color: '#0C4177', fontWeight: 'bold' }}
                        id="alert-dialog-title"
                    >
                        Import
                        <hr className="mt-1 border-[#0c42777c]"></hr>
                    </DialogTitle>
                    <DialogContent>
                        <div className='w-full flex justify-center items-center'>
                            <a
                                className=" text-center size-full rounded-md border border-[#0C4177] bg-white px-4 py-2 font-bold text-[#0C4177]"
                                href="/data_siswa_25.xlsx"
                                download="data_siswa_25.xlsx"
                            >
                                Download Template
                            </a>
                        </div>
                        <div className="mt-5 ">
                            <div className="text-sm text-[#0c4277c0]">
                                {selectedFile
                                    ? selectedFile.name
                                    : 'Choose File from Your Computer'}
                            </div>
                            <form>
                                <Button
                                    className="my-2"
                                    size={'full'}
                                    variant={'default'}
                                >
                                    <input
                                        className="absolute w-full opacity-0"
                                        accept=".xlsx, .xls"
                                        type="file"
                                        onChange={handleFileChange}
                                        title="Choose a file to import"
                                    />
                                    {selectedFile
                                        ? 're-Choose File'
                                        : 'Choose File'}
                                </Button>
                            </form>
                            <div className="text-[10px]">
                                {error ? (
                                    <div className="text-[#ff0000]">
                                        {error}
                                    </div>
                                ) : (
                                    ' *the file must be in the correct template format'
                                )}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ paddingX: '25px' }}>
                        <Button
                            size={'full'}
                            variant={'white'}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            size={'full'}
                            variant={'default'}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    )
}
