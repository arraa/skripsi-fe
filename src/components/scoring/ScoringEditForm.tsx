'use client';

import { useEffect, useState } from 'react';
import {
    ScoringItem,
    StudentScoringPerSubject,
} from './types/types';
import * as XLSX from 'xlsx';
import { Button } from '../common/button/button';
import {
    createStudent,
    createStudentbyExcel,
    updateStudent,
} from '@/app/api/student';
import { valibotResolver } from '@hookform/resolvers/valibot';
import type { InferInput } from 'valibot';
import { Controller, useForm } from 'react-hook-form';
import { ControllerField } from '../common/form/textField';
import { ControllerSelectField } from '../common/form/selectField';
import {
    array,
    minLength,
    minValue,
    number,
    object,
    pipe,
    string,
} from 'valibot';
import { getClass } from '@/app/api/class';
import ImportData from '../common/dialog/ImportData';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { getStudentById } from '@/app/api/student';
import {
    formatDateForm,
    formatPhoneNumber,
    formatStudentData,
} from '@/lib/formatData';
import { religionList } from '@/constant/religionList';

type ObjectInput = InferInput<typeof ObjectSchema>;

const ObjectSchema = object({
    StudentName: pipe(string(), minLength(1, 'Student Name is required')),
    Scoring: array(
        object({
            AssignmentType: pipe(
                string(),
                minLength(1, 'Assignment Type is required')
            ),
            SubjectName: pipe(string(), minLength(1, 'Subject Name is required')),
            Score: pipe(number(), minValue(0, 'Score is required')),
        })
    ),
});

