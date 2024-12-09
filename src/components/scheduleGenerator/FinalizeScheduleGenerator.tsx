'use client'

import { Box, Tab, Tabs } from '@mui/material'
import { Button } from '../common/button/button'
import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import Table from '../common/Table'
import { getClass } from '@/app/api/class'
import { columnData } from './column'
import { useReactToPrint } from 'react-to-print'
import PrintSchedule from './PrintSchedule'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
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
]

const dummyData = [
    {
        day: 'Senin',
        timeSlots: [
            {
                waktu: '08:15 - 08:55',
                jamKe: 1,
                periods: {
                    VII: ['1(C)', '5(C)', '23(C)'],
                    VIII: ['10(C)', '11(C)', '12(C)'],
                    IX: ['20(C)', '21(C)', '22(C)'],
                },
            },
            {
                waktu: '08:55 - 09:35',
                jamKe: 2,
                periods: {
                    VII: [''],
                    VIII: [''],
                    IX: [''],
                },
            },
        ],
    },
    {
        day: 'Selasa',
        timeSlots: [
            {
                waktu: '08:15 - 08:55',
                jamKe: 1,
                periods: {
                    VII: ['2(C)', '6(C)', '24(C)'],
                    VIII: ['14(C)', '15(C)', '25(C)'],
                    IX: ['30(C)', '31(C)', '32(C)'],
                },
            },
        ],
    },
]

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

interface StyledTabsProps {
    children?: React.ReactNode
    value: number
    onChange: (event: React.SyntheticEvent, newValue: number) => void
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            // eslint-disable-next-line tailwindcss/no-custom-classname
            children: <span className="MuiTabs-indicatorSpan" />,
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
})

interface StyledTabProps {
    label: string
    value: number
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
}))

const FinalizeScheduleGenerator = () => {
    const [selectedGrade, setSelectedGrade] = useState<number>(7)
    const [classData, setClassData] = useState(['M', 'T', 'W', 'T', 'F'])
    const grade = [7, 8, 9]
    const [value, setValue] = useState(1)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)

        setValue(newValue)
    }

    const rows = (id: number) =>
        studentData
            .filter((student) => student.class_id === id)
            .map((student, index) => ({
                id: index + 1,
                ...student,
            }))

    const handleClickOpen = (classId: number) => {
        console.log('handleClickOpen clicked', classId)
    }

    const column = columnData(handleClickOpen)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultClass = await getClass()

                const updatedResultClass = resultClass.data.class.map(
                    (item: { id_grade: number }) => {
                        if (item.id_grade === 1) {
                            return { ...item, id_grade: 7 }
                        } else if (item.id_grade === 2) {
                            return { ...item, id_grade: 8 }
                        } else if (item.id_grade === 7) {
                            return { ...item, id_grade: 9 }
                        }
                        return item
                    }
                )

                setClassData(updatedResultClass)
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [])

    const handleGradeChange = (value: number) => {
        console.log('handleGradeChange', value)
        setSelectedGrade(value)
    }

    const contentRef = useRef(null)
    const handlePrint = useReactToPrint({ contentRef })

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
            <div className="hidden">
                <div ref={contentRef}>
                    <PrintSchedule data={dummyData} />
                </div>
            </div>

            <div className="mb-2 flex items-center justify-between">
                <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                    Generate Class
                </h1>

                <div
                    className="flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md"
                    onClick={() => handlePrint()}
                >
                    Export To PDF
                </div>
            </div>

            <div className="flex  flex-col gap-4 rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                <div className="flex justify-between">
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        {classData.map((classItem, index) => (
                            <StyledTab
                                key={classItem}
                                label={`${classItem}`}
                                value={index}
                            />
                        ))}
                    </StyledTabs>

                    <div className="flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md">
                        <select
                            className="mx-2 w-full bg-transparent px-6 py-3 text-lg outline-none"
                            value={selectedGrade}
                            onChange={(e) =>
                                handleGradeChange(Number(e.target.value))
                            }
                        >
                            {grade.map((classItem) => (
                                <option
                                    key={classItem}
                                    value={classItem}
                                    className="text-[#31426E]"
                                >
                                    Grade&ensp; {classItem}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <CustomTabPanel value={value} index={value}>
                    <Table data={rows(value)} columnData={column} />
                </CustomTabPanel>
            </div>
        </Box>
    )
}

export default FinalizeScheduleGenerator
