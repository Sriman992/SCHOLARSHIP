import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

export default function AdminApplications() {
  const { applications, updateStatus } = useContext(ApplicationContext);

  return (
    <>
      <Navbar />

      <div className="dashboard-container admin-dashboard">
        <h2>🛡 Review Applications</h2>

        {applications.length === 0 ? (
          <p className="empty-state">No applications submitted yet.</p>
        ) : (
          <div className="admin-application-list">
            {applications.map((app) => (
              <div key={app.id} className="admin-application-card">
                <h3>{app.scholarshipTitle}</h3>

                <div className="application-details">
                  <p><strong>Name:</strong> {app.fullName}</p>
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>Phone:</strong> {app.phone}</p>
                  <p><strong>Course:</strong> {app.course}</p>
                  <p><strong>University:</strong> {app.university}</p>
                  <p><strong>GPA:</strong> {app.gpa}</p>
                  <p><strong>Applied On:</strong> {app.appliedAt}</p>

                  <div className="statement-section">
                    <strong>Statement of Purpose:</strong>
                    <p className="statement-box">{app.statement}</p>
                  </div>
                </div>

                <p>
                  Status:
                  <span className={`status ${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </p>

                {app.status === "Pending" && (
                  <div className="admin-action-buttons">
                    <button
                      className="btn-primary"
                      onClick={() => updateStatus(app.id, "Approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="btn-danger"
                      onClick={() => updateStatus(app.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}