'use client'

import { useEffect, useState } from 'react'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { InferInput } from 'valibot'
import { Controller, useForm } from 'react-hook-form'
import { ControllerField } from '../common/form/textField'
import { minLength, object, pipe, string } from 'valibot'
import { useSearchParams } from 'next/navigation'
import { Box } from '@mui/material'
import { getStudentById } from '@/app/api/student'
import { formatStudentData } from '@/lib/formatData'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import dayjs from 'dayjs'
import { Button } from '../common/button/button'

type ObjectInput = InferInput<typeof ObjectSchema>

const ObjectSchema = object({
    name: pipe(string(), minLength(1, 'Full Name is required')),
    start: pipe(string(), minLength(1, 'Start Time is required')),
    end: pipe(string(), minLength(1, 'End Time of Birth is required')),
    date: pipe(string(), minLength(1, 'Date is required')),
})

const CalendarForm = () => {
    const searchParams = useSearchParams()
    const actionType = searchParams.get('action')
    const id = searchParams.get('student')

    const [data, setData] = useState<ObjectInput>()
    const [open, setOpen] = useState(false)

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setError,
    } = useForm<ObjectInput>({
        resolver: valibotResolver(ObjectSchema),
        defaultValues: {
            // studentID: '',
            name: '',
            start: '',
            end: '',
            date: '',
        },
    })

    const handleDialog = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await getStudentById(id)

                    const data = formatStudentData(response.data.student, false)
                    setData(data)
                }
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [id])

    useEffect(() => {
        if (data) {
            reset({
                name: data.name || '',
                start: data.start || '',
                end: data.end || '',
                date: data.date || '',
            })
        }
    }, [data, reset])

    const onSubmit = async (data: ObjectInput) => {
        if (dayjs(data.start, 'HH:mm').isAfter(dayjs(data.end, 'HH:mm'))) {
            // Set the error on the 'start' field
            setError('start', {
                type: 'manual',
                message: 'Start time cannot be later than End time',
            })

            // Also set error for 'end' if you want
            setError('end', {
                type: 'manual',
                message: 'End time must be after Start time',
            })

            return
        }

        const newData = {
            name: data.name,
            start: data.start,
            end: data.end,
            date: data.date,
        }

        console.log('data', newData)
        // try {
        //     let response
        //     if (actionType === 'update' && id) {
        //         response = await updateStudent(id, newData)
        //     } else if (actionType === 'create') {
        //         response = await createStudent(newData)
        //     }
        //     if (response?.status === 200) {
        //         alert(
        //             actionType === 'update'
        //                 ? 'Student updated successfully'
        //                 : 'Student created successfully'
        //         )
        //     } else {
        //         alert('Failed to create student')
        //     }
        // } catch (error) {
        //     console.error('API request error', error)
        //     alert('Failed to create student')
        // }
    }

    return (
        <Box sx={{ padding: 3, width: '100%' }}>
            <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                Add Event
            </h1>

            <div className="min-h-screen w-full rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-[#353535]"
                >
                    <div>
                        {actionType === 'create' ? (
                            <h1 className="my-8 text-xl text-[#0C4177]">
                                New calender
                            </h1>
                        ) : (
                            <h1 className="my-8 text-xl text-[#0C4177]">
                                Edit calender
                            </h1>
                        )}
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                            <div className="flex flex-col">
                                <label className="mb-2 text-[#353535]">
                                    Date
                                </label>
                                <Controller
                                    name={'date'}
                                    control={control}
                                    render={({ field }) => (
                                        <DesktopDatePicker
                                            {...field}
                                            format="DD/MM/YYYY"
                                            value={
                                                field.value
                                                    ? dayjs(
                                                        field.value,
                                                        'YYYY-MM-DD'
                                                    )
                                                    : null
                                            }
                                            onChange={(newValue) => {
                                                console.log(newValue)
                                                const formattedDate = newValue
                                                    ? dayjs(newValue).format(
                                                        'YYYY-MM-DD'
                                                    )
                                                    : ''
                                                field.onChange(formattedDate) // Update with a string value
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    'rgb(63 121 180 / 0.1)',
                                                fieldset: { border: 'none' },
                                                borderRadius: '6px',
                                            }}
                                        />
                                    )}
                                />
                                {errors.date && (
                                    <p className="text-xs italic text-red-500">
                                        {errors.date.message}
                                    </p>
                                )}
                            </div>

                            <ControllerField
                                control={control}
                                name="name"
                                label="Event Name"
                                placeholder="Please input event Name"
                                errors={errors.name}
                                value={data?.name}
                            />
                            <div className="flex flex-col">
                                <label className="mb-2 text-[#353535]">
                                    Start
                                </label>
                                <Controller
                                    name={'start'}
                                    control={control}
                                    render={({ field }) => (
                                        <DesktopTimePicker
                                            {...field}
                                            value={
                                                field.value
                                                    ? dayjs(
                                                        field.value,
                                                        'HH:mm'
                                                    )
                                                    : null
                                            } // Convert string to Day.js
                                            onChange={(newValue) => {
                                                const formattedTime = newValue
                                                    ? dayjs(newValue).format(
                                                        'HH:mm'
                                                    )
                                                    : ''
                                                field.onChange(formattedTime) // Store as a string in the form state
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    'rgba(63, 121, 180, 0.1)',
                                                fieldset: { border: 'none' },
                                                borderRadius: '6px',
                                            }}
                                        />
                                    )}
                                />
                                {errors.start && (
                                    <p className="text-xs italic text-red-500">
                                        {errors.start.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-2 text-[#353535]">
                                    End
                                </label>
                                <Controller
                                    name={'end'}
                                    control={control}
                                    render={({ field }) => (
                                        <DesktopTimePicker
                                            {...field}
                                            value={
                                                field.value
                                                    ? dayjs(
                                                        field.value,
                                                        'HH:mm'
                                                    )
                                                    : null
                                            } // Convert string to Day.js
                                            onChange={(newValue) => {
                                                const formattedTime = newValue
                                                    ? dayjs(newValue).format(
                                                        'HH:mm'
                                                    )
                                                    : ''
                                                field.onChange(formattedTime) // Store as a string in the form state
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    'rgba(63, 121, 180, 0.1)',
                                                fieldset: { border: 'none' },
                                                borderRadius: '6px',
                                            }}
                                        />
                                    )}
                                />
                                {errors.end && (
                                    <p className="text-xs italic text-red-500">
                                        {errors.end.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </LocalizationProvider>

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
            </div>
        </Box>
    )
}

export default CalendarForm
