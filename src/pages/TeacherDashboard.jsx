// src/pages/TeacherDashboard.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const TeacherDashboard = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const addEvent = async () => {
    try {
      // For simplicity, we add a new event to a central collection.
      // In production, you would associate this with specific students.
      const newEvent = { type: "Assessment", title, date };
      await addDoc(collection(db, "events"), newEvent);

      // Call the Firebase Function endpoint to trigger notifications
      await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, date })
      });
      alert("Event posted and notifications sent!");
    } catch (error) {
      console.error("Error posting event:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Teacher Dashboard</h2>
      <input
        type="text"
        placeholder="Assessment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded w-64"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-64"
      />
      <button
        onClick={addEvent}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Post Assessment/Event
      </button>
    </div>
  );
};

export default TeacherDashboard;
