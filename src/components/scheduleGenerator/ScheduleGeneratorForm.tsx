'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Chip, IconButton, MenuItem, OutlinedInput, Select } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {
    array,
    InferInput,
    minLength,
    minValue,
    number,
    object,
    pipe,
    string,
} from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import {
    AwaitedReactNode,
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactNode,
    useEffect,
    useState,
} from 'react'
import { Button } from '../common/button/button'
import { SubjectListProps } from './types/types'
import { getAllSubject } from '@/app/api/subject'

const teacherData = [
    {
        TeacherID: 1,
        TeacherName: 'Teacher 1',
        subjectName: 'PKN',
        TeacherHour: 15,
        TeacherHourFilled: 5,
        classID: [],
    },
    {
        TeacherID: 2,
        TeacherName: 'Teacher 2',
        subjectName: 'Biology',
        TeacherHour: 19,
        TeacherHourFilled: 12,
        classID: [],
    },
    {
        TeacherID: 3,
        TeacherName: 'Teacher 3',
        subjectName: 'Science',
        TeacherHour: 11,
        TeacherHourFilled: 8,
        classID: [],
    },
    {
        TeacherID: 4,
        TeacherName: 'Teacher 4',
        subjectName: 'Math',
        TeacherHour: 20,
        TeacherHourFilled: 9,
        classID: [],
    },
    {
        TeacherID: 5,
        TeacherName: 'Teacher 5',
        subjectName: 'PKN',
        TeacherHour: 18,
        TeacherHourFilled: 9,
        classID: [],
    },
    {
        TeacherID: 6,
        TeacherName: 'Teacher 6',
        subjectName: 'Biology',
        TeacherHour: 13,
        TeacherHourFilled: 10,
        classID: [],
    },
    {
        TeacherID: 7,
        TeacherName: 'Teacher 7',
        subjectName: 'Science',
        TeacherHour: 27,
        TeacherHourFilled: 10,
        classID: [],
    },
    {
        TeacherID: 8,
        TeacherName: 'Teacher 8',
        subjectName: 'Math',
        TeacherHour: 15,
        TeacherHourFilled: 12,
        classID: [],
    },
    {
        TeacherID: 9,
        TeacherName: 'Teacher 9',
        subjectName: 'PKN',
        TeacherHour: 15,
        TeacherHourFilled: 6,
        classID: [],
    },
    {
        TeacherID: 10,
        TeacherName: 'Teacher 10',
        subjectName: 'Biology',
        TeacherHour: 11,
        TeacherHourFilled: 13,
        classID: [],
    },
    {
        TeacherID: 11,
        TeacherName: 'Teacher 11',
        subjectName: 'Science',
        TeacherHour: 12,
        TeacherHourFilled: 14,
        classID: [],
    },
    {
        TeacherID: 12,
        TeacherName: 'Teacher 12',
        subjectName: 'Math',
        TeacherHour: 16,
        TeacherHourFilled: 14,
        classID: [],
    },
    {
        TeacherID: 13,
        TeacherName: 'Teacher 13',
        subjectName: 'PKN',
        TeacherHour: 14,
        TeacherHourFilled: 8,
        classID: [],
    },
    {
        TeacherID: 14,
        TeacherName: 'Teacher 14',
        subjectName: 'Biology',
        TeacherHour: 29,
        TeacherHourFilled: 10,
        classID: [],
    },
    {
        TeacherID: 15,
        TeacherName: 'Teacher 15',
        subjectName: 'Science',
        TeacherHour: 27,
        TeacherHourFilled: 10,
        classID: [],
    },
    {
        TeacherID: 16,
        TeacherName: 'Teacher 16',
        subjectName: 'Math',
        TeacherHour: 17,
        TeacherHourFilled: 11,
        classID: [],
    },
    {
        TeacherID: 17,
        TeacherName: 'Teacher 17',
        subjectName: 'PKN',
        TeacherHour: 15,
        TeacherHourFilled: 8,
        classID: [],
    },
    {
        TeacherID: 18,
        TeacherName: 'Teacher 18',
        subjectName: 'Biology',
        TeacherHour: 30,
        TeacherHourFilled: 6,
        classID: [],
    },
    {
        TeacherID: 19,
        TeacherName: 'Teacher 19',
        subjectName: 'Science',
        TeacherHour: 26,
        TeacherHourFilled: 15,
        classID: [],
    },
    {
        TeacherID: 20,
        TeacherName: 'Teacher 20',
        subjectName: 'Math',
        TeacherHour: 30,
        TeacherHourFilled: 12,
        classID: [],
    },
    {
        TeacherID: 21,
        TeacherName: 'Teacher 21',
        subjectName: 'PKN',
        TeacherHour: 20,
        TeacherHourFilled: 11,
        classID: [],
    },
    {
        TeacherID: 22,
        TeacherName: 'Teacher 22',
        subjectName: 'Biology',
        TeacherHour: 12,
        TeacherHourFilled: 11,
        classID: [],
    },
    {
        TeacherID: 23,
        TeacherName: 'Teacher 23',
        subjectName: 'Science',
        TeacherHour: 19,
        TeacherHourFilled: 8,
        classID: [],
    },
    {
        TeacherID: 24,
        TeacherName: 'Teacher 24',
        subjectName: 'Math',
        TeacherHour: 28,
        TeacherHourFilled: 12,
        classID: [],
    },
    {
        TeacherID: 25,
        TeacherName: 'Teacher 25',
        subjectName: 'PKN',
        TeacherHour: 14,
        TeacherHourFilled: 11,
        classID: [],
    },
    {
        TeacherID: 26,
        TeacherName: 'Teacher 26',
        subjectName: 'Biology',
        TeacherHour: 30,
        TeacherHourFilled: 5,
        classID: [],
    },
    {
        TeacherID: 27,
        TeacherName: 'Teacher 27',
        subjectName: 'Science',
        TeacherHour: 26,
        TeacherHourFilled: 7,
        classID: [],
    },
    {
        TeacherID: 28,
        TeacherName: 'Teacher 28',
        subjectName: 'Math',
        TeacherHour: 25,
        TeacherHourFilled: 8,
        classID: [],
    },
    {
        TeacherID: 29,
        TeacherName: 'Teacher 29',
        subjectName: 'PKN',
        TeacherHour: 14,
        TeacherHourFilled: 13,
        classID: [],
    },
    {
        TeacherID: 0,
        TeacherName: 'Teacher 30',
        subjectName: 'Biology',
        TeacherHour: 28,
        TeacherHourFilled: 11,
        classID: [],
    },
]

