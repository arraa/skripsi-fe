import { getStudentById } from '@/app/api/student';
import StudentForm from '@/components/studentData/StudentForm';
import { Box } from '@mui/material';

export default async function personalData({
  params,
}: {
  params: { index: string };
}) {

  return (
    <>
      <Box sx={{ padding: 3,  width: '100%' }}>
        <h1 className="my-8 text-3xl font-bold text-[#0C4177]">
          Update Student
        </h1>
        <div className="min-h-screen w-full rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
          <StudentForm typePage={'update'} id={params.index} />
        </div>
      </Box>
    </>
  );
}
