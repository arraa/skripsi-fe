'use client'

import Table from '@/components/common/Table'

import { Box } from '@mui/material'
import { SetStateAction, useEffect, useMemo, useState } from 'react'
import { Button } from '../common/button/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { array, object, string } from 'valibot'
import { columnDataScoringForm } from './column'
import { StudentScoringPerSubject } from './types/types'
import { validateCreateOrGetAsgType } from '@/app/api/scoring'
import { getSubjectClassNameById } from '@/app/api/subject'
import { createStudentsScoreByClassAndSubject } from '@/app/api/score'
import ConfirmationDialog from './ConfirmationDialog'

const ObjectSchema = array(
    object({
        reason: string(),
    })
)

const ScoringSubjectForm = () => {
    const searchParams = useSearchParams()
    const classID = Number(searchParams.get('class_id'))
    const subjectID = Number(searchParams.get('subject_id'))

    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [customOption, setCustomOption] = useState('')
    const [showCustomInput, setShowCustomInput] = useState(false)
    const [assignmentID, setAssignmentID] = useState(0)
    const [subjectData, setSubjectData] = useState<{
        grade_class_name: string
        subject_name: string
    }>()

    const [dataForm, setDataForm] = useState<
        { StudentID: number; Scores: number; StudentName: string }[]
    >([])
    const [studentScorings, setStudentScorings] = useState<
        StudentScoringFormProps[]
    >([])

    useEffect(() => {
        // Get class name and subject name
        getSubjectClassNameById(subjectID, classID)
            .then((res) => {
                setSubjectData({
                    grade_class_name: res.data.subject.grade_class_name,
                    subject_name: res.data.subject.subject_name,
                })
                setStudentScorings(
                    res.data.subject.students.map((student, index) => {
                        return {
                            id: index + 1,
                            score: 0,
                            StudentID: student.StudentID,
                            StudentName: student.name,
                        }
                    })
                )
            })
            .catch((error) => {
                console.error('Error getting subject class name:', error)
            })
    }, [classID, subjectID])

    // Handle option change
    const handleOptionChange = (option: SetStateAction<string>) => {
        setSelectedOption(option)
        if (option === 'Tambahkan opsi') {
            setShowCustomInput(true) // Show input when "Tambahkan opsi" is selected
        } else {
            if (option === 'PAS') {
                setAssignmentID(1)
            } else if (option === 'PTS') {
                setAssignmentID(2)
            }
            setShowCustomInput(false)
        }
    }

    console.log(assignmentID)

    const handleValidateCreateOrGetAsgType = async () => {
        if (selectedOption === 'Tambahkan opsi') {
            validateCreateOrGetAsgType(customOption)
                .then((result) => {
                    if (result.status !== 200) {
                        throw new Error('Failed to validate custom option')
                    } else {
                        console.log('Custom option validated:', result)
                        const data = result.data.assignment.AssignmentID

                        console.log('data', data)
                        setAssignmentID(data)
                        setShowCustomInput(false)
                        setSelectedOption(customOption)
                    }
                })
                .catch((error) => {
                    throw new Error('Failed to validate custom option')
                })
        }
    }

    const { handleSubmit, control } = useForm<StudentScoringPerSubject>({
        defaultValues: {},
    })

    const handleOpenDialog = (data: StudentScoringPerSubject) => {
        if (assignmentID === 0) {
            alert('Please select assignment type')
            return
        }

        if (Object.values(data).includes(undefined)) {
            alert('Please input the score')
            return
        }

        const studentsScore: {
            StudentID: number
            Scores: number
            StudentName: string
        }[] = Object.entries(data).map(([StudentID, Score]) => ({
            StudentID: Number(StudentID),
            Scores: Number(Score),
            StudentName: '',
        }))

        // Assuming studentScorings is an array of objects with studentID and name
        studentsScore.forEach((student) => {
            const matchingStudent = studentScorings.find(
                (s) => s.StudentID === student.StudentID
            )
            if (matchingStudent) {
                student.StudentName = matchingStudent.StudentName // Assign the name
            }
        })

        setDataForm(studentsScore)
        setOpenConfirmationDialog(true)
    }

    const handleConfirmSubmit = () => {
        if (assignmentID === 0) return

        const studentsScore = Object.entries(dataForm).map(
            ([StudentID, Scores]) => ({
                studentID: Scores.StudentID,
                score: Scores.Scores,
            })
        )

        console.log(studentsScore)

        createStudentsScoreByClassAndSubject(
            classID,
            subjectID,
            assignmentID,
            studentsScore
        )
            .then(() => {
                window.location.href = '/scoring/subject'
            })
            .catch(() => {
                alert('Failed to submit score data')
            })
    }
    const rows = columnDataScoringForm(control)

    return (
        <Box sx={{ padding: 3, paddingLeft: 0, width: '84vw' }}>
            <div className="mb-2 flex items-center justify-between">
                <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                    Class Score {subjectData?.grade_class_name}{' '}
                    {subjectData?.subject_name}
                </h1>
            </div>
            {/* <div className=' h-[80vh] bg-white'> */}
            <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 text-[#0C4177] shadow-md">
                <form
                    onSubmit={handleSubmit(handleOpenDialog)}
                    className="text-[#353535]"
                >
                    <div className=" flex w-full justify-start text-base  text-[#0c42777a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  ">
                        <div className="relative w-1/4">
                            <div className="relative">
                                <div className="relative ">
                                    <button
                                        id="custom-dropdown"
                                        className="w-full rounded-lg border  p-2 text-left"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setShowCustomInput((prev) => !prev)
                                        }}
                                    >
                                        {selectedOption ||
                                            'Input Assignment Type...'}
                                    </button>

                                    {showCustomInput && (
                                        <div className="absolute z-10 mt-1 w-full rounded-lg border bg-white ">
                                            <div
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleOptionChange('PAS')
                                                }
                                            >
                                                PAS
                                            </div>
                                            <div
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleOptionChange('PTS')
                                                }
                                            >
                                                PTS
                                            </div>
                                            <div
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleOptionChange(
                                                        'Tambahkan opsi'
                                                    )
                                                }
                                            >
                                                Tambahkan Tugas Lainnya
                                            </div>
                                            {selectedOption ===
                                                'Tambahkan opsi' && (
                                                <>
                                                    <div className="p-2">
                                                        <input
                                                            type="text"
                                                            value={customOption}
                                                            onChange={(e) =>
                                                                setCustomOption(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="mt-2 w-full rounded-lg border p-2"
                                                            placeholder="Ketik opsi Anda..."
                                                        />
                                                    </div>
                                                    <Button
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleValidateCreateOrGetAsgType()
                                                        }}
                                                        size={'full'}
                                                    >
                                                        {' '}
                                                        Tambah{' '}
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Table
                        data={studentScorings}
                        columnData={rows}
                        heighRow={50}
                    />

                    <div className="mb-4 flex justify-end">
                        <Button size={'submit'}>Submit</Button>
                    </div>
                </form>
            </div>

            <ConfirmationDialog
                open={openConfirmationDialog}
                data={dataForm}
                onConfirm={handleConfirmSubmit}
                onCancel={() => setOpenConfirmationDialog(false)}
            />
        </Box>
    )
}

export default ScoringSubjectForm
