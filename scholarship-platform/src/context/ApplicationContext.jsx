import { createContext, useState, useEffect } from "react";
import {
  applyScholarship,
  getApplications,
  updateApplicationStatus,
} from "../services/applicationService";

export const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([]);

  // FETCH FROM BACKEND
  const fetchApplications = async () => {
    try {
      const res = await getApplications();

      // 🔥 Map backend → frontend structure
 const mapped = res.data.map((app) => ({
  id: app.id,
  scholarshipId: app.scholarshipId,
  scholarshipTitle: `Scholarship #${app.scholarshipId}`,
  fullName: app.studentName,
  email: app.email,
  phone: app.phone,
  course: app.course,
  university: app.university,
  gpa: app.gpa,
  statement: app.statement,
  status: app.status,
  appliedAt: app.appliedAt,
}));

      setApplications(mapped);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // APPLY (replace addApplication)
  const addApplication = async (application) => {
    try {
      await applyScholarship({
  studentName: application.fullName,
  scholarshipId: application.scholarshipId,
  email: application.email,
  phone: application.phone,
  course: application.course,
  university: application.university,
  gpa: application.gpa,
  statement: application.statement,
  appliedAt: application.appliedAt,
});
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ApplicationContext.Provider
      value={{ applications, addApplication, updateStatus }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}