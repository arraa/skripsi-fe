'use client'

import Table from '@/components/common/Table'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { Button } from '../common/button/button'
import { StudentScoringPerSubject, SubjectClassDataProps } from './types/types'
import Delete from '../common/dialog/Delete'
import { columnData } from './column'
import { useRouter } from 'next/navigation'
import { getAllSubjectClassName, getScoringCLassList } from '@/app/api/subject'
import { getAllScoreByClassAndSubject } from '@/app/api/score'

const ScoringPerSubject = () => {
    const [classDataApi, setClassDataApi] = useState<SubjectClassDataProps[]>(
        []
    )
    const [open, setOpen] = useState(false)
    const [selectedClass, setSelectedClass] = useState<{
        ClassID: number
        SubjectID: number
    } | null>(null)
    const [scoreClassSubject, setScoreClassSubject] = useState<
        StudentScoringPerSubject[]
    >([])

    console.log('selectedClass', selectedClass)

    const handleClassChange = (value: string) => {
        const classNameID = value.split(',')[1]
        const subjectID = value.split(',')[0]

        setSelectedClass({
            ClassID: Number(classNameID),
            SubjectID: Number(subjectID),
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultSubjectClass = await getScoringCLassList()
                if (resultSubjectClass.status !== 200) {
                    throw new Error('API request error')
                }
                const classData = resultSubjectClass.data.class_list.map(
                    (subject: SubjectClassDataProps) => ({
                        subject_id: subject.subject_id,
                        class_name_id: subject.class_name_id,
                        grade_class_name: subject.grade_class_name,
                        subject_name: subject.subject_name,
                    })
                )
                setClassDataApi(classData)
                if (classData.length > 0) {
                    setSelectedClass({
                        ClassID: classData[0].class_name_id,
                        SubjectID: classData[0].subject_id,
                    })
                }
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (selectedClass) {
            getAllScoreByClassAndSubject(
                selectedClass.ClassID,
                selectedClass.SubjectID
            ).then((response) => {
                setScoreClassSubject(
                    response.data.score
                        ? response.data.score.map((item, idx) => {
                            return {
                                id: idx,
                                StudentID: item.StudentID,
                                ScoringID: item.ScoringID,
                                StudentName: item.StudentName,
                                Scores: item.Scores.map((score) => {
                                    return {
                                        SubjectID: score.SubjectID,
                                        AssignmentID: score.AssignmentID,
                                        TeacherID: score.TeacherID,
                                        AssignmentType: score.AssignmentType,
                                        SubjectName: score.SubjectName,
                                        Score: score.Score,
                                    }
                                }),
                            }
                        })
                        : []
                )
            })
        }
    }, [selectedClass])

    const uniqueAssignmentTypes = scoreClassSubject
        ? scoreClassSubject
            .slice()
            .sort((a, b) => b.Scores.length - a.Scores.length)
            .flatMap((item) =>
                item.Scores.map((Scores) => Scores.AssignmentType)
            )
            .filter((value, index, self) => self.indexOf(value) === index)
        : []

    const handleClickOpen = (classId: number) => {}

    const router = useRouter()

    const handleUpdate = (id: number) => {
        router.push(`/scoring/scoring-form?type=update&student=${id}`)
    }

    const columns = columnData(handleUpdate, uniqueAssignmentTypes)
    return (
        <Box sx={{ paddingY: 3, px: 2, paddingLeft: 0, width: '84vw' }}>
            <div className="mb-2 flex items-center justify-between">
                <h1 className="mb-6 mt-2  text-3xl font-bold text-[#0C4177]">
                    Scoring
                </h1>
                <div className="flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md">
                    <label htmlFor="class-select" className="sr-only">
                        Select Class
                    </label>
                    <select
                        id="class-select"
                        className="mx-2 w-full bg-transparent px-6 py-3 text-lg"
                        value={[
                            `${selectedClass?.SubjectID}`,
                            `${selectedClass?.ClassID}`,
                        ]}
                        onChange={(e) => handleClassChange(e.target.value)}
                    >
                        {classDataApi.map((item) => (
                            <option
                                key={item.subject_id}
                                value={[
                                    `${item.subject_id}`,
                                    `${item.class_name_id}`,
                                ]}
                                className="text-[#0C4177]"
                            >
                                {item.grade_class_name} - {item.subject_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex  flex-col gap-4 rounded-3xl p-5 text-[#0C4177] shadow-md">
                <div className="flex justify-end">
                    <Button
                        size={'default'}
                        onClick={() => {
                            router.push(
                                `/scoring/scoring-form?action=create&class_id=${selectedClass?.ClassID}&subject_id=${selectedClass?.SubjectID}`
                            )
                        }}
                    >
                        Add Scoring
                    </Button>
                </div>
                <Table data={scoreClassSubject} columnData={columns} />
            </div>
            {/* </div> */}
        </Box>
    )
}

export default ScoringPerSubject
