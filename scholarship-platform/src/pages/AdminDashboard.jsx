import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container admin-dashboard">
        
        {/* Header */}
        <h2>🛡 Administrative Control Panel</h2>
        <p className="admin-subtitle">
          Monitor, manage, and control scholarship operations efficiently.
        </p>

        {/* Stats Section */}
        <div className="dashboard-stats">
          <div className="stat-card admin-stat">
            <div className="stat-icon">📄</div>
            <h3>0</h3>
            <p>Total Applications</p>
          </div>

          <div className="stat-card admin-stat">
            <div className="stat-icon">⏳</div>
            <h3>0</h3>
            <p>Pending Review</p>
          </div>

          <div className="stat-card admin-stat">
            <div className="stat-icon">✅</div>
            <h3>0</h3>
            <p>Approved</p>
          </div>

          <div className="stat-card admin-stat">
            <div className="stat-icon">❌</div>
            <h3>0</h3>
            <p>Rejected</p>
          </div>
        </div>

        {/* Divider */}
        <div className="dashboard-divider"></div>

        {/* Control Section */}
        <div className="dashboard-actions">
          <div className="action-card admin-action">
            <h3>Review Applications</h3>
            <p>Approve or reject submitted scholarship requests.</p>
            <Link to="/admin/applications" className="btn-primary">
              Manage Applications
            </Link>
          </div>
          

          <div className="action-card admin-action">
            <h3>Scholarship Control</h3>
            <p>Add, edit, or remove scholarship listings.</p>
            <Link to="/admin/scholarships" className="btn-primary">
  Manage Scholarships
</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="dashboard-divider"></div>

        {/* System Overview Section */}
        <div className="dashboard-content">
          <h3>Recent Submissions</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Scholarship</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No records</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}