const allClass_names = [
    '7A',
    '7B',
    '7C',
    '7D',
    '8A',
    '8B',
    '8C',
    '8D',
    '9A',
    '9B',
    '9C',
    '9D',
]

type ObjectInput = InferInput<typeof ObjectSchema>

const ObjectSchema = object({
    rows: array(
        object({
            TeacherID: pipe(
                number(),
                minValue(1, 'Teacher ID must be at least 1')
            ),
            TeacherName: pipe(
                string(),
                minLength(1, 'Teacher Name is required')
            ),
            subjectName: pipe(
                string(),
                minLength(1, 'Subject Name is required')
            ),
            TeacherHour: pipe(
                number(),
                minValue(0, 'Teaching Hours must be positive')
            ),
            TeacherHourFilled: pipe(
                number(),
                minValue(0, 'Filled Hours must be positive')
            ),
            classID: array(
                object({
                    Class_name: pipe(
                        string(),
                        minLength(1, 'Class Name is required')
                    ),
                })
            ),
        })
    ),
})

const ScheduleGeneratorForm = () => {
    const [subjectList, setSubjectList] = useState<SubjectListProps[]>([])

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm<ObjectInput>({
        resolver: valibotResolver(ObjectSchema),
        defaultValues: {
            rows: teacherData.map((row) => ({
                TeacherID: row.TeacherID,
                TeacherName: row.TeacherName,
                subjectName: row.subjectName,
                TeacherHour: row.TeacherHour,
                TeacherHourFilled: row.TeacherHourFilled,
                classID: row.classID,
            })),
        },
    })

    console.log(subjectList)
    // useEffect(() => {
    //     // Create a default values object based on groupedScoring
    //     const defaultValues = {
    //         TeacherName: '',
    //         TeacherHour: 0,
    //         TeacherHourFilled: 0,
    //         classID: [{ Class_name: '' }],
    //     }

    //     console.log('Default Values:', defaultValues)
    //     reset(defaultValues)
    // }, [reset])

    const onSubmit = (formData: ObjectInput) => {
        console.log('Submitted Data:', formData)
    }

    const watchedRows = watch('rows')

    // Get available class names for a specific row

    const TotalSubject = 4

    useEffect(() => {
        getAllSubject()
            .then((response) => {
                console.log('response', response)

                const uniqueSubjects = Array.from(
                    new Map(
                        response.data.subjects.map((subject) => [
                            subject.subject_name,
                            subject,
                        ])
                    ).values()
                )
                console.log('uniqueSubjectNames', uniqueSubjects)
                setSubjectList(
                    uniqueSubjects.map((item) => ({
                        id: item.subject_id,
                        name: item.subject_name,
                        durationPerSession: item.subject_duration_session / 60,
                        durationPerWeek: item.subject_duration_per_week / 60,
                    }))
                )
            })
            .catch((error) => {
                console.error('Error Fetching List Subject', error)
            })
    }, [])

    let cumulativeIndex = 0

    return (
        <Box sx={{ padding: 3, width: '87vw' }}>
            <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                Generate Schedule
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-7">
                    {subjectList.map((subject) => {
                        const filteredRows = watchedRows.filter(
                            (row) => row.subjectName === subject.name
                        )

                        const totalTeachingHours = filteredRows?.reduce(
                            (sum, row) => sum + (row.TeacherHour ?? 0),
                            0
                        )

                        const getTotalTeachingHoursFilled = (
                            selectedClasses: any[],
                            currentTeacherId: number
                        ) => {
 
                            const filteredSelectedClasses =
                                selectedClasses.filter((selectedClass) => {
                                    const isAssignedToSameTeacher =
                                        filteredRows.some((row) => {
                                            return (
                                                row.TeacherID ===
                                                    currentTeacherId &&
                                                row.classID.some(
                                                    (assignedClass) =>
                                                        assignedClass.Class_name ===
                                                        selectedClass
                                                )
                                            )
                                        })

                                    return !isAssignedToSameTeacher
                                })

                            return (
                                filteredSelectedClasses.length *
                                    subject.durationPerWeek || 0
                            )
                        }

                        const getAvailableClassNames = (
                            currentRowIndex: number
                        ) => {
                            const selectedClasses = filteredRows
                                .filter(
                                    (rows) => rows.TeacherID !== currentRowIndex
                                )
                                .flatMap((row) =>
                                    row.classID.map((item) => item.Class_name)
                                )
                            console.log(
                                'currentRowIndex',
                                currentRowIndex,
                                selectedClasses
                            )

                            return allClass_names.filter(
                                (className) =>
                                    !selectedClasses.includes(className)
                            )
                        }

                        return (
                            <div
                                key={subject.id}
                                className="min-h-screen rounded-3xl bg-white p-5 text-[#0c427770] shadow-md"
                            >
                                <div>
                                    <h1 className="my-8 text-xl text-[#0C4177]">
                                        {subject.name}
                                    </h1>
                                    <div className="text-[#353535]">
                                        {` Total Jam Pelajaran (Per Minggu, Per Kelas) : ${subject.durationPerWeek} Jam `}
                                    </div>
                                    <div className="text-[#353535]">{`Sekali Pertemuan : ${subject.durationPerSession} Jam `}</div>
                                </div>
                                <TableContainer
                                    component={Paper}
                                    sx={{
                                        borderRadius: 0,
                                        boxShadow: 0,
                                        paddingY: 4,
                                    }}
                                >
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label="simple table"
                                    >
                                        <TableHead>
                                            <TableRow
                                                sx={{
                                                    td: {
                                                        border: 1,
                                                        borderColor:
                                                            'rgba(133, 160, 187, 0.5)',
                                                    },
                                                }}
                                            >
                                                <TableCell component="td">
                                                    Nama Guru
                                                </TableCell>
                                                <TableCell component="td">
                                                    {
                                                        ' Total Jam Ajar (per minggu)'
                                                    }
                                                </TableCell>
                                                <TableCell component="td">
                                                    Kelas yang diajar
                                                </TableCell>
                                                <TableCell component="td">
                                                    Total jam ajar yang sudah di
                                                    penuhi
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredRows.map((row, index) => {
                                                console.log(
                                                    'row',
                                                    cumulativeIndex
                                                )
                                                cumulativeIndex++

                                                return (
                                                    <TableRow
                                                        key={row.TeacherID}
                                                        sx={{
                                                            th: {
                                                                border: 1,
                                                                borderColor:
                                                                    'rgba(133, 160, 187, 0.5)',
                                                            },
                                                        }}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {row.TeacherName}
                                                        </TableCell>
                                                        <TableCell component="th">
                                                            <Controller
                                                                name={`rows.${
                                                                    row.TeacherID -
                                                                    1
                                                                }.TeacherHour`}
                                                                control={
                                                                    control
                                                                }
                                                                // defaultValue={assignment.Score ?? 0}
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <input
                                                                        {...field}
                                                                        id={
                                                                            row.TeacherName
                                                                        }
                                                                        className="rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75"
                                                                        type={
                                                                            'number'
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            const newValue =
                                                                                parseFloat(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            field.onChange(
                                                                                newValue
                                                                            )
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            {errors && (
                                                                <p className="text-xs italic text-red-500">
                                                                    {
                                                                        errors
                                                                            .rows?.[
                                                                                index
                                                                            ]
                                                                            ?.TeacherHour
                                                                            ?.message
                                                                    }
                                                                </p>
                                                            )}
                                                        </TableCell>
                                                        <TableCell component="th">
                                                            <Controller
                                                                name={`rows.${
                                                                    row.TeacherID -
                                                                    1
                                                                }.classID`}
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => {
                                                                    const availableClass_names =
                                                                        getAvailableClassNames(
                                                                            row.TeacherID -
                                                                                1
                                                                        )

                                                                    return (
                                                                        <Select
                                                                            {...field}
                                                                            sx={{
                                                                                fieldset:
                                                                                    {
                                                                                        border: 'none',
                                                                                    },
                                                                            }}
                                                                            multiple
                                                                            value={
                                                                                field.value?.map(
                                                                                    (
                                                                                        item
                                                                                    ) =>
                                                                                        item.Class_name
                                                                                ) ||
                                                                                []
                                                                            } // Map object values to simple strings
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                const selectedValues =
                                                                                    e
                                                                                        .target
                                                                                        .value as string[]
                                                                                const mappedValues =
                                                                                    selectedValues.map(
                                                                                        (
                                                                                            className
                                                                                        ) => ({
                                                                                            Class_name:
                                                                                                className,
                                                                                        })
                                                                                    )
                                                                                field.onChange(
                                                                                    mappedValues
                                                                                )
                                                                            }}
                                                                            input={
                                                                                <OutlinedInput />
                                                                            }
                                                                            renderValue={(
                                                                                selected
                                                                            ) => (
                                                                                <Box
                                                                                    sx={{
                                                                                        display:
                                                                                            'flex',
                                                                                        flexWrap:
                                                                                            'wrap',
                                                                                        gap: 0.5,
                                                                                    }}
                                                                                >
                                                                                    {selected.map(
                                                                                        (
                                                                                            className
                                                                                        ) => (
                                                                                            <Chip
                                                                                                sx={{
                                                                                                    backgroundColor:
                                                                                                        'rgba(63, 121, 180, 0.1)',
                                                                                                    color: '#0C4177',
                                                                                                    borderRadius:
                                                                                                        '10px',
                                                                                                }}
                                                                                                key={
                                                                                                    className
                                                                                                }
                                                                                                label={
                                                                                                    className
                                                                                                }
                                                                                           
                                                                                            />
                                                                                        )
                                                                                    )}
                                                                                </Box>
                                                                            )}
                                                                        >
                                                                            {availableClass_names.map(
                                                                                (
                                                                                    className
                                                                                ) => (
                                                                                    <MenuItem
                                                                                        key={
                                                                                            className
                                                                                        }
                                                                                        value={
                                                                                            className
                                                                                        } // Pass only string for compatibility
                                                                                    >
                                                                                        {
                                                                                            className
                                                                                        }
                                                                                    </MenuItem>
                                                                                )
                                                                            )}
                                                                        </Select>
                                                                    )
                                                                }}
                                                            />

                                                            {errors && (
                                                                <p className="text-xs italic text-red-500">
                                                                    {
                                                                        errors
                                                                            .rows?.[
                                                                                index
                                                                            ]
                                                                            ?.classID
                                                                            ?.message
                                                                    }
                                                                </p>
                                                            )}
                                                        </TableCell>
                                                        <TableCell component="th">
                                                            {getTotalTeachingHoursFilled(
                                                                row.classID,
                                                                row.TeacherID
                                                            )}{' '}
                                                            / {row.TeacherHour}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <div className="text-[#353535]">
                                    {`Total Jam ajar Seluruh Guru / Total jam ajar Seluruh Kelas :  ${totalTeachingHours} / ${
                                        subject.durationPerWeek *
                                        allClass_names.length
                                    } Jam `}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mb-4 mt-10 flex justify-end">
                    <Button
                        onSubmit={handleSubmit(onSubmit)}
                        type="submit"
                        size={'submit'}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Box>
    )
}

export default ScheduleGeneratorForm
