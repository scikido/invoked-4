// src/pages/Auth.js
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Auth = ({ isSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignup) {
        // Sign up and assign role "parent"
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email,
          role: "parent",
          // Optionally add additional fields like phone for SMS notifications
          phone: "+1234567890"  // Replace with the parent's phone or capture during signup
        });
        navigate("/parent-dashboard");
      } else {
        // Login and redirect based on role
        await signInWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        const role = userSnap.data().role;
        if (role === "teacher") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/parent-dashboard");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h1>
      <input
        type="email"
        placeholder="Email"
        className="mb-2 p-2 border border-gray-300 rounded w-64"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 p-2 border border-gray-300 rounded w-64"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleAuth}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>
    </div>
  );
};

export default Auth;
