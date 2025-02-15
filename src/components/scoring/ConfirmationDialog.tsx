// components/ConfirmationDialog.tsx
import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material'

interface ConfirmationDialogProps {
    open: boolean

    data:{ StudentID: number; Scores: number; StudentName: string }[]
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    data,
    onConfirm,
    onCancel,
}) => {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="md" fullWidth>
            <DialogTitle>Confirm Scoring</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    Are you sure want to submit quiz 1?
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.StudentID}>
                                <TableCell>{row.StudentID}</TableCell>
                                <TableCell>{row.StudentName}</TableCell>
                                <TableCell>{row.Scores}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onCancel}
                    variant="contained"
                    sx={{
                        backgroundColor: '#0C4177',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#07335D',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        backgroundColor: '#0C4177',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#07335D',
                        },
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog
