import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";  // ✅ Import useState
import { FaPen, FaClipboardList } from "react-icons/fa";
import TodoList from "./components/TodoList";
import AssigneeDetailsList from "./components/AssigneeDetailsList";
import TodoDetails from "./components/TodoDetails"; // Import TodoDetails component
import Navbar from "./components/Navbar";
import "./CSS/App.css";
import CommentTypes from "./comment";

function App() {
  const [comments, setComments] = useState<CommentTypes[]>([]); // ✅ No more errors

  return (
    <Router basename="/simple-project">
      <Navbar />
      <div className="App">
        <div className="header">
          <div className="logoside">
            <FaPen />
            <h1>What To Do</h1>
            <FaClipboardList />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/assignee" element={<AssigneeDetailsList />} />
          <Route path="/todo/:id" element={<TodoDetails setComments={setComments} />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
