'use client'

import { useEffect, useState } from 'react'
import { classDataProps, StudentDataProps } from './types/types'
import * as XLSX from 'xlsx'
import { Button } from '../common/button/button'
import {
    createStudent,
    createStudentbyExcel,
    updateStudent,
} from '@/app/api/student'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { InferInput } from 'valibot'
import { useForm } from 'react-hook-form'
import { ControllerField } from '../common/form/textField'
import { ControllerSelectField } from '../common/form/selectField'
import {
    check,
    email,
    length,
    maxLength,
    minLength,
    object,
    pipe,
    string,
} from 'valibot'
import { getClass } from '@/app/api/class'
import ImportData from '../common/dialog/ImportData'
import { useSearchParams } from 'next/navigation'
import { Box } from '@mui/material'
import { getStudentById } from '@/app/api/student'
import {
    formatDateForm,
    formatPhoneNumber,
    formatStudentData,
} from '@/lib/formatData'
import { religionList } from '@/constant/religionList'

type ObjectInput = InferInput<typeof ObjectSchema>

const ObjectSchema = object({
    nisn: pipe(
        string(),
        minLength(1, 'NISN is required'),
        length(10, 'Make Sure your NISN is 10 digits')
    ),
    name: pipe(string(), minLength(1, 'Full Name is required')),
    gender: pipe(string(), minLength(1, 'Gender is required')),
    place_of_birth: pipe(string(), minLength(1, 'Place of Birth is required')),
    date_of_birth: pipe(string(), minLength(1, 'Date of Birth is required')),
    religion: pipe(string(), minLength(1, 'Religion is required')),
    address: pipe(
        string(),
        minLength(1, 'Address is required'),
        maxLength(200, 'Student Address too long')
    ),
    number_phone: pipe(
        string(),
        minLength(1, 'Phone Number is required'),
        check(
            (value) => /^(08|\+62)\d{8,14}$/.test(value),
            'Phone number must start with 08 or +62 and contain 8-14 digits.'
        )
    ),
    email: pipe(
        string(),
        minLength(1, 'Email is required'),
        email('Invalid Email')
    ),
    accepted_date: pipe(string(), minLength(1, 'Accepted Date is required')),
    school_origin: pipe(string(), minLength(1, 'School Origin is required')),
    class_id: pipe(string(), minLength(1, 'Class is required')),
    father_name: pipe(string(), minLength(1, 'Father Name is required')),
    father_job: pipe(string(), minLength(1, 'Father Job is required')),
    father_number_phone: pipe(
        string(),
        minLength(1, 'Father Phone Number is required'),
        check(
            (value) => /^(08|\+62)\d{8,14}$/.test(value),
            'Phone number must start with 08 or +62 and contain 8-14 digits.'
        )
    ),
    mother_name: pipe(string(), minLength(1, 'Mother Name is required')),
    mother_job: pipe(string(), minLength(1, 'Mother Job is required')),
    mother_number_phone: pipe(
        string(),
        minLength(1, 'Mother Phone Number is required'),
        check(
            (value) => /^(08|\+62)\d{8,14}$/.test(value),
            'Phone number must start with 08 or +62 and contain 8-14 digits.'
        )
    ),
})

