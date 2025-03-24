import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaPen, FaClipboardList } from "react-icons/fa";
import TodoList from "./components/TodoList";
import AssigneeDetailsList from "./components/AssigneeDetailsList";
import Navbar from "./components/Navbar";
import "./CSS/App.css";

function App() {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
