'use client'

import { Box, Tab, Tabs } from '@mui/material'
import { Button } from '../common/button/button'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { columnDataSiswa } from './column'
import Table from '../common/Table'
import {
    classDataProps,
    classGeneratorProps,
    gradeDataProps,
} from './types/types'
import { getClass } from '@/app/api/class'
import { StudentDataProps } from '../studentData/types/types'
import { getStudent } from '@/app/api/student'
import { formatStudentData } from '@/lib/formatData'

// Define the distributed classes type
interface DistributedClasses {
    [key: string]: StudentDataProps[]
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

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

const FinalizeClassGenerator = () => {
    const [selectedGrade, setSelectedGrade] = useState<number>(7)
    const [classData, setClassData] = useState<classDataProps[]>([])
    const [data, setData] = useState<StudentDataProps[]>([])
    const grade = [7, 8, 9]
    const [value, setValue] = useState(1)

    console.log('data', data)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsResult = await getStudent()
                const formattedStudents = formatStudentData(
                    studentsResult.data.students
                )

                const classesResult = await getClass()

                console.log('Classes:', classesResult.data)

                const updatedClasses = classesResult.data.ClassName.map(
                    (item: classDataProps) => {
                        if (item.id_grade === 1) return { ...item, id_grade: 7 }
                        if (item.id_grade === 2) return { ...item, id_grade: 8 }
                        if (item.id_grade === 7) return { ...item, id_grade: 9 }
                        return item
                    }
                )

                setClassData(updatedClasses)

                const distributed = distributeStudentsEqually(
                    formattedStudents,
                    updatedClasses
                )

                console.log('Distributed:', distributed)

                setData(distributed)
            } catch (error) {
                console.error('API request error', error)
            }
        }

        fetchData()
    }, [])

    function shuffle<T>(array: T[]): T[] {
        // Fisher-Yates shuffle to randomize the order of the array
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    function distributeStudentsEqually(
        students: StudentDataProps[],
        classes: classDataProps[]
    ): StudentDataProps[] {
        // First, group students by grade
        const groupedByGrade: { [key: number]: StudentDataProps[] } = {}

        students.forEach((student) => {
            const grade = student.ClassName.Grade.grade
            if (!groupedByGrade[grade]) {
                groupedByGrade[grade] = []
            }
            groupedByGrade[grade].push(student)
        })

        console.log('Grouped By Grade:', groupedByGrade) // Check the grouping

        // Prepare an array to hold the distributed students
        const result: StudentDataProps[] = []

        // Distribute students for each grade
        Object.keys(groupedByGrade).forEach((grade) => {
            const studentsInGrade = groupedByGrade[parseInt(grade)]
            const shuffledStudents = shuffle(studentsInGrade)
            const classesForGrade = classes.filter(
                (cls) => Number(cls.Grade?.grade) === parseInt(grade)
            )

            console.log('Classes for Grade', grade, classesForGrade) // Check available classes

            const classCount = classesForGrade.length

            if (classCount === 0) {
                console.warn(`No classes found for grade ${grade}`)
                return
            }

            // Distribute the shuffled students evenly into the available classes for that grade
            shuffledStudents.forEach((student, index) => {
                const classIndex = index % classCount
                const currentClass = classesForGrade[classIndex] // Directly select class by index

                if (currentClass) {
                    result.push({
                        ...student,
                        ClassName: {
                            id: currentClass.id as number,
                            name: currentClass.name,
                            Grade: { grade: Number(currentClass.Grade?.grade) },
                        },
                        class_id: currentClass.id as number,
                    })
                }
            })
        })

        console.log('Distributed Students:', result) // Final check on the distributed result

        return result
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)

        setValue(newValue)
    }

    const rows = (id: number) =>
        data
            .filter((student) => student.class_id === id)
            .map((student, index) => ({
                id: index + 1,
                ...student,
            }))

    const column = columnDataSiswa()

    const handleGradeChange = (value: number) => {
        console.log('handleGradeChange', value)
        setSelectedGrade(value)
    }

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '80vw' }}>
            <div className="mb-2 flex items-center justify-between">
                <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                    Generate Class
                </h1>
                <div className="flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md">
                    <select
                        className="mx-2 w-full bg-transparent px-6 py-3 text-lg"
                        value={selectedGrade}
                        onChange={(e) =>
                            handleGradeChange(Number(e.target.value))
                        }
                    >
                        {grade.map((classItem) => (
                            <option
                                key={classItem}
                                value={classItem}
                                className="text-[#0c427770] "
                            >
                                Grade&ensp; {classItem}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex  flex-col gap-4 rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                <Box>
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
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

                <div className="flex justify-end gap-4">
                    <Button variant={'white'} size={'default'}  onClick={() => window.location.reload()}>
                        Regenerate
                    </Button>

                    <Button size={'default'}>Finalize</Button>
                </div>
            </div>
        </Box>
    )
}

export default FinalizeClassGenerator
