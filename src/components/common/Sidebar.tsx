'use client';

// import * as React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import { SIDEBAR } from '@/constant/sidebar/sidebar';
import { Collapse, InputBase } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '15ch',
        },
    },
}));

export default function Sidebar() {
    const [open, setOpen] = useState<{ [key: number]: boolean }>({});

    const handleClick = (index: number) => {
        setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
    };

    return (
        <Box sx={{ display: 'flex', marginLeft: '30px' }}>
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
                variant='permanent'
                anchor='left'
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
                            paddingLeft: '30px',
                        }}
                    >
                        <Image
                            src='/icon/icon-edu-link.svg'
                            width={40}
                            height={40}
                            alt='logo'
                        />
                        <Typography variant='h5' sx={{ marginBottom: '-5px' }}>
                            EduLink
                        </Typography>
                    </Box>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='Search…'
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <List>
                        <Divider
                            variant='middle'
                            sx={{ backgroundColor: 'white' }}
                        />
                        {SIDEBAR.map((data, index) => (
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
                                                className='flex w-full items-center justify-evenly'
                                            >
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
                                        timeout='auto'
                                        unmountOnExit
                                    >
                                        <List component='div' disablePadding>
                                            {data.subMenu.map(
                                                (sub, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        href={sub.link}
                                                        className='flex w-full items-center justify-evenly'
                                                    >
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

                <Box sx={{ paddingLeft: '30px' }}>profile</Box>
            </Drawer>
        </Box>
    );
}
