import { createContext, useState, useEffect } from "react";
import {
  getScholarships,
  addScholarship,
  updateScholarship,
  deleteScholarship,
} from "../services/ScholarshipService";

export const ScholarshipContext = createContext();

export const ScholarshipProvider = ({ children }) => {
  const [scholarships, setScholarships] = useState([]);

  // 🔁 FETCH DATA FROM BACKEND
  const fetchScholarships = async () => {
    try {
      const res = await getScholarships();
      setScholarships(res.data);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    }
  };

  // 🚀 LOAD ON START
  useEffect(() => {
    fetchScholarships();
  }, []);

  // ➕ ADD
  const addNewScholarship = async (data) => {
    try {
      await addScholarship(data);
      fetchScholarships(); // refresh
    } catch (error) {
      console.error("Error adding scholarship:", error);
    }
  };

  // ✏️ UPDATE
  const editScholarship = async (id, updatedData) => {
    try {
      await updateScholarship(id, updatedData);
      fetchScholarships();
    } catch (error) {
      console.error("Error updating scholarship:", error);
    }
  };

  // ❌ DELETE
  const removeScholarship = async (id) => {
    try {
      await deleteScholarship(id);
      fetchScholarships();
    } catch (error) {
      console.error("Error deleting scholarship:", error);
    }
  };

  return (
    <ScholarshipContext.Provider
      value={{
        scholarships,
        addNewScholarship,
        editScholarship,
        removeScholarship,
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
};