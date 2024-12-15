'use client'

import Table from '@/components/common/Table'

import { Box } from '@mui/material'
import { deleteClass, getClass } from '@/app/api/class'
import { useEffect, useState } from 'react'
import { Button } from '../common/button/button'
import { StudentScoringPerSubject, StudentScoringSummary } from './types/types'
import Delete from '../common/dialog/Delete'
import { columnData, columnDataSummary } from './column'
import { classDataProps } from '../studentData/types/types'
import { getSummaryScoreByClass } from '@/app/api/score'
import { useRouter } from 'next/navigation'

const ScoringSummary = () => {
    const [classData, setClassData] = useState<classDataProps[]>([])
    const [selectedClass, setSelectedClass] = useState<number>()
    const [scoreSummary, setScoreSummary] = useState<StudentScoringSummary[]>(
        []
    )
    const router = useRouter()

    const uniqueAssignmentTypes = Array.from(
        new Set(
            scoreSummary.flatMap((student) =>
                student.Scores.map((score) => score.SubjectName)
            )
        )
    )

    const handleClassChange = (value: number) => {
        setSelectedClass(value)
    }

    const handleUpdate = (id: number) => {
        router.push(`/scoring/scoring-form?type=summary&student=${id}`)
        console.log('handleClickOpen clicked', id)
    }

    const columns = columnDataSummary(handleUpdate, uniqueAssignmentTypes)

    const rows = classData.map((row, index) => ({
        ...row,
        isLastRow: index === classData.length - 1, // Set true for the last row
    }))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultClass = await getClass()

                const dataClasses = resultClass.data.ClassName

                setClassData(dataClasses)

                console.log('dataClasses', dataClasses)

                if (dataClasses.length > 0) {
                    setSelectedClass(dataClasses[0].id)
                }
            } catch (error) {
                console.error('API request error', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (selectedClass) {
            getSummaryScoreByClass(selectedClass).then((response) => {
                console.log('datasummary', response.data)
                setScoreSummary(
                    response.data.score
                        ? response.data.score.map((item, idx) => {
                            return {
                                id: idx,
                                StudentID: item.StudentID,
                                StudentName: item.StudentName,
                                Scores: item.Scores.map((score) => {
                                    return {
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

    return (
        <Box sx={{ paddingY: 3, px: 2, paddingLeft: 0, width: '84vw' }}>
            <div className="mb-2 flex items-center justify-between">
                <h1 className="mb-6 mt-2 text-3xl font-bold text-[#0C4177]">
                    Summary Scoring
                </h1>
                <div className="flex cursor-pointer bg-[#31426E]  text-white sm:rounded-md">
                    <select
                        className="mx-2 w-full bg-transparent px-6 py-3 text-lg"
                        value={selectedClass}
                        id="class-select"
                        onChange={(e) =>
                            handleClassChange(Number(e.target.value))
                        }
                        aria-label="Select Class"
                    >
                        {classData &&
                            classData.map((classItem) => (
                                <option
                                    key={classItem.id}
                                    value={classItem.id}
                                    className=" text-[#31426E]"
                                >
                                    Class {classItem.Grade.grade}{' '}
                                    {classItem.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-3xl p-5 text-[#0c427770] shadow-md">
                <Table data={scoreSummary} columnData={columns} />
            </div>
        </Box>
    )
}

export default ScoringSummary
