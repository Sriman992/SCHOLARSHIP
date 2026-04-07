import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Scholarships from "./pages/Scholarships";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";
import AdminApplications from "./pages/AdminApplications";
import ScholarshipManagement from "./pages/ScholarshipManagement";
import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/applications" element={<Applications />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route
          path="/admin/scholarships"
          element={<ScholarshipManagement />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;