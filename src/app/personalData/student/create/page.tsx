"use client";

import StudentForm from "@/components/studentData/StudentForm";
import { Box } from "@mui/material";


export default function personalData() {
  return (
    <>
      <Box sx={{ padding: 3, width: "100%" }}>
        <h1 className="text-3xl font-bold my-8 text-[#0C4177]">
          Add New Student
        </h1>
        <div className="w-full min-h-screen bg-white p-5 rounded-3xl shadow-md text-[#0c427770]">
          <StudentForm typePage={"create"} id={null}/>
        </div>
      </Box>
    </>
  );
}
