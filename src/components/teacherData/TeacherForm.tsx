'use client'

import { useEffect, useState } from 'react'
import {
    GetTeacherByIDApiProps,
    subjectListProps,
    TeacherDataProps,
} from './types/types'
import * as XLSX from 'xlsx'
import { Button } from '../common/button/button'
import {
    createTeacher,
    // createTeacherbyExcel,
    getTeacherById,
    updateTeacher,
    // updateTeacher,
} from '@/app/api/teacher'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { InferInput } from 'valibot'
import { useForm } from 'react-hook-form'
import { ControllerField } from '../common/form/textField'
import { ControllerSelectField } from '../common/form/selectField'
import { minLength, number, object, pipe, string } from 'valibot'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'
import {
    Box,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import { formatDate } from '../../lib/formatData'
import { getAllSubject } from '@/app/api/subject'

type ObjectInput = InferInput<typeof ObjectSchema>

const ObjectSchema = object({
    name: pipe(string(), minLength(1, 'Full Name is required')),
    gender: pipe(string(), minLength(1, 'Gender is required')),
    place_of_birth: pipe(string(), minLength(1, 'Place of Birth is required')),
    date_of_birth: pipe(string(), minLength(1, 'Date of Birth is required')),
    religion: pipe(string(), minLength(1, 'Religion is required')),
    address: pipe(string(), minLength(1, 'Address is required')),
    num_phone: pipe(string(), minLength(1, 'Phone Number is required')),
    email: pipe(string(), minLength(1, 'Email is required')),
    teaching_hour: pipe(string(), minLength(1, 'Teaching Hour is required')),
})

const TeacherForm = () => {
    const searchParams = useSearchParams()
    const actionType = searchParams.get('action')
    const id = searchParams.get('teacher')

    const [data, setData] = useState<TeacherDataProps>()
    const [open, setOpen] = useState(false)
    const [subjectList, setSubjectList] = useState<subjectListProps[]>([])
    const [selectedSubject, setSelectedSubject] = useState<number[]>([])

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ObjectInput>({
        resolver: valibotResolver(ObjectSchema),
        defaultValues: {
            name: '',
            gender: '',
            place_of_birth: '',
            date_of_birth: '',
            religion: '',
            address: '',
            num_phone: '',
            email: '',
            teaching_hour: '0',
        },
    })

    const handleDialog = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if (data) {
            console.log('data', data)
            reset({
                name: data.name || '',
                gender: data.gender || '',
                place_of_birth: data.place_of_birth || '',
                date_of_birth: data.date_of_birth || '',
                religion: data.religion || '',
                address: data.address || '',
                num_phone: data.num_phone || '',
                email: data.email || '',
                teaching_hour: String(data.teaching_hour) || '0',
            })
        }
    }, [data, reset])

    useEffect(() => {
        if (id) {
            getTeacherById(id)
                .then((response: AxiosResponse<GetTeacherByIDApiProps>) => {
                    if (response.status === 200) {
                        response.data.teacher.date_of_birth = formatDate(
                            response.data.teacher.date_of_birth
                        )
                        setData(response.data.teacher)
                    }
                })
                .catch((error) => {
                    console.error('API request error', error)
                })
        }
    }, [actionType, id])

    useEffect(() => {
        getAllSubject()
            .then((response) => {
                setSubjectList(
                    response.data.subjects.map((item) => ({
                        id: item.subject_id,
                        grade: item.grade,
                        name: item.subject_name,
                    }))
                )
            })
            .catch((error) => {
                console.error('Error Fetching List Subject', error)
            })
    }, [])

    const handleChange = (event: SelectChangeEvent<typeof subjectList>) => {
        const {
            target: { value },
        } = event
        console.log('value', value)
        setSelectedSubject(
            typeof value === 'string'
                ? value.split(',').map(Number)
                : value.map((item: subjectListProps) => item.id)
        )
    }

    const onSubmit = async (data: ObjectInput) => {
        const newTeacherData: TeacherDataProps = {
            name: data.name || '',
            gender: data.gender || '',
            place_of_birth: data.place_of_birth || '',
            date_of_birth: data.date_of_birth || '',
            religion: data.religion || '',
            address: data.address || '',
            num_phone: data.num_phone || '',
            email: data.email || '',
            teaching_hour: String(data.teaching_hour) || '0', // or any default value
        }

        try {
            if (actionType === 'update' && id) {
                await updateTeacher(id, newTeacherData)
            } else if (actionType === 'create') {
                console.log('Creating new teacher')
                await createTeacher(newTeacherData)
            }
            alert(
                actionType === 'update'
                    ? 'Teacher updated successfully'
                    : 'Teacher created successfully'
            )
        } catch (error) {
            console.error('API request error', error)
        }
    }

    return (
        <Box sx={{ padding: 3, width: '100%' }}>
            {actionType === 'create' ? (
                <div className="flex items-center">
                    <h1 className="my-8 w-full text-3xl font-bold text-[#0C4177]">
                        Add New Teacher
                    </h1>
                    <div className=" flex w-full justify-end ">
                        <Button onClick={handleDialog}>
                            &#43;
                            <span className="hidden pl-3 sm:flex">Import</span>
                        </Button>
                    </div>
                </div>
            ) : (
                <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                    Update Teacher
                </h1>
            )}

            <div className="min-h-screen w-full rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                {/* <ImportData
          setOpen={handleDialog}
          handleImport={handleFileUpload}
          open={open}
        /> */}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-[#353535]"
                >
                    <div>
                        <h1 className="my-8 text-xl text-[#0C4177]">
                            Teacher’s Personal Data
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                        <ControllerField
                            control={control}
                            name="name"
                            label="Full Name"
                            placeholder="Please input teacher’s Full Name"
                            errors={errors.name}
                            value={data?.name}
                        />
                        <ControllerSelectField
                            control={control}
                            name="gender"
                            label="Gender"
                            options={['Male', 'Female'].map((value) => ({
                                label: value,
                            }))}
                            placeholder={'Please choose teacher’s gender.'}
                            errors={errors.gender}
                            value={data?.gender}
                        />
                        <ControllerField
                            control={control}
                            name="place_of_birth"
                            label="Place of Birth"
                            placeholder="Please input teacher’s Place of Birth"
                            errors={errors.place_of_birth}
                            value={data?.place_of_birth}
                        />
                        <ControllerField
                            control={control}
                            name="date_of_birth"
                            label="Date Of Birth"
                            placeholder="Please input teacher’s Date Of Birth"
                            type="date"
                            errors={errors.date_of_birth}
                            value={data?.date_of_birth}
                        />
                        <ControllerSelectField
                            control={control}
                            name="religion"
                            label="Religion"
                            options={[
                                'Islam',
                                'Kristen Protestan',
                                'Kristen Katolik',
                                'Hindu',
                                'Buddha',
                                'Konghucu',
                            ].map((value) => ({ label: value }))}
                            placeholder="Please choose Teacher’s Religion."
                            errors={errors.religion}
                            value={data?.religion}
                        />
                        <ControllerField
                            control={control}
                            name="address"
                            label="Address"
                            placeholder="Please input teacher’s address"
                            errors={errors.address}
                            value={data?.address}
                        />
                        <ControllerField
                            control={control}
                            name="num_phone"
                            label="Number Phone"
                            placeholder="Please input teacher’s Number Phone"
                            errors={errors.num_phone}
                            value={data?.num_phone}
                        />

                        <ControllerField
                            control={control}
                            name="email"
                            label="Email"
                            placeholder="Please input teacher’s Email"
                            errors={errors.email}
                            value={data?.email}
                        />

                        <ControllerField
                            control={control}
                            name="teaching_hour"
                            label="Teaching Hours"
                            placeholder="Please teaching hour"
                            errors={errors.teaching_hour}
                            value={data?.teaching_hour}
                        />
                        {/* <InputLabel id="demo-multiple-name-label">
                            Name
                        </InputLabel> */}
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={subjectList.filter((item) =>
                                selectedSubject.includes(item.id)
                            )}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                        >
                            {subjectList.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}
                                    // style={getStyles(item, personitem, theme)}
                                >
                                    {`${item.grade} - ${item.name}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="mb-4 mt-10 flex justify-end">
                        <Button type="submit" size={'submit'}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Box>
    )
}

export default TeacherForm
