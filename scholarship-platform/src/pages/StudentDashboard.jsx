import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Student Dashboard</h2>

        {/* Stats Section */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
<h3>0</h3>
<p>Total Applications</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <h3>0</h3>
            <p>Approved</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <h3>0</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <h3>0</h3>
            <p>Rejected</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="dashboard-actions">
          <div className="action-card">
            <h3>Browse Scholarships</h3>
            <Link to="/scholarships" className="btn-primary">
              View Scholarships
            </Link>
          </div>

          <div className="action-card">
            <h3>Track Applications</h3>
            <Link to="/applications" className="btn-primary">
              View Applications
            </Link>
          </div>
        </div>

        {/* Applications Section */}
        <div className="dashboard-content">
          <h3>Recent Applications</h3>
          <div className="empty-state">
            No applications submitted yet.
          </div>
        </div>
      </div>
    </>
  );
}