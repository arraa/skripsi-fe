'use client'

import { Box, Tab, Tabs } from '@mui/material'
import { Button } from '../common/button/button'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { columnDataSiswa, columnDataSiswaArchive } from './column'
import Table from '../common/Table'
import {
    classDataProps,
    classGeneratorProps,
    classGeneratorStudentProps,
    gradeDataProps,
    StyledTabProps,
    StyledTabsProps,
    TabPanelProps,
} from './types/types'
import { getClass } from '@/app/api/class'
import { StudentDataProps } from '../studentData/types/types'
import { getStudent, updateClassStudent } from '@/app/api/student'
import { formatStudentData } from '@/lib/formatData'
import { array, InferInput, object, string } from 'valibot'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { getArchiveClass } from '@/app/api/archive'

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

const ObjectSchema = array(
    object({
        class_name_id: string(),
        student_id: string(),
    })
)

type ObjectInput = InferInput<typeof ObjectSchema>

const Class = () => {
    const [selectedGrade, setSelectedGrade] = useState<number>(7)
    const [classData, setClassData] = useState<{ id: string; name: string }[]>(
        []
    )
    const [data, setData] = useState<StudentDataProps[]>([])
    const grade = [7, 8, 9]
    const [valueData, setValueData] = useState(1)
    const [studentData, setStudentData] = useState<
        classGeneratorStudentProps[]
    >([])

    const searchParams = useSearchParams()

    const archive = searchParams.get('archive')
    const academicYear = searchParams.get('ac')

    useEffect(() => {
        console.log('selectedGrade', selectedGrade)

        const fetchData = async () => {
            try {
                if (archive === 'true' && academicYear) {
                    let SelectedgradeID
                    if (selectedGrade === 7) SelectedgradeID = 1
                    if (selectedGrade === 8) SelectedgradeID = 2
                    if (selectedGrade === 9) SelectedgradeID = 3

                    getArchiveClass(
                        academicYear as string,
                        Number(SelectedgradeID)
                    )
                        .then((res) => {
                            console.log('abcd', res.data.class, selectedGrade)
                            setData(res.data.class)
                            const classData = res.data.class
                            const uniqueGrades = Array.from(
                                new Map(
                                    classData.map(
                                        (item: {
                                            grade_name: string
                                            class_name_id: string
                                        }) => [
                                            item.grade_name,
                                            {
                                                id: item.class_name_id,
                                                name: item.grade_name,
                                            }, // Match expected structure
                                        ]
                                    )
                                ).values()
                            )

                            setClassData(uniqueGrades as {
                                id: string
                                name: string}[])
                            console.log(uniqueGrades)
                        })
                        .catch(() => {
                            setData([])
                        })
                } else {
                    const studentsResult = await getStudent()
                    const formattedStudents = formatStudentData(
                        studentsResult.data.students
                    )

                    const classesResult = await getClass()

                    const updatedClasses = classesResult.data.ClassName.map(
                        (item: classDataProps) => {
                            if (item.id_grade === 1)
                                return { ...item, id_grade: 7 }
                            if (item.id_grade === 2)
                                return { ...item, id_grade: 8 }
                            if (item.id_grade === 7)
                                return { ...item, id_grade: 9 }
                            return item
                        }
                    )

                    setClassData(updatedClasses)

                    const distributed = distributeStudentsEqually(
                        formattedStudents,
                        updatedClasses
                    )

                    setData(distributed)
                }
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

        // Prepare an array to hold the distributed students
        const result: StudentDataProps[] = []

        const updatedStudentData: {
            class_name_id: number
            student_id: number
        }[] = []

        // Distribute students for each grade
        Object.keys(groupedByGrade).forEach((grade) => {
            const studentsInGrade = groupedByGrade[parseInt(grade)]
            const shuffledStudents = shuffle(studentsInGrade)
            const classesForGrade = classes.filter(
                (cls) => Number(cls.Grade?.grade) === parseInt(grade)
            )

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

                    updatedStudentData.push({
                        class_name_id: currentClass.id || 0,
                        student_id: student.StudentID || 0,
                    })
                }
            })
        })

        setStudentData(updatedStudentData)

        return result
    }

    const { handleSubmit, control, setValue } =
        useForm<classGeneratorStudentProps>({
            defaultValues: {},
        })

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)

        setValueData(newValue)
    }

    const rows = (id: number) =>
        data
            .filter((student) => student.class_id === id)
            .map((student, index) => ({
                id: index + 1,
                ...student,
            }))

    const column = columnDataSiswaArchive(
        control,
        setValue,
        studentData,
        setStudentData
    )

    const handleGradeChange = (value: number) => {
        console.log('handleGradeChange', value)
        setSelectedGrade(value)
    }

    const onSubmit = (data: classGeneratorStudentProps) => {
        console.log('onSubmit', studentData, data)
        updateClassStudent(studentData)
            .then(() => {
                alert('Class has been Created')
            })
            .catch((error) => {
                console.error('API request error', error)
            })
    }

    console.log('studentData', studentData)

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '84vw' }}>
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
                                className="text-[#0C4177] "
                            >
                                Grade&ensp; {classItem}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex  flex-col gap-4 rounded-3xl bg-white p-5 text-[#0C4177] shadow-md">
                    <Box>
                        <StyledTabs
                            value={valueData}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            {classData.map((classItem) => (
                                <StyledTab
                                    key={classItem.id}
                                    label={classItem.name}
                                    value={classItem.id as unknown as number}
                                />
                            ))}
                        </StyledTabs>
                    </Box>

                    <CustomTabPanel value={valueData} index={valueData}>
                        <Table
                            data={
                                rows(
                                    valueData
                                ) as unknown as classGeneratorProps[]
                            }
                            columnData={column}
                            heighRow={75}
                        />
                    </CustomTabPanel>

                    {archive != 'true' && (
                        <div className="flex justify-end gap-4">
                            <Button
                                variant={'white'}
                                size={'default'}
                                onClick={() => window.location.reload()}
                            >
                                Regenerate
                            </Button>

                            <Button
                                type="submit"
                                size={'submit'}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                Finalize
                            </Button>
                        </div>
                    )}
                </div>
            </form>
        </Box>
    )
}

export default Class
