'use client'
import React, { useEffect } from 'react'
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material'

import { getAcademicYear } from '@/app/api/archive'
import { useRouter } from 'next/navigation'

const StudentData = () => {
    // const yearOptions = ['2022/2023', '2021/2022', '2020/2021']
    const router = useRouter()

    const [yearOptions, setYearOptions] = React.useState<string[]>([])

    const menuItems = [
        { name: 'Student Personal Data', link: '/personal-data/student' },
        { name: 'Student Attendance', link: '/attendance/summary' },
        { name: 'Student Score', link: '/student-score' },
        { name: 'Class', link: '/generator/class/finalize' },
        { name: 'Schedule', link: '/schedule' },
        { name: 'Calendar', link: '/calendar' },
    ]

    useEffect(() => {
        const fetchData = async () => {
            getAcademicYear()
                .then((result) => {
                    console.log(result.data['academic-year'])

                    setYearOptions(result.data['academic-year'].map((item: any) => item.academic_year))
                })
                .catch((error) => {
                    console.error('API request error', error)
                })
        }
        fetchData()
    }, [])

    const handleRedirect = (link: string) => {
        router.push(`${link}?archive=true&ac=${yearOptions[0]}`)
    }

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
                {menuItems.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index} sx={{ cursor: 'pointer' }} >
                        <Card
                            sx={{
                                borderRadius: '12px',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    boxShadow:
                                        '0px 6px 15px rgba(0, 0, 0, 0.15)',
                                },
                            }}
                            onClick={() => handleRedirect(item.link)}
                        >
                            <CardContent>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: '#1A3365',
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default StudentData