const ScoringEditForm = () => {
    const dataSiswa: StudentScoringPerSubject = {
        id: 1,
        StudentID: 1,
        ScoringID: 101,
        StudentName: 'Alice Johnson',
        Scoring: [
            // Math
            {
                SubjectID: 201,
                AssignmentID: 301,
                TeacherID: 401,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Math',
                Score: 85,
            },
            {
                SubjectID: 202,
                AssignmentID: 302,
                TeacherID: 401,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Math',
                Score: 90,
            },
            {
                SubjectID: 301,
                AssignmentID: 401,
                TeacherID: 501,
                AssignmentType: 'Quiz 3',
                SubjectName: 'Math',
                Score: 88,
            },
            {
                SubjectID: 302,
                AssignmentID: 402,
                TeacherID: 501,
                AssignmentType: 'Quiz 4',
                SubjectName: 'Math',
                Score: 92,
            },
            {
                SubjectID: 401,
                AssignmentID: 501,
                TeacherID: 601,
                AssignmentType: 'PTS',
                SubjectName: 'Math',
                Score: 83,
            },
            {
                SubjectID: 402,
                AssignmentID: 502,
                TeacherID: 601,
                AssignmentType: 'PAS',
                SubjectName: 'Math',
                Score: 87,
            },
            {
                SubjectID: 201,
                AssignmentID: 301,
                TeacherID: 401,
                AssignmentType: 'Quiz 1',
                SubjectName: 'Science',
                Score: 90,
            },
            {
                SubjectID: 202,
                AssignmentID: 302,
                TeacherID: 401,
                AssignmentType: 'Quiz 2',
                SubjectName: 'Science',
                Score: 90,
            },
            {
                SubjectID: 301,
                AssignmentID: 401,
                TeacherID: 501,
                AssignmentType: 'Quiz 3',
                SubjectName: 'Science',
                Score: 90,
            },
            {
                SubjectID: 302,
                AssignmentID: 402,
                TeacherID: 501,
                AssignmentType: 'Quiz 4',
                SubjectName: 'Science',
                Score: 90,
            },
            {
                SubjectID: 401,
                AssignmentID: 501,
                TeacherID: 601,
                AssignmentType: 'PTS',
                SubjectName: 'Science',
                Score: 90,
            },
            {
                SubjectID: 402,
                AssignmentID: 502,
                TeacherID: 601,
                AssignmentType: 'PAS',
                SubjectName: 'Science',
                Score: 87,
            },
            {
                SubjectID: 201,
                AssignmentID: 301,
                TeacherID: 401,
                AssignmentType: 'Quiz 1',
                SubjectName: 'English',
                Score: 30,
            },
            {
                SubjectID: 202,
                AssignmentID: 302,
                TeacherID: 401,
                AssignmentType: 'Quiz 2',
                SubjectName: 'English',
                Score: 30,
            },
            {
                SubjectID: 301,
                AssignmentID: 401,
                TeacherID: 501,
                AssignmentType: 'Quiz 3',
                SubjectName: 'English',
                Score: 30,
            },
            {
                SubjectID: 302,
                AssignmentID: 402,
                TeacherID: 501,
                AssignmentType: 'Quiz 4',
                SubjectName: 'English',
                Score: 30,
            },
            {
                SubjectID: 401,
                AssignmentID: 501,
                TeacherID: 601,
                AssignmentType: 'PTS',
                SubjectName: 'English',
                Score: 30,
            },
            {
                SubjectID: 402,
                AssignmentID: 502,
                TeacherID: 601,
                AssignmentType: 'PAS',
                SubjectName: 'English',
                Score: 30,
            },
        ],
    };

    const uniqueAssignmentTypes = Array.from(
        new Set(dataSiswa.Scoring.map((score) => score.AssignmentType))
    );

    const uniqueSummaryTypes = Array.from(
        new Set(dataSiswa.Scoring.map((score) => score.SubjectName))
    );

    const searchParams = useSearchParams();
    const actionType = searchParams.get('action');
    const id = searchParams.get('student');

    const [open, setOpen] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ObjectInput>({
        resolver: valibotResolver(ObjectSchema),
        defaultValues: {
            StudentName: dataSiswa.StudentName,
            Scoring: [
                {
                    AssignmentType: '',
                    SubjectName: '',
                    Score: 0,
                },
            ],
        },
    });


    const groupedScoring = dataSiswa.Scoring.reduce<
    Record<string, ScoringItem[]>
  >((acc, item) => {
      acc[item.SubjectName] = acc[item.SubjectName] || [];
      acc[item.SubjectName].push(item);
      return acc;
  }, {});

    useEffect(() => {
    // Create a default values object based on groupedScoring
        const defaultValues = {
            StudentName: dataSiswa.StudentName,
            Scoring: [] as {
        AssignmentType: string;
        SubjectName: string;
        Score: number;
      }[], // Empty array to hold scoring data
        };

        // Loop through groupedScoring and populate default values for each assignment's score
        Object.entries(groupedScoring).forEach(([subjectName, assignments]) => {
            assignments.forEach((assignment) => {
                defaultValues.Scoring.push({
                    AssignmentType: assignment.AssignmentType,
                    SubjectName: subjectName,
                    Score: assignment.Score,
                });
            });
        });

        console.log('Default Values:', defaultValues);
        reset(defaultValues);
    }, [reset]);

    const onSubmit = (formData: ObjectInput) => {
        console.log('Submitted Data:', formData);
        const updatedScoring = uniqueAssignmentTypes.map((type) => ({
            AssignmentType: type,
            Score:
        formData.Scoring.find((scoring) => scoring.AssignmentType === type)
            ?.Score || 0,
        }));
    };

    console.log('errors', errors, control);

    const handleDialog = () => {
        setOpen(!open);
    };


    return (
        <Box sx={{ padding: 3, width: '100%' }}>
            {actionType === 'create' ? (
                <div className='flex items-center'>
                    <h1 className='my-8 w-full text-3xl font-bold text-[#0C4177]'>
            Add New Student
                    </h1>
                    <div className=' flex w-full justify-end '>
                        <Button onClick={handleDialog}>
              &#43;
                            <span className='hidden pl-3 sm:flex'>Import</span>
                        </Button>
                    </div>
                </div>
            ) : (
                <h1 className='my-8 text-3xl font-bold text-[#0C4177]'>
          Update Student
                </h1>
            )}

            <div className='min-h-screen w-full rounded-3xl bg-white p-5 text-[#0c427770] shadow-md'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='text-[#353535]'
                >
                    <div>
                        <h1 className='my-8 text-xl text-[#0C4177]'>
                            {dataSiswa.StudentName}
                        </h1>
                    </div>
                    
                    {Object.entries(groupedScoring).map(
                        ([subjectName, assignments]) => (
                            <div
                                key={subjectName}
                                className='mb-6'
                            >
                                <h2 className='mb-4 text-lg font-semibold'>
                                    {subjectName}
                                </h2>
                                <div className='grid grid-cols-2 gap-x-16 gap-y-6'>
                                    {assignments.map((assignment, index) => (
                                        <div
                                            key={index}
                                            className='flex flex-col gap-2'
                                        >
                                            <label
                                                htmlFor={`Scoring.${dataSiswa.Scoring.findIndex(
                                                    (s) =>
                                                        s.AssignmentID === assignment.AssignmentID &&
                                                                s.SubjectName === subjectName
                                                )}.Score`}
                                            >
                                                {assignment.AssignmentType}
                                            </label>
                                            <Controller
                                                name={`Scoring.${dataSiswa.Scoring.findIndex(
                                                    (s) =>
                                                        s.AssignmentID === assignment.AssignmentID &&
                                                                s.SubjectName === subjectName
                                                )}.Score`}
                                                control={control}
                                                defaultValue={assignment.Score ?? 0} 
                                                render={({ field }) => 
                                                    (
                                                        <input
                                                            {...field}
                                                            id={`Scoring.${dataSiswa.Scoring.findIndex(
                                                                (s) =>
                                                                    s.AssignmentID === assignment.AssignmentID
                                                            )}.Score`}
                                                            className='rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75'
                                                            type={'number'}
                                                            onChange={(e) => {
                                                                field.onChange(parseFloat(e.target.value)); // Parse string to number
                                                            }}
                                                        />
                                                    )
                                                }
                                            />
                                            {errors && (
                                                <p className='text-xs italic text-red-500'>
                                                    {errors.Scoring?.[index]?.Score?.message}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}{' '}
                    
                    

                    <div className='mb-4 mt-10 flex justify-end'>
                        <Button
                            onSubmit={handleSubmit(onSubmit)}
                            type='submit'
                            size={'submit'}
                        >
              Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Box>
    );
};

export default ScoringEditForm;
