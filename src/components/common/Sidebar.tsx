'use client'

// import * as React from "react";
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Image from 'next/image'
import { SIDEBAR } from '@/constant/sidebar/sidebar'
import { Collapse, InputBase } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Montserrat } from 'next/font/google'
import { logout } from '@/app/api/auth'

const monseMontserrat = Montserrat({ subsets: ['latin'] })

const drawerWidth = 215

export default function Sidebar() {
    const [roles, setRoles] = useState<string | null>(null)

    useEffect(() => {
        const storedRoles = sessionStorage.getItem('role')
        setRoles(storedRoles)
    }, [])

    const [open, setOpen] = useState<{ [key: number]: boolean }>({})

    const handleClick = (index: number) => {
        setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }))
    }

    const handleLogout = async () => {
        try {
            const response = await logout()

            console.log(response)

            if (response.status === 200) {
                sessionStorage.clear()
                window.location.href = '/auth/login'
            }
        } catch (error) {}
    }
    const pathname = usePathname()

    console.log(pathname)

    const adjustedSidebar = SIDEBAR.map((item) => {
        // if (roles === 'homeroom_teacher' && item.name === 'Attendance') {
        //     return {
        //         ...item,
        //         link: '/attendance/today',
        //         subMenu: undefined,
        //     }
        // }
        if (roles === 'teacher' && item.name === 'Scoring') {
            return {
                ...item,
                link: '/scoring/subject',
                subMenu: undefined,
            }
        }
        if (
            (roles === 'admin' || roles?.includes('staff')) &&
            item.name === 'Scoring'
        ) {
            return {
                ...item,
                link: '/scoring/summary',
                subMenu: undefined,
            }
        }
        if (
            (roles?.includes('teacher') ||
                roles?.includes('homeroom_teacher')) &&
            item.name === 'Personal Data'
        ) {
            return {
                ...item,
                link: '/personal-data/student',
                subMenu: undefined,
            }
        }
        return item
    })

    const filteredSidebar = adjustedSidebar.filter((item) => {
        if (item.name === 'Generator') {
            return roles?.includes('admin') || roles?.includes('staff')
        } else if (item.name === 'Attendance') {
            return (
                roles?.includes('admin') ||
                roles?.includes('staff') ||
                roles?.includes('homeroom_teacher')
            )
        }
        return true
    })

    return (
        <div className={monseMontserrat.className}>
            <Box sx={{ display: 'flex', marginLeft: '20px' }}>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#0C4177',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '20px 0px',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'end',
                                gap: '20px',
                                paddingLeft: '25px',
                            }}
                        >
                            <Image
                                src="/icon/icon-edu-link.svg"
                                width={35}
                                height={35}
                                alt="logo"
                            />
                            <Typography
                                variant="h5"
                                sx={{ marginBottom: '-5px' }}
                            >
                                EduLink
                            </Typography>
                        </Box>

                        <List>
                            <Divider
                                variant="middle"
                                sx={{ backgroundColor: 'white' }}
                            />
                            {filteredSidebar.map((data, index) => (
                                <div key={index}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => handleClick(index)}
                                        >
                                            {data.subMenu ? (
                                                <>
                                                    <ListItemIcon
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <Image
                                                            src={data.img}
                                                            width={15}
                                                            height={15}
                                                            alt={data.name}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        sx={{
                                                            fontSize: '15px',
                                                            whiteSpace:
                                                                'nowrap',
                                                        }}
                                                        primary={data.name}
                                                    />
                                                    {open[index] ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    )}
                                                </>
                                            ) : (
                                                <Link
                                                    href={data.link}
                                                    className="flex w-full items-center justify-evenly"
                                                >
                                                    {pathname === data.link && (
                                                        <div className="absolute left-0 ml-3 h-2/3 w-[2px] bg-white"></div>
                                                    )}
                                                    <ListItemIcon
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <Image
                                                            src={data.img}
                                                            width={15}
                                                            height={15}
                                                            alt={data.name}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        sx={{
                                                            fontSize: '15px',
                                                        }}
                                                        primary={data.name}
                                                    />
                                                </Link>
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                    {data.subMenu && (
                                        <Collapse
                                            in={open[index]}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List
                                                component="div"
                                                disablePadding
                                            >
                                                {data.subMenu.map(
                                                    (sub, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            href={sub.link}
                                                            className="flex w-full items-center justify-evenly"
                                                        >
                                                            {pathname ===
                                                                sub.link && (
                                                                <div className="absolute left-0 ml-16 h-1/3 w-[2px] bg-white"></div>
                                                            )}
                                                            <ListItemButton
                                                                sx={{ pl: 10 }}
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        sub.name
                                                                    }
                                                                />
                                                            </ListItemButton>
                                                        </Link>
                                                    )
                                                )}
                                            </List>
                                        </Collapse>
                                    )}
                                </div>
                            ))}
                        </List>
                    </Box>

                    <div
                        onClick={handleLogout}
                        className="mb-5 flex gap-4 pl-11 text-lg font-bold"
                    >
                        <Image
                            src={'/icon/icon-logout.png'}
                            width={25}
                            height={25}
                            alt={'logout'}
                        />
                        Logout
                    </div>
                </Drawer>
            </Box>
        </div>
    )
}
