import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { scholarships } from "../data/scholarships";
import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

export default function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addApplication } = useContext(ApplicationContext);

  const scholarship = scholarships.find(
    (s) => s.id === parseInt(id)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    addApplication({
      scholarshipId: scholarship.id,
      scholarshipTitle: scholarship.title,
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      course: formData.get("course"),
      university: formData.get("university"),
      gpa: formData.get("gpa"),
      statement: formData.get("statement"),
      status: "Pending",
      appliedAt: new Date().toLocaleDateString(),
    });

    navigate("/student");
  };

  if (!scholarship) {
    return <div>Scholarship not found.</div>;
  }

  return (
    <>
      <Navbar />

      <div className="apply-wrapper">
        <div className="apply-container">
          <h2>Apply for {scholarship.title}</h2>
          <p>{scholarship.description}</p>

          <form onSubmit={handleSubmit} className="apply-form">
            <input name="fullName" type="text" placeholder="Full Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="phone" type="text" placeholder="Phone Number" required />
            <input name="course" type="text" placeholder="Course / Program" required />
            <input name="university" type="text" placeholder="University / College" required />
            <input name="gpa" type="text" placeholder="GPA / Percentage" required />

            <textarea
              name="statement"
              placeholder="Statement of Purpose (Minimum 100 words)"
              rows="5"
              required
            ></textarea>

            <button type="submit" className="btn-primary full">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </>
  );
}