'use client'

import { useEffect, useState } from 'react'
import { StudentScoringEditFormProps } from './types/types'
import { Button } from '../common/button/button'
import { Controller, useForm } from 'react-hook-form'
// import {
//     array,
//     minLength,
//     minValue,
//     number,
//     object,
//     pipe,
//     string,
// } from 'valibot'
// import { valibotResolver } from '@hookform/resolvers/valibot'
// import type { InferInput } from 'valibot'
import { useSearchParams } from 'next/navigation'
import { Box } from '@mui/material'
import {
    getStudentScoresByStudentSubjectClassID,
    updateStudentScoresByStudentSubjectClassID,
} from '@/app/api/score'

// TODO: add validation for the form
// type ObjectInput = InferInput<typeof ObjectSchema>

// const ObjectSchema = object({
//     StudentName: pipe(string(), minLength(1, 'Student Name is required')),
//     Scoring: array(
//         object({
//             AssignmentType: pipe(
//                 string(),
//                 minLength(1, 'Assignment Type is required')
//             ),
//             SubjectName: pipe(
//                 string(),
//                 minLength(1, 'Subject Name is required')
//             ),
//             Score: pipe(number(), minValue(0, 'Score is required')),
//         })
//     ),
// })

const ScoringEditForm = () => {
    const [dataSiswa, setDataSiswa] = useState<StudentScoringEditFormProps>({
        StudentName: '',
        SubjectName: '',
        Scores: [],
    })

    const searchParams = useSearchParams()
    const studentID = searchParams.get('student_id')
    const classID = searchParams.get('class_id')
    const subjectID = searchParams.get('subject_id')

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        // resolver: valibotResolver(ObjectSchema),
        defaultValues: {
            StudentName: '',
            SubjectName: '',
            Scores: [
                {
                    AssignmentID: 0,
                    AssignmentType: '',
                    Score: 0,
                },
            ],
        },
    })

    useEffect(() => {
        if (studentID && subjectID && classID) {
            getStudentScoresByStudentSubjectClassID(
                studentID,
                subjectID,
                classID
            )
                .then((response) => {
                    const newData = {
                        StudentName: response.score.student_name,
                        SubjectName: response.score.subject_name,
                        Scores: response.score.scores.map((score) => ({
                            AssignmentID: score.assignment_id,
                            AssignmentType: score.assignment_type,
                            SubjectName: response.score.subject_name,
                            Score: score.score,
                        })),
                    }
                    setDataSiswa(newData)
                    reset(newData)
                })
                .catch((error) => {
                    console.error('error', error)
                })
        }
    }, [studentID, subjectID, classID, reset])

    const onSubmit = (data: StudentScoringEditFormProps) => {
        if (classID && subjectID) {
            updateStudentScoresByStudentSubjectClassID(
                parseInt(classID),
                parseInt(subjectID),
                data
            )
                .then(() => {
                    alert('Score updated successfully')
                })
                .catch((error) => {
                    console.error('error', error)
                })
        }
    }

    return (
        <Box sx={{ padding: 3, width: '100%' }}>
            <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
                Update Score
            </h1>

            <div className="min-h-screen w-full rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-[#353535]"
                >
                    <div>
                        <h1 className="my-8 text-xl text-[#0C4177]">
                            {dataSiswa.StudentName}
                        </h1>
                    </div>
                    <>
                        <div className="mb-6">
                            <h2 className="mb-4 text-lg font-semibold">
                                {dataSiswa.SubjectName}
                            </h2>
                            <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                                {dataSiswa.Scores.map((asg, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2"
                                    >
                                        <label
                                            htmlFor={`Scoring.${dataSiswa.Scores.findIndex(
                                                (s) =>
                                                    s.AssignmentID ===
                                                    asg.AssignmentID
                                            )}.Score`}
                                        >
                                            {asg.AssignmentType}
                                        </label>
                                        <Controller
                                            name={`Scores.${dataSiswa.Scores.findIndex(
                                                (s) =>
                                                    s.AssignmentID ===
                                                    asg.AssignmentID
                                            )}.Score`}
                                            control={control}
                                            defaultValue={asg.Score ?? 0}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    id={`Scoring.${dataSiswa.Scores.findIndex(
                                                        (s) =>
                                                            s.AssignmentID ===
                                                            asg.AssignmentID
                                                    )}.Score`}
                                                    className="rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75"
                                                    type={'number'}
                                                    value={
                                                        field.value as number
                                                    }
                                                    onChange={(e) => {
                                                        field.onChange(
                                                            parseFloat(
                                                                e.target.value
                                                            )
                                                        ) // Parse string to number
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors && (
                                            <p className="text-xs italic text-red-500">
                                                {
                                                    errors.Scores?.[index]
                                                        ?.Score?.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
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

export default ScoringEditForm
