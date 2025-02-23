// src/pages/ParentDashboard.js
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ParentDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const q = query(collection(db, "students"), where("parentId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const studentList = [];
      querySnapshot.forEach((doc) => {
        studentList.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentList);
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Parent Dashboard</h2>
      {students.length === 0 ? (
        <p>No student data available.</p>
      ) : (
        students.map((student) => (
          <div key={student.id} className="mb-4 p-4 border rounded shadow">
            <h3 className="font-bold">{student.name}</h3>
            <p>Class: {student.class}</p>
            <div>
              <h4 className="font-semibold">Activities:</h4>
              {student.activities ? (
                <ul className="list-disc ml-5">
                  {student.activities.map((act, index) => (
                    <li key={index}>
                      {act.type}: {act.title} on {act.date}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No activities recorded.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ParentDashboard;
