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

const drawerWidth = 200

export default function Sidebar() {
    const [roles, setRoles] = useState<string | null>(null)

    useEffect(() => {
        const storedRoles = sessionStorage.getItem('roles')
        setRoles(storedRoles)
    }, [])

    const [open, setOpen] = useState<{ [key: number]: boolean }>({})

    const handleClick = (index: number) => {
        setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }))
    }

    const pathname = usePathname()

    console.log(pathname)

    const adjustedSidebar = SIDEBAR.map((item) => {
        if (roles === 'teacher' && item.name === 'Attendance') {
            return {
                ...item,
                link: '/attendance/today',
                subMenu: undefined,
            }
        } else if (roles === 'teacher' && item.name === 'Scoring') {
            return {
                ...item,
                link: '/attendance/today',
                subMenu: undefined,
            }
        }
        if (roles === 'teacher' && item.name === 'Personal Data') {
            return {
                ...item,
                link: '/personal-data/student',
                subMenu: undefined,
            }
        }
        return item
    })

    const filteredSidebar = adjustedSidebar.filter((item) => {
        if (item.name === 'Generator' || item.name === 'Attendance') {
            return (
                roles === 'admin' || roles === 'staff' || roles === 'homeroom'
            )
        }
        return true
    })

    return (
        <Box sx={{ display: 'flex', marginLeft: '25px' }}>
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
                            width={40}
                            height={40}
                            alt="logo"
                        />
                        <Typography variant="h5" sx={{ marginBottom: '-5px' }}>
                            EduLink
                        </Typography>
                    </Box>

                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='Search…'
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}

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
                                                        width={20}
                                                        height={20}
                                                        alt={data.name}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    sx={{ fontSize: '20px' }}
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
                                                    <div className="absolute left-0 ml-4 h-2/3 w-[2px] bg-white"></div>
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
                                                        width={20}
                                                        height={20}
                                                        alt={data.name}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    sx={{ fontSize: '20px' }}
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
                                        <List component="div" disablePadding>
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

                <Box sx={{ paddingLeft: '25px' }}>profile</Box>
            </Drawer>
        </Box>
    )
}
