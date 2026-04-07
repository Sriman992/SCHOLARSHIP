import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

export default function Applications() {
  const { applications } = useContext(ApplicationContext);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>My Applications</h2>

        {applications.length === 0 ? (
          <p>No applications submitted yet.</p>
        ) : (
          <div className="dashboard-cards">
            {applications.map((app) => (
              <div key={app.id} className="card">
                <h3>{app.scholarshipTitle}</h3>
                <p>
  Status: 
  <span className={`status ${app.status.toLowerCase()}`}>
    {app.status}
  </span>
</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}