const StudentForm = () => {
    const searchParams = useSearchParams()
    const actionType = searchParams.get('action')
    const id = searchParams.get('student')

    const [data, setData] = useState<StudentDataProps>()
    const [classData, setClassData] = useState<classDataProps[]>([])
    const [open, setOpen] = useState(false)
    const [errorData, setErrorData] = useState<string | null>(null)

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setError,
    } = useForm<ObjectInput>({
        resolver: valibotResolver(ObjectSchema),
        defaultValues: {
            nisn: '',
            name: '',
            gender: '',
            place_of_birth: '',
            date_of_birth: '',
            religion: '',
            address: '',
            number_phone: '',
            email: '',
            accepted_date: '',
            school_origin: '',
            class_id: '',
            father_name: '',
            father_job: '',
            father_number_phone: '',
            mother_name: '',
            mother_job: '',
            mother_number_phone: '',
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
        const fetchDataClass = async () => {
            try {
                const result = await getClass()

                setClassData(result.data.ClassName)
                return result
            } catch (error) {
                console.error('API request error', error)
            }
        }

        fetchDataClass()
    }, [id])

    useEffect(() => {
        if (data) {
            reset({
                nisn: data.nisn || '',
                name: data.name || '',
                gender: data.gender || '',
                place_of_birth: data.place_of_birth || '',
                date_of_birth: data.date_of_birth || '',
                religion: data.religion || '',
                address: data.address || '',
                number_phone: data.number_phone || '',
                email: data.email || '',
                accepted_date: data.accepted_date || '',
                school_origin: data.school_origin || '',
                class_id: data.class_id?.toString() || '',
                father_name: data.father_name || '',
                father_job: data.father_job || '',
                father_number_phone: data.father_number_phone || '',
                mother_name: data.mother_name || '',
                mother_job: data.mother_job || '',
                mother_number_phone: data.mother_number_phone || '',
            })
        }
    }, [data, reset])

    const onSubmit = async (data: ObjectInput) => {
        const newData: StudentDataProps = {
            nisn: data.nisn,
            name: data.name,
            gender: data.gender,
            place_of_birth: data.place_of_birth,
            date_of_birth: data.date_of_birth,
            religion: data.religion,
            address: data.address,
            number_phone: formatPhoneNumber(data.number_phone),
            email: data.email,
            accepted_date: data.accepted_date,
            school_origin: data.school_origin,
            class_id: Number(data.class_id),
            father_name: data.father_name,
            father_job: data.father_job,
            father_number_phone: formatPhoneNumber(data.father_number_phone),
            mother_name: data.mother_name,
            mother_job: data.mother_job,
            mother_number_phone: formatPhoneNumber(data.mother_number_phone),
            ClassName: {
                id: 0,
                name: '',
                Grade: {
                    grade: 0,
                },
            },
        }

        console.log('newData', newData)

        try {
            let response
            if (actionType === 'update' && id) {
                response = await updateStudent(id, newData)
            } else if (actionType === 'create') {
                response = await createStudent(newData)
            }
            if (response?.status === 200) {
                alert(
                    actionType === 'update'
                        ? 'Student updated successfully'
                        : 'Student created successfully'
                )

                window.location.href = '/personal-data/student'
            } else if (response?.status === 400) {
                console.log(response.data.error)
                if (response.data.error) {
                }
                // alert('Failed to create student')
            }
        } catch (error) {
            console.error('API request error', error)
            const errorMessage = String(error)

            if (
                errorMessage.includes('nisn') &&
                errorMessage.includes('duplicate')
            )
                setError('nisn', { message: 'NISN already exists' })
            else if (
                errorMessage.includes('email') &&
                errorMessage.includes('duplicate')
            )
                setError('email', { message: 'Email already exists' })
            else if (
                errorMessage.includes('number') &&
                errorMessage.includes('duplicate')
            )
                setError('number_phone', {
                    message: 'Number Phone already exists',
                })
            else if (
                errorMessage.includes('number') &&
                errorMessage.includes('mother') &&
                errorMessage.includes('duplicate')
            )
                setError('mother_number_phone', {
                    message: 'Mother Number Phone already exists',
                })
            else if (
                errorMessage.includes('number') &&
                errorMessage.includes('father') &&
                errorMessage.includes('duplicate')
            )
                setError('father_number_phone', {
                    message: 'Father Number Phone already exists',
                })
        }
    }

    const handleFileUpload = async (file: File | null): Promise<boolean> => {
        if (!file) return false // Return false if no file is provided

        const reader = new FileReader()

        return new Promise((resolve, reject) => {
            reader.onload = async (event) => {
                try {
                    const data = event.target?.result
                    const workbook = XLSX.read(data, { type: 'binary' })

                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
                    const jsonData = XLSX.utils.sheet_to_json<any[]>(
                        firstSheet,
                        {
                            header: 1,
                        }
                    )

                    const [, ...studentData] = jsonData
                    if (studentData.length > 0) {
                        const newDataArray: StudentDataProps[] = []
                        for (const student of studentData) {
                            const [
                                nisn,
                                name,
                                gender,
                                place_of_birth,
                                date_of_birth,
                                religion,
                                address,
                                number_phone,
                                email,
                                accepted_date,
                                school_origin,
                                class_id,
                                father_name,
                                father_job,
                                father_number_phone,
                                mother_name,
                                mother_job,
                                mother_number_phone,
                            ] = student

                            const newData: StudentDataProps = {
                                nisn: nisn?.toString() || '',
                                name: name || '',
                                gender: gender || '',
                                place_of_birth: place_of_birth || '',
                                date_of_birth:
                                    formatDateForm(date_of_birth) || '',
                                religion: religion || '',
                                address: address || '',
                                number_phone: formatPhoneNumber(
                                    number_phone?.toString()
                                ),
                                email: email || '',
                                accepted_date:
                                    formatDateForm(accepted_date) || '',
                                school_origin: school_origin || '',
                                class_id: class_id || 0,
                                father_name: father_name || '',
                                father_job: father_job || '',
                                father_number_phone: formatPhoneNumber(
                                    father_number_phone?.toString()
                                ),
                                mother_name: mother_name || '',
                                mother_job: mother_job || '',
                                mother_number_phone: formatPhoneNumber(
                                    mother_number_phone?.toString()
                                ),
                                ClassName: {
                                    id: 0,
                                    name: '',
                                    Grade: {
                                        grade: 0,
                                    },
                                },
                            }
                            newDataArray.push(newData)
                        }
                        const response = await createStudentbyExcel(
                            newDataArray
                        )

                        if (response.status === 200) {
                            window.location.href = '/personal-data/student'

                            resolve(true) // Resolve with true if successful
                        } else {
                            resolve(false) // Resolve with false if response is not 200
                        }
                    } else {
                        resolve(false)
                    }
                } catch (error) {
                    console.error('API request error', error)
                    setErrorData(String(error))
                    reject(error) // Reject the promise if an error occurs
                }
            }

            reader.readAsBinaryString(file)
        })
    }

    return (
        <Box sx={{ padding: 3, width: '100%' }}>
            {actionType === 'create' ? (
                <div className="flex items-center">
                    <h1 className="my-8 w-full text-3xl font-bold text-[#0C4177]">
                        Add New Student
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
                    Update Student
                </h1>
            )}

            <div className="min-h-screen w-full rounded-3xl bg-white p-5 text-[#0C4177] shadow-md">
                <ImportData
                    setOpen={handleDialog}
                    handleImport={handleFileUpload}
                    error={errorData}
                    open={open}
                />

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-[#353535]"
                >
                    <div>
                        <h1 className="my-8 text-xl text-[#0C4177]">
                            Student’s Personal Data
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                        <ControllerField
                            control={control}
                            name="nisn"
                            label="NISN"
                            placeholder="Please input student’s nisn."
                            errors={errors.nisn}
                            value={data?.nisn}
                        />
                        <ControllerField
                            control={control}
                            name="name"
                            label="Full Name"
                            placeholder="Please input student’s Full Name"
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
                            placeholder={'Please choose student’s gender.'}
                            errors={errors.gender}
                            value={data?.gender}
                        />
                        <ControllerField
                            control={control}
                            name="place_of_birth"
                            label="Place of Birth"
                            placeholder="Please input student’s Place of Birth"
                            errors={errors.place_of_birth}
                            value={data?.place_of_birth}
                        />
                        <ControllerField
                            control={control}
                            name="date_of_birth"
                            label="Date Of Birth"
                            placeholder="Please input student’s Date Of Birth"
                            type="date"
                            errors={errors.date_of_birth}
                            value={data?.date_of_birth}
                        />
                        <ControllerSelectField
                            control={control}
                            name="religion"
                            label="Religion"
                            options={religionList.map((value) => ({
                                label: value,
                            }))}
                            placeholder="Please choose student’s Religion."
                            errors={errors.religion}
                            value={data?.religion}
                        />
                        <ControllerField
                            control={control}
                            name="address"
                            label="Address"
                            placeholder="Please input student’s address"
                            errors={errors.address}
                            value={data?.address}
                        />
                        <ControllerField
                            control={control}
                            name="number_phone"
                            label="Phone Number"
                            placeholder="Please input student’s Number Phone"
                            errors={errors.number_phone}
                            value={data?.number_phone}
                        />

                        <ControllerField
                            control={control}
                            name="email"
                            label="Email"
                            placeholder="Please input student’s Email"
                            errors={errors.email}
                            value={data?.email}
                        />
                        <ControllerField
                            control={control}
                            name="accepted_date"
                            label="Accepted Date"
                            placeholder="Please input student’s Accepted Date"
                            type="date"
                            errors={errors.accepted_date}
                            value={data?.accepted_date}
                        />
                        <ControllerField
                            control={control}
                            name="school_origin"
                            label="School Origin"
                            placeholder="Please input student’s School Origin"
                            errors={errors.school_origin}
                            value={data?.school_origin}
                        />
                        <ControllerSelectField
                            control={control}
                            name="class_id"
                            label="Class"
                            options={classData.map((item: classDataProps) => ({
                                value: item.id,
                                label: `${item.Grade.grade}${item.name}`,
                            }))}
                            placeholder="Please choose student’s Class."
                            errors={errors.class_id}
                            value={data?.class_id}
                        />
                    </div>
                    <h1 className="my-8 text-xl text-[#0C4177]">
                        Student Parents’ Data
                    </h1>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                        <ControllerField
                            control={control}
                            name="father_name"
                            label="Father Name"
                            placeholder="Please input Father Name"
                            errors={errors.father_name}
                            value={data?.father_name}
                        />
                        <ControllerField
                            control={control}
                            name="mother_name"
                            label="Mother Name"
                            placeholder="Please input Mother Name"
                            errors={errors.mother_name}
                            value={data?.mother_name}
                        />
                        <ControllerField
                            control={control}
                            name="father_job"
                            label="Father Job"
                            placeholder="Please input Father Job"
                            errors={errors.father_job}
                            value={data?.father_job}
                        />
                        <ControllerField
                            control={control}
                            name="mother_job"
                            label="Mother Job"
                            placeholder="Please input Mother Job"
                            errors={errors.mother_job}
                            value={data?.mother_job}
                        />
                        <ControllerField
                            control={control}
                            name="father_number_phone"
                            label="Father Phone Number"
                            placeholder="Please input Father Phone Number"
                            errors={errors.father_number_phone}
                            value={data?.father_number_phone}
                        />
                        <ControllerField
                            control={control}
                            name="mother_number_phone"
                            label="Mother Phone Number"
                            placeholder="Please input Mother Phone Number"
                            errors={errors.mother_number_phone}
                            value={data?.mother_number_phone}
                        />
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
            </div>
        </Box>
    )
}

export default StudentForm
