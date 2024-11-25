'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { Button } from '../common/button/button';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { columnDataSiswa } from './column';
import Table from '../common/Table';
import { classDataProps, classGeneratorProps } from './types/types';
import { getClass } from '@/app/api/class';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const studentData = [
    // Class A
    { no: 1, name: 'Alice Johnson', gender: 'Female', class: 'A', class_id: 1 },
    { no: 2, name: 'Bob Smith', gender: 'Male', class: 'A', class_id: 1 },
    {
        no: 3,
        name: 'Clara Martinez',
        gender: 'Female',
        class: 'A',
        class_id: 1,
    },
    { no: 4, name: 'David Wilson', gender: 'Male', class: 'A', class_id: 1 },
    { no: 5, name: 'Emma Davis', gender: 'Female', class: 'A', class_id: 1 },
    { no: 6, name: 'Frank Brown', gender: 'Male', class: 'A', class_id: 1 },
    { no: 7, name: 'Grace Lee', gender: 'Female', class: 'A', class_id: 1 },
    { no: 8, name: 'Henry King', gender: 'Male', class: 'A', class_id: 1 },
    { no: 9, name: 'Isla Scott', gender: 'Female', class: 'A', class_id: 1 },
    { no: 10, name: 'Jack White', gender: 'Male', class: 'A', class_id: 1 },

    // Class B
    { no: 11, name: 'Karen Walker', gender: 'Female', class: 'B', class_id: 2 },
    { no: 12, name: 'Liam Lewis', gender: 'Male', class: 'B', class_id: 2 },
    { no: 13, name: 'Mia Hill', gender: 'Female', class: 'B', class_id: 2 },
    { no: 14, name: 'Noah Adams', gender: 'Male', class: 'B', class_id: 2 },
    {
        no: 15,
        name: 'Olivia Brooks',
        gender: 'Female',
        class: 'B',
        class_id: 2,
    },
    { no: 16, name: 'Paul Hall', gender: 'Male', class: 'B', class_id: 2 },
    { no: 17, name: 'Quinn Young', gender: 'Female', class: 'B', class_id: 2 },
    { no: 18, name: 'Ryan Ward', gender: 'Male', class: 'B', class_id: 2 },
    { no: 19, name: 'Sophia Perez', gender: 'Female', class: 'B', class_id: 2 },
    { no: 20, name: 'Tyler Sanders', gender: 'Male', class: 'B', class_id: 2 },

    // Class C
    { no: 21, name: 'Uma Roberts', gender: 'Female', class: 'C', class_id: 3 },
    { no: 22, name: 'Victor Turner', gender: 'Male', class: 'C', class_id: 3 },
    {
        no: 23,
        name: 'Wendy Collins',
        gender: 'Female',
        class: 'C',
        class_id: 3,
    },
    { no: 24, name: 'Xander Evans', gender: 'Male', class: 'C', class_id: 3 },
    { no: 25, name: 'Yara Hughes', gender: 'Female', class: 'C', class_id: 3 },
    { no: 26, name: 'Zachary Green', gender: 'Male', class: 'C', class_id: 3 },
    { no: 27, name: 'Ava Bell', gender: 'Female', class: 'C', class_id: 3 },
    { no: 28, name: 'Ben Foster', gender: 'Male', class: 'C', class_id: 3 },
    { no: 29, name: 'Chloe Carter', gender: 'Female', class: 'C', class_id: 3 },
    { no: 30, name: 'Daniel Ross', gender: 'Male', class: 'C', class_id: 3 },
];

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            // eslint-disable-next-line tailwindcss/no-custom-classname
            children: <span className='MuiTabs-indicatorSpan' />,
        }}
    />
))({
    '& .MuiTabs-indicator': {
        maxWidth: 0,

        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 0,
        width: '100%',
        backgroundColor: 'transparent',
    },
});

interface StyledTabProps {
    label: string;
    value: number;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    color: '#31426E',
    '&.Mui-selected': {
        color: '#fff',
        backgroundColor: '#31426E',
        borderRadius: 6,
    },

    '&.Mui-focusVisible': {
        backgroundColor: '#31426E',
    },
}));

const FinalizeClassGenerator = () => {
    const [selectedGrade, setSelectedGrade] = useState<number>(7);
    const [classData, setClassData] = useState<classDataProps[]>([]);
    const grade = [7, 8, 9];
    const [value, setValue] = useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue);

        setValue(newValue);
    };

    const rows = (id: number) =>
        studentData
            .filter((student) => student.class_id === id)
            .map((student, index) => ({
                id: index + 1,
                ...student,
            }));

    const column = columnDataSiswa();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultClass = await getClass();

                const updatedResultClass = resultClass.data.class.map(
                    (item: { id_grade: number }) => {
                        if (item.id_grade === 1) {
                            return { ...item, id_grade: 7 };
                        } else if (item.id_grade === 2) {
                            return { ...item, id_grade: 8 };
                        } else if (item.id_grade === 7) {
                            return { ...item, id_grade: 9 };
                        }
                        return item;
                    }
                );

                setClassData(updatedResultClass);
            } catch (error) {
                console.error('API request error', error);
            }
        };
        fetchData();
    }, []);

    const handleGradeChange = (value: number) => {
        console.log('handleGradeChange', value);
        setSelectedGrade(value);
    };

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
            <div className='mb-2 flex items-center justify-between'>
                <h1 className='my-8 text-3xl font-bold text-[#0C4177]'>
                    Generate Class
                </h1>
                <div className='flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md'>
                    <select
                        className='mx-2 w-full bg-transparent px-6 py-3 text-lg'
                        value={selectedGrade}
                        onChange={(e) =>
                            handleGradeChange(Number(e.target.value))
                        }
                    >
                        {grade.map((classItem) => (
                            <option key={classItem} value={classItem}>
                                Grade&ensp; {classItem}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='flex  flex-col gap-4 rounded-3xl bg-white p-5 text-[#0c427770] shadow-md'>
                <Box>
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                    >
                        {classData
                            .filter(
                                (classItem) =>
                                    classItem.id_grade === selectedGrade
                            )
                            .map((classItem) => (
                                <StyledTab
                                    key={classItem.id}
                                    label={`${selectedGrade} ${classItem.name}`}
                                    value={classItem.id as number}
                                />
                            ))}
                    </StyledTabs>
                </Box>

                <CustomTabPanel value={value} index={value}>
                    <Table
                        data={rows(value) as unknown as classGeneratorProps[]}
                        columnData={column}
                    />
                </CustomTabPanel>

                <div className='flex justify-end gap-4'>
                    <Button variant={'white'} size={'default'}>
                        Regenerate
                    </Button>

                    <Button size={'default'}>Finalize</Button>
                </div>
            </div>
        </Box>
    );
};

export default FinalizeClassGenerator;
