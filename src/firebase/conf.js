import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA46pNKanFEYgVCqq8kulojteQ6FyMGhd8",
  authDomain: "react-todo-c112d.firebaseapp.com",
  projectId: "react-todo-c112d",
  storageBucket: "react-todo-c112d.appspot.com",
  messagingSenderId: "541516053337",
  appId: "1:541516053337:web:986342879b29946a61aa48",
  measurementId: "G-NG4LRW6419"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth(app)
