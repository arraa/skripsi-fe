import React from 'react'
import { Box, Typography, Avatar, Button, Grid } from '@mui/material'

const ProfilePage = () => {
    return (
        <Box sx={{ paddingY: 3, px: 2, paddingLeft: 0, width: '84vw' }}>
            <Typography variant="h4" fontWeight="bold" color="#0C4177" mb={2}>
                Hi, Rifian!
            </Typography>
            <div className="flex flex-col justify-between rounded-3xl  bg-white px-10 py-14 text-[#0c427770] shadow-md h-[80vh]">
                <div>
                    {/* Back Button and Name */}
                    <Box display="flex" alignItems="center" mb={3}>
                        <Button
                            variant="text"
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: 4,
                                minWidth: 'unset',
                                paddingRight: 2,
                                paddingLeft: 2,
                                paddingTop: 1.5,
                                paddingBottom: 1.5,
                                marginRight: 2,
                                color: '#0C4177',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            ⬅
                        </Button>
                    </Box>

                    {/* Profile Information */}
                    <Box display="flex" gap={2} alignItems="center" mb={5}>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color="#0C4177"
                            >
                                Rifian Fernando - Math Teacher
                            </Typography>
                            <Typography variant="body2" color="#0C4177">
                                081298660738
                            </Typography>
                            <Typography variant="body2" color="#0C4177">
                                rifian.fernando@edulink.sch.id
                            </Typography>
                        </Box>
                    </Box>

                    {/* Personal Details */}
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#0C4177"
                        mb={2}
                    >
                        Personal Detail
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="#0C4177"
                            >
                                ID
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="#0C4177">
                                1234567890
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="#0C4177"
                            >
                                Place & Date of Birth
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="#0C4177">
                                Jakarta, 02/11/2002
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="#0C4177"
                            >
                                Religion
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="#0C4177">
                                Buddha
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="#0C4177"
                            >
                                Address
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="#0C4177">
                                Karang Anyar Permai 55 Bl...
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="#0C4177"
                            >
                                Homeroom Teacher
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="#0C4177">
                                Yes
                            </Typography>
                        </Grid>
                    </Grid>
                </div>

                {/* Logout Button */}
                <Box mt={4} display="flex" justifyContent="flex-end">
                    <Button
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
                        Logout
                    </Button>
                </Box>
            </div>
        </Box>
    )
}

export default ProfilePage
