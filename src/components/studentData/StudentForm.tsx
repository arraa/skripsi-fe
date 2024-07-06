import { useState } from "react";
import { createStudentProps, studentFormPageProps } from "./types/types";
import { Button } from "../common/button/button";
import { createStudent } from "@/app/api/student";

const StudentForm = (props: studentFormPageProps) => {
  const [form, setForm] = useState<createStudentProps>({
    NISN: "",
    fullName: "",
    gender: "",
    class: "",
    POB: "",
    DOB: "",
    religion: "",
    email: "",
    acceptedDate: "",
    schoolOrigin: "",
    fatherName: "",
    fatherJob: "",
    fatherPhoneNumber: "",
    motherName: "",
    motherJob: "",
    motherPhoneNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (
    data: createStudentProps,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(data);
    try {
      if (!data.fullName && props.typePage === "create") {
        alert("Full Name is required");
        throw new Error("Full Name is required");
      } else if (!data.NISN) {
        alert("NISN is required");
        throw new Error("NISN is required");
      } else if (!data.gender) {
        alert("Gender is required");
        throw new Error("Gender is required");
      } else if (!data.POB) {
        alert("Place of birth is required");
        throw new Error("Place of birth is required");
      } else if (!data.DOB) {
        alert("Date of birth is required");
        throw new Error("Date of birth is required");
      } else if (!data.religion) {
        alert("Religion is required");
        throw new Error("Religion is required");
      } else if (!data.email) {
        alert("Email is required");
        throw new Error("Email is required");
      } else if (!data.class) {
        alert("Class is required");
        throw new Error("Class is required");
      } else if (!data.acceptedDate) {
        alert("Accepted Date is required");
        throw new Error("Accepted Date is required");
      } else if (!data.schoolOrigin) {
        alert("School Origin is required");
        throw new Error("School Origin is required");
      } else if (!data.fatherName) {
        alert("Father Name is required");
        throw new Error("Father Name is required");
      } else if (!data.fatherJob) {
        alert("Father Job is required");
        throw new Error("Father Job is required");
      } else if (!data.fatherPhoneNumber) {
        alert("Father Phone Number is required");
        throw new Error("Father Phone Number is required");
      } else if (!data.motherName) {
        alert("Mother Name is required");
        throw new Error("Mother Name is required");
      } else if (!data.motherJob) {
        alert("Mother Job is required");
        throw new Error("Mother Job is required");
      } else if (!data.motherPhoneNumber) {
        alert("Mother Phone Number is required");
        throw new Error("Mother Phone Number is required");
      }

      await createStudent(data);
    } catch (error) {
      console.error("API request error", error);
    } finally {
      if (!Error) {
        if (props.typePage === "update") {
          alert("Student updated successfully");
        } else alert("Student created successfully");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    }
  };
  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          handleSubmit(form, e);
        }}
        className="text-[#353535]"
      >
        <h1 className="text-xl my-8 text-[#0C4177]">Student’s Personal Data</h1>

        <div className="grid grid-cols-2 gap-x-16 gap-y-6 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="NISN">NISN</label>
            <input
              id="NISN"
              name="NISN"
              value={form.NISN}
              placeholder="Please input student’s NISN."
              className="rounded-md p-4 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              placeholder="Please input student’s Full Name"
              className="rounded-md p-4 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="Gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={`rounded-md p-4 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75 ${
                form.gender === "" ? " text-[#353535]/50" : "text-[#353535]"
              }`}
            >
              <option value="">Please choose student’s gender.</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="POB">Place of Birth</label>
            <input
              id="POB"
              name="POB"
              value={form.POB}
              placeholder="Please input student’s Place of Birth "
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="DOB">Date Of Birth</label>
            <input
              type="text"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              id="DOB"
              name="DOB"
              value={form.DOB}
              placeholder="Please input student’s Date Of Birth"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="religion">Religion</label>
            <input
              id="religion"
              name="religion"
              value={form.religion}
              placeholder="Please input student’s Religion"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              placeholder="Please input student’s email"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="acceptedDate">Accepted Date</label>
            <input
              type="text"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              id="acceptedDate"
              name="acceptedDate"
              value={form.acceptedDate}
              placeholder="accepted Date"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="schoolOrigin">School Origin</label>
            <input
              id="schoolOrigin"
              name="schoolOrigin"
              value={form.schoolOrigin}
              placeholder="Please input student’s school Origin"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="class">Class</label>
            <input
              id="class"
              name="class"
              value={form.class}
              placeholder="Please input student’s Class"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>
        </div>
        <h1 className="text-xl my-8 text-[#0C4177]">Student Parents’ Data</h1>

        <div className="grid grid-cols-2 gap-x-16 gap-y-6 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherName">Father Name</label>
            <input
              id="fatherName"
              name="fatherName"
              value={form.fatherName}
              placeholder="Please input Father Name"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="motherName">Mother Name</label>
            <input
              id="motherName"
              name="motherName"
              value={form.motherName}
              placeholder="Please input Mother Name"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherJob">Father Job</label>
            <input
              id="fatherJob"
              name="fatherJob"
              value={form.fatherJob}
              placeholder="Please input Father Job"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="motherJob">Mother Job</label>
            <input
              id="motherJob"
              name="motherJob"
              value={form.motherJob}
              placeholder="Please input Mother Job"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fatherPhoneNumber">Father Phone Number</label>
            <input
              id="fatherPhoneNumber"
              name="fatherPhoneNumber"
              value={form.fatherPhoneNumber}
              placeholder="Please input Father Phone Number"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="motherPhoneNumber">Mother Phone Number</label>
            <input
              id="motherPhoneNumber"
              name="motherPhoneNumber"
              value={form.motherPhoneNumber}
              placeholder="Please input Mother Phone Number"
              className="rounded-md p-2 bg-[#3F79B4]/10 focus:outline-[#2D2D2D]/75"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end mt-10 mb-4">
          <Button type="submit" size={"submit"}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
