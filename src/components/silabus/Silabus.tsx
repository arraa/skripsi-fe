'use client'

import { Box, Tab, Tabs } from '@mui/material'
import { Button } from '../common/button/button'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import {
    columnDataDetail,
    columnDataDomain,
    columnDataKontenTujuan,
} from './column'
import Table from '../common/Table'
import { getClass } from '@/app/api/class'
import {
    silabusDetail,
    silabusDomain,
    silabusKontenTujuan,
} from './types/types'
import { Padding } from '@mui/icons-material'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

export const dummySilabusDomain: silabusDomain[] = [
    {
        id: 1,
        domain: 'Mathematics',
        capaianPembelajaran: 'Master basic algebraic operations',
    },
    {
        id: 2,
        domain: 'Science',
        capaianPembelajaran: 'Understand the basics of ecosystems',
    },
    {
        id: 3,
        domain: 'History',
        capaianPembelajaran: 'Learn major events of World War II',
    },
    {
        id: 4,
        domain: 'Geography',
        capaianPembelajaran: 'Understand physical and political maps',
    },
    {
        id: 5,
        domain: 'Physics',
        capaianPembelajaran: "Grasp Newton's laws of motion",
    },
    {
        id: 6,
        domain: 'Chemistry',
        capaianPembelajaran: 'Understand periodic table trends',
    },
    {
        id: 7,
        domain: 'Biology',
        capaianPembelajaran: 'Learn the process of photosynthesis',
    },
    {
        id: 8,
        domain: 'Computer Science',
        capaianPembelajaran: 'Understand basic programming concepts',
    },
    {
        id: 9,
        domain: 'Economics',
        capaianPembelajaran: 'Learn supply and demand principles',
    },
    {
        id: 10,
        domain: 'Literature',
        capaianPembelajaran: 'Analyze key elements in classical literature',
    },
]

export const dummySilabusKontenTujuan: silabusKontenTujuan[] = [
    {
        id: 1,
        materi: 'Basic Algebra',
        tujuanPembelajaran: 'Solve linear equations',
        JP: 2,
    },
    {
        id: 2,
        materi: 'Ecosystem Basics',
        tujuanPembelajaran: 'Identify roles of producers and consumers',
        JP: 3,
    },
    {
        id: 3,
        materi: 'World War II',
        tujuanPembelajaran: 'Understand key events of 1945',
        JP: 4,
    },
    {
        id: 4,
        materi: 'Map Reading',
        tujuanPembelajaran: 'Interpret physical and political maps',
        JP: 1,
    },
    {
        id: 5,
        materi: "Newton's Laws",
        tujuanPembelajaran: 'Apply laws of motion to real-world problems',
        JP: 3,
    },
    {
        id: 6,
        materi: 'Periodic Trends',
        tujuanPembelajaran:
            'Predict chemical properties based on periodic trends',
        JP: 2,
    },
    {
        id: 7,
        materi: 'Photosynthesis',
        tujuanPembelajaran: 'Explain the stages of photosynthesis',
        JP: 3,
    },
    {
        id: 8,
        materi: 'Programming Basics',
        tujuanPembelajaran: 'Write simple programs in Python',
        JP: 4,
    },
    {
        id: 9,
        materi: 'Supply and Demand',
        tujuanPembelajaran: 'Understand market equilibrium',
        JP: 2,
    },
    {
        id: 10,
        materi: 'Poetry Analysis',
        tujuanPembelajaran: 'Analyze themes in classical poetry',
        JP: 1,
    },
]

