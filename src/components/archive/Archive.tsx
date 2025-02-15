import React from 'react'
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material'

const ArchivePage: React.FC = () => {
    const yearOptions = ['2022/2023', '2021/2022', '2020/2021']

    return (
        <Box sx={{ padding: '2rem', minHeight: '100vh', width: '100%' }}>
           
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 'bold', color: '#1A3365' }}
                >
                    Archive
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#1A3365',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                    }}
                >
                    {yearOptions[0]}
                </Button>
            </Box>
            <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
                {[
                    'Student Personal Data',
                    'Student Attendance',
                    'Student Score',
                    'Class',
                    'Schedule',
                    'Calendar',
                ].map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card
                            sx={{
                                borderRadius: '12px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    boxShadow:
                                        '0px 6px 15px rgba(0, 0, 0, 0.15)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: '#1A3365',
                                    }}
                                >
                                    {item}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ArchivePage
