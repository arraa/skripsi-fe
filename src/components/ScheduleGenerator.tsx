"use client";
import { useState } from 'react';

type SubjectTeacher = {
  subject: string;
  teachers: string[];
};

const subjectsTeachers: SubjectTeacher[] = [
  { subject: "Matematika", teachers: ["Guru A", "Guru B"] },
  { subject: "Bahasa Inggris", teachers: ["Guru C", "Guru D", "Guru E"] },
  { subject: "Biologi", teachers: ["Guru F", "Guru G", "Guru H"] },
  { subject: "Fisika", teachers: ["Guru I", "Guru J", "Guru K"] },
  { subject: "Kimia", teachers: ["Guru L", "Guru M", "Guru N"] },
  { subject: "Sejarah", teachers: ["Guru O", "Guru P", "Guru Q", "Guru R"] }
];

const generateSchedule = (): Schedule => {
  const days: string[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const schedule: Schedule = {};

  days.forEach(day => {
    schedule[day] = [];
    for (let i = 0; i < 4; i++) { // Misalnya 4 pelajaran per hari
      const subjectTeacher = subjectsTeachers[Math.floor(Math.random() * subjectsTeachers.length)];
      const teacher = subjectTeacher.teachers[Math.floor(Math.random() * subjectTeacher.teachers.length)];
      schedule[day].push({ subject: subjectTeacher.subject, teacher });
    }
  });

  return schedule;
};

type Schedule = {
  [key: string]: { subject: string; teacher: string }[];
};

const ScheduleGenerator: React.FC = () => {
  const [schedule, setSchedule] = useState<Schedule>({});

  const handleClick = () => {
    const newSchedule = generateSchedule();
    setSchedule(newSchedule);
  };

  return (
    <div>
      <button onClick={handleClick}>Generate Jadwal</button>
      {Object.keys(schedule).length > 0 && (
        <div>
          {Object.keys(schedule).map(day => (
            <div key={day}>
              <h3>{day}</h3>
              <ul>
                {schedule[day].map((item, index) => (
                  <li key={index}>
                    {item.subject} - {item.teacher}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleGenerator;
