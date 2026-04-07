// src/pages/Dashboard/StudentsTableSection.jsx
import React from "react";
import StudentsTable from "../common/TeacherStudentsTable.jsx";

export default function StudentsTableSection({
  students,
  totalStudents,
  onStudentClick,
}) {
  return (
    <div className="w-full h-full">
      <StudentsTable
        students={students}
        totalStudents={totalStudents}
        onStudentClick={onStudentClick}
      />
    </div>
  );
}
