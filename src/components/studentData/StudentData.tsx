
import { getStudent } from "@/app/api/student";
import Table from "@/components/common/Table";
import SearchBar from "@/components/common/searchBar";
import { columnData } from "@/components/studentData/column";
import { createStudentProps } from "@/components/studentData/types/types";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

// const data = [
//   {
//     id: 1,
//     fullName: "John Doe",
//     sex: "Male",
//     class: "10A",
//     POB: "New York, 2005-01-01",
//     email: "john.doe@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 1",
//     fatherName: "Michael Doe",
//     fatherJob: "Engineer",
//     fatherPhoneNumber: "123-456-7890",
//     motherName: "Jane Doe",
//     motherJob: "Teacher",
//     motherPhoneNumber: "098-765-4321",
//   },
//   {
//     id: 2,
//     fullName: "Jane Smith",
//     sex: "Female",
//     class: "10B",
//     POB: "Los Angeles, 2005-02-02",
//     email: "jane.smith@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 2",
//     fatherName: "Robert Smith",
//     fatherJob: "Doctor",
//     fatherPhoneNumber: "123-456-7891",
//     motherName: "Laura Smith",
//     motherJob: "Nurse",
//     motherPhoneNumber: "098-765-4322",
//   },
//   {
//     id: 3,
//     fullName: "Alice Johnson",
//     sex: "Female",
//     class: "10A",
//     POB: "Chicago, 2005-03-03",
//     email: "alice.johnson@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 3",
//     fatherName: "William Johnson",
//     fatherJob: "Lawyer",
//     fatherPhoneNumber: "123-456-7892",
//     motherName: "Emily Johnson",
//     motherJob: "Manager",
//     motherPhoneNumber: "098-765-4323",
//   },
//   {
//     id: 4,
//     fullName: "Bob Brown",
//     sex: "Male",
//     class: "10C",
//     POB: "Houston, 2005-04-04",
//     email: "bob.brown@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 4",
//     fatherName: "James Brown",
//     fatherJob: "Architect",
//     fatherPhoneNumber: "123-456-7893",
//     motherName: "Sarah Brown",
//     motherJob: "Accountant",
//     motherPhoneNumber: "098-765-4324",
//   },
//   {
//     id: 5,
//     fullName: "Charlie Davis",
//     sex: "Male",
//     class: "10B",
//     POB: "Phoenix, 2005-05-05",
//     email: "charlie.davis@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 5",
//     fatherName: "Thomas Davis",
//     fatherJob: "Pilot",
//     fatherPhoneNumber: "123-456-7894",
//     motherName: "Anna Davis",
//     motherJob: "Chef",
//     motherPhoneNumber: "098-765-4325",
//   },
//   {
//     id: 6,
//     fullName: "Dana Evans",
//     sex: "Female",
//     class: "10C",
//     POB: "Philadelphia, 2005-06-06",
//     email: "dana.evans@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 6",
//     fatherName: "David Evans",
//     fatherJob: "Journalist",
//     fatherPhoneNumber: "123-456-7895",
//     motherName: "Linda Evans",
//     motherJob: "Designer",
//     motherPhoneNumber: "098-765-4326",
//   },
//   {
//     id: 7,
//     fullName: "Eve Foster",
//     sex: "Female",
//     class: "10A",
//     POB: "San Antonio, 2005-07-07",
//     email: "eve.foster@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 7",
//     fatherName: "Richard Foster",
//     fatherJob: "Firefighter",
//     fatherPhoneNumber: "123-456-7896",
//     motherName: "Nancy Foster",
//     motherJob: "Photographer",
//     motherPhoneNumber: "098-765-4327",
//   },
//   {
//     id: 8,
//     fullName: "Frank Green",
//     sex: "Male",
//     class: "10B",
//     POB: "San Diego, 2005-08-08",
//     email: "frank.green@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 8",
//     fatherName: "George Green",
//     fatherJob: "Pharmacist",
//     fatherPhoneNumber: "123-456-7897",
//     motherName: "Karen Green",
//     motherJob: "Writer",
//     motherPhoneNumber: "098-765-4328",
//   },
//   {
//     id: 9,
//     fullName: "Grace Hall",
//     sex: "Female",
//     class: "10C",
//     POB: "Dallas, 2005-09-09",
//     email: "grace.hall@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 9",
//     fatherName: "Edward Hall",
//     fatherJob: "Scientist",
//     fatherPhoneNumber: "123-456-7898",
//     motherName: "Helen Hall",
//     motherJob: "Librarian",
//     motherPhoneNumber: "098-765-4329",
//   },
//   {
//     id: 10,
//     fullName: "Hank Iverson",
//     sex: "Male",
//     class: "10A",
//     POB: "San Jose, 2005-10-10",
//     email: "hank.iverson@example.com",
//     acceptedDate: "2020-09-01",
//     schoolOrigin: "High School 10",
//     fatherName: "Henry Iverson",
//     fatherJob: "Mechanic",
//     fatherPhoneNumber: "123-456-7899",
//     motherName: "Irene Iverson",
//     motherJob: "Doctor",
//     motherPhoneNumber: "098-765-4330",
//   },
// ];

const StudentData = () => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [ studentList, setStudentList ] = useState<createStudentProps[]>([]);
      const [loading, setLoading] = useState(false);
      const fetchData = async () => {
          setLoading(true);
          try {
              const result = await getStudent();
              setStudentList(result);
          } catch (error: any) {
              console.error('Error fetching and mapping student:', error);
          } finally {
              setLoading(false);
          }
      };
  
      useEffect(() => {
          fetchData();
      }, [])
      
    const filteredData = studentList.filter(
      (item) =>
        (selectedClass === "" || item.class === selectedClass) &&
        (searchValue === "" ||
          item.fullName.toLowerCase().includes(searchValue.toLowerCase()))
    );
  
  
    return (
      <>
        <Box sx={{ padding: 3 }}>
          <h1 className="text-3xl font-bold my-8 text-[#0C4177]">
            Personal Data
          </h1>
          <div className="w-full min-h-screen bg-white p-5 rounded-3xl shadow-md text-[#0c427770]">
            <div className="flex mb-2 justify-between items-center">
              <div className="flex gap-4">
                <SearchBar
                  setSearchValue={setSearchValue}
                  SearchName={"Student"}
                />
                <div >
                  <select
                    className="rounded-md  shadow-sm  focus:border-[#0C4177] focus:ring focus:ring-[#0C4177] focus:ring-opacity-50"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="" disabled>
                      All Classes
                    </option>
                    <option value="10A">10A</option>
                    <option value="10B">10B</option>
                    <option value="10C">10C</option>
                  </select>
                </div>
              </div>
  
              <Link
                href={"/personalData/student/create"}
                className="text-white flex bg-[#31426E] sm:rounded-md px-5 pb-2 pt-3"
              >
                &#43; <span className="hidden pl-3 sm:flex">Add Student</span>
              </Link>
            </div>
            <Table
              data={filteredData}
              columnData={columnData}
              searchValue={searchValue}
            />
          </div>
        </Box>
      </>
    );
  }  

export default StudentData
