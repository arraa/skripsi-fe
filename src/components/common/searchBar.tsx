import { styled, alpha } from '@mui/material/styles';
import Image from 'next/image';
import InputBase from '@mui/material/InputBase';
import { ChangeEvent } from 'react';

interface SearchBarProps {
    setSearchValue: (_value: string) => void;
    SearchName : string;
}

const MainComponent = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 8,
    border: `1px solid ${theme.palette.common.black}`,
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
    display: 'flex',
    alignItems: 'center',
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
            width: '35ch',
        },
    },
}));

function SearchBar(props: SearchBarProps) {
    const { setSearchValue, SearchName } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className='flex shadow-md rounded-xl items-center max-w-72'>
            <div className="pointer-events-none absolute flex justify-center p-4 align-middle">
                <Image
                    src="/icon/icon-search.svg"
                    alt="Search Icon"
                    width={20}
                    height={20}
                />
            </div>
            <StyledInputBase
                placeholder= {'Search ' +SearchName}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchBar;