export const dummySilabusDetail: silabusDetail[] = [
    {
        id: 1,
        pertemuan: 1,
        tujuanPembelajaran: 'Understand linear equations',
        kegiatanPembelajaran: 'Interactive problem-solving exercises',
    },
    {
        id: 2,
        pertemuan: 2,
        tujuanPembelajaran: 'Explain ecosystem components',
        kegiatanPembelajaran: 'Group discussion and case studies',
    },
    {
        id: 3,
        pertemuan: 3,
        tujuanPembelajaran: 'Understand events of World War II',
        kegiatanPembelajaran: 'Historical documentary analysis',
    },
    {
        id: 4,
        pertemuan: 4,
        tujuanPembelajaran: 'Read and interpret maps',
        kegiatanPembelajaran: 'Map reading and hands-on exercises',
    },
    {
        id: 5,
        pertemuan: 5,
        tujuanPembelajaran: "Apply Newton's laws",
        kegiatanPembelajaran: 'Experiments with motion and force',
    },
    {
        id: 6,
        pertemuan: 6,
        tujuanPembelajaran: 'Explain periodic trends',
        kegiatanPembelajaran: 'Periodic table exercises and quizzes',
    },
    {
        id: 7,
        pertemuan: 7,
        tujuanPembelajaran: 'Understand photosynthesis',
        kegiatanPembelajaran: 'Laboratory experiments with plants',
    },
    {
        id: 8,
        pertemuan: 8,
        tujuanPembelajaran: 'Write basic Python code',
        kegiatanPembelajaran: 'Coding exercises and debugging challenges',
    },
    {
        id: 9,
        pertemuan: 9,
        tujuanPembelajaran: 'Understand market dynamics',
        kegiatanPembelajaran: 'Simulations of supply and demand changes',
    },
    {
        id: 10,
        pertemuan: 10,
        tujuanPembelajaran: 'Analyze themes in poetry',
        kegiatanPembelajaran: 'Close reading and thematic discussions',
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
            {value === index && <Box sx={{ px: 3, pt: 2 }}>{children}</Box>}
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
    fontSize: '1rem',

    '&.Mui-selected': {
        color: '#fff',
        backgroundColor: '#31426E',
        borderRadius: 6,
    },

    '&.Mui-focusVisible': {
        backgroundColor: '#31426E',
    },
}))

const Silabus = () => {
    const [selectedGrade, setSelectedGrade] = useState<number>(7)
    const [dataDomain, setDataDomain] =
        useState<silabusDomain[]>(dummySilabusDomain)
    const [dataKontenTujuan, setDataKontenTujuan] = useState<
        silabusKontenTujuan[]
    >(dummySilabusKontenTujuan)
    const [dataDetail, setDataDetail] =
        useState<silabusDetail[]>(dummySilabusDetail)
    const grade = [7, 8, 9]
    const [value, setValue] = useState(1)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)

        setValue(newValue)
    }

    const handleUpdate = (id: number) => {
        console.log('handleUpdate clicked', id)
    }

    const columnsDataDomain = columnDataDomain(handleUpdate)
    const columnsDataKontenTujuan = columnDataKontenTujuan(handleUpdate)
    const columnsDataDetail = columnDataDetail(handleUpdate)

    const handleGradeChange = (value: number) => {
        console.log('handleGradeChange', value)
        setSelectedGrade(value)
    }

    return (
        <Box sx={{ paddingY: 3, px: 2, paddingLeft: 0, width: '84vw' }}>
            <div className="mb-2 flex items-center justify-between">
                <h1 className="mb-6 mt-2  text-3xl font-bold text-[#0C4177]">
                    Silabus
                </h1>
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

            <div className="flex  flex-col rounded-3xl  bg-white px-5 text-[#0C4177] shadow-md">
                <div className="px-10 pt-8 ">
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <StyledTab
                            key={1}
                            label={'Domain - Capaian'}
                            value={1}
                        />
                        <StyledTab
                            key={2}
                            label={'Konten - Tujuan'}
                            value={2}
                        />
                        <StyledTab key={3} label={'Detail'} value={3} />
                    </StyledTabs>
                </div>

                <CustomTabPanel value={value} index={1}>
                    <div className="border-t-2">
                        <Table
                            maxHeight={'65vh'}
                            data={dataDomain}
                            columnData={columnsDataDomain}
                        />
                    </div>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <div className="border-t-2">
                        <Table
                            maxHeight={'65vh'}
                            data={dataKontenTujuan}
                            columnData={columnsDataKontenTujuan}
                        />
                    </div>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}>
                    <div className="border-t-2">
                        <Table
                            maxHeight={'65vh'}
                            data={dataDetail}
                            columnData={columnsDataDetail}
                        />
                    </div>
                </CustomTabPanel>
            </div>
        </Box>
    )
}

export default Silabus
