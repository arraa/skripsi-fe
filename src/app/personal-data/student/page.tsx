import { getStudent } from '@/app/api/student';
import StudentData from '@/components/studentData/StudentData';
import { createStudentProps } from '@/components/studentData/types/types';
import { useEffect, useState } from 'react';

export default async function PersonalData() {
  const response = await getStudent();


  return (
    <>
      <StudentData data={response} />
    </>
  );
}
