'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Chip, MenuItem, OutlinedInput, Select } from '@mui/material'
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
} from 'react'
import { Button } from '../common/button/button'

function createData(
    TeacherName: string,
    TeacherHour: number,
    TeacherHourFilled: number,
    classID: [{ Class_name: string }]
) {
    return { TeacherName, TeacherHour, TeacherHourFilled, classID }
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, [{ Class_name: '7A' }]),
    createData('Ice cream sandwich', 237, 9.0, [{ Class_name: '7A' }]),
    createData('Eclair', 262, 16.0, [{ Class_name: '7A' }]),
    createData('Cupcake', 305, 3.7, [{ Class_name: '7A' }]),
    createData('Gingerbread', 356, 16.0, [{ Class_name: '7A' }]),
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
            TeacherName: pipe(
                string(),
                minLength(1, 'Teacher Name is required')
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
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm<ObjectInput>({
        resolver: valibotResolver(ObjectSchema),
        defaultValues: {
            rows: rows.map((row) => ({
                TeacherName: row.TeacherName,
                TeacherHour: row.TeacherHour,
                TeacherHourFilled: row.TeacherHourFilled,
                classID: row.classID,
            })),
        },
    })

    console.log(control._fields, errors)
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

    const totalTeachingHours = watchedRows?.reduce(
        (sum, row) => sum + (row.TeacherHour ?? 0),
        0
    )

    // Get available class names for a specific row
    const getAvailableClassNames = (currentRowIndex: number) => {
        const selectedClasses = watchedRows
            .filter((_, index) => index !== currentRowIndex)
            .flatMap((row) => row.classID.map((item) => item.Class_name)) // Extract `Class_name`

        return allClass_names.filter(
            (className) => !selectedClasses.includes(className)
        )
    }

    const TotalSubject = 4
    const TotalSekaliPertemuan = 2
    const TotalAllClass = 4

    const getTotalTeachingHoursFilled = (selectedClasses: any[]) => {
        // Calculate total hours filled: number of selected classes * TotalSubject
        return selectedClasses?.length * TotalSubject || 0
    }

    return (
        <Box sx={{ padding: 3, width: '87vw' }}>
            <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                Generate Schedule
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-7">
                    <div className="min-h-screen rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                        <div>
                            <h1 className="my-8 text-xl text-[#0C4177]">
                                Math
                            </h1>
                            <div className="text-[#353535]">
                                {` Total Jam Pelajaran (Per Minggu, Per Kelas) : ${TotalSubject} Jam `}
                            </div>
                            <div className="text-[#353535]">{`Sekali Pertemuan : ${TotalSekaliPertemuan} Jam `}</div>
                        </div>
                        <TableContainer
                            component={Paper}
                            sx={{ borderRadius: 0, boxShadow: 0, paddingY: 4 }}
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
                                            {' Total Jam Ajar (per minggu)'}
                                        </TableCell>
                                        <TableCell component="td">
                                            Kelas yang diajar
                                        </TableCell>
                                        <TableCell component="td">
                                            Total jam ajar yang sudah di penuhi
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {watchedRows.map((row, index) => (
                                        <TableRow
                                            key={row.TeacherName}
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
                                                    name={`rows.${index}.TeacherHour`}
                                                    control={control}
                                                    // defaultValue={assignment.Score ?? 0}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            id={row.TeacherName}
                                                            className="rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75"
                                                            type={'number'}
                                                            onChange={(e) => {
                                                                field.onChange(
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                ) // Parse string to number
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors && (
                                                    <p className="text-xs italic text-red-500">
                                                        {
                                                            errors.rows?.[index]
                                                                ?.TeacherHour
                                                                ?.message
                                                        }
                                                    </p>
                                                )}
                                            </TableCell>
                                            <TableCell component="th">
                                                <Controller
                                                    name={`rows.${index}.classID`}
                                                    control={control}
                                                    render={({ field }) => {
                                                        const availableClass_names =
                                                            getAvailableClassNames(
                                                                index
                                                            )

                                                        return (
                                                            <Select
                                                                {...field}
                                                                sx={{
                                                                    fieldset: {
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
                                                                    ) || []
                                                                } // Map object values to simple strings
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    // Map string selection back to { Class_name: string } on change
                                                                    const selectedValues =
                                                                        e.target
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
                                                            errors.rows?.[index]
                                                                ?.classID
                                                                ?.message
                                                        }
                                                    </p>
                                                )}
                                            </TableCell>
                                            <TableCell component="th">
                                                {getTotalTeachingHoursFilled(
                                                    row.classID
                                                )}{' '}
                                                / {row.TeacherHour}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className="text-[#353535]">
                            {`Total Jam ajar Seluruh Guru / Total jam ajar Seluruh Kelas :  ${totalTeachingHours} / ${TotalAllClass} Jam `}
                        </div>
                    </div>

                    <div className="min-h-screen rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                        <div>
                            <h1 className="my-8 text-xl text-[#0C4177]">
                                Math
                            </h1>
                            <div className="text-[#353535]">
                                {` Total Jam Pelajaran (Per Minggu, Per Kelas) : ${TotalSubject} Jam `}
                            </div>
                            <div className="text-[#353535]">{`Sekali Pertemuan : ${TotalSekaliPertemuan} Jam `}</div>
                        </div>
                        <TableContainer
                            component={Paper}
                            sx={{ borderRadius: 0, boxShadow: 0, paddingY: 4 }}
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
                                            {' Total Jam Ajar (per minggu)'}
                                        </TableCell>
                                        <TableCell component="td">
                                            Kelas yang diajar
                                        </TableCell>
                                        <TableCell component="td">
                                            Total jam ajar yang sudah di penuhi
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {watchedRows.map((row, index) => (
                                        <TableRow
                                            key={row.TeacherName}
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
                                                    name={`rows.${index}.TeacherHour`}
                                                    control={control}
                                                    // defaultValue={assignment.Score ?? 0}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            id={row.TeacherName}
                                                            className="rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75"
                                                            type={'number'}
                                                            onChange={(e) => {
                                                                field.onChange(
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                ) // Parse string to number
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors && (
                                                    <p className="text-xs italic text-red-500">
                                                        {
                                                            errors.rows?.[index]
                                                                ?.TeacherHour
                                                                ?.message
                                                        }
                                                    </p>
                                                )}
                                            </TableCell>
                                            <TableCell component="th">
                                                <Controller
                                                    name={`rows.${index}.classID`}
                                                    control={control}
                                                    render={({ field }) => {
                                                        const availableClass_names =
                                                            getAvailableClassNames(
                                                                index
                                                            )

                                                        return (
                                                            <Select
                                                                {...field}
                                                                sx={{
                                                                    fieldset: {
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
                                                                    ) || []
                                                                } // Map object values to simple strings
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    // Map string selection back to { Class_name: string } on change
                                                                    const selectedValues =
                                                                        e.target
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
                                                            errors.rows?.[index]
                                                                ?.classID
                                                                ?.message
                                                        }
                                                    </p>
                                                )}
                                            </TableCell>
                                            <TableCell component="th">
                                                {getTotalTeachingHoursFilled(
                                                    row.classID
                                                )}{' '}
                                                / {row.TeacherHour}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className="text-[#353535]">
                            {`Total Jam ajar Seluruh Guru / Total jam ajar Seluruh Kelas :  ${totalTeachingHours} / ${TotalAllClass} Jam `}
                        </div>
                    </div>
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
