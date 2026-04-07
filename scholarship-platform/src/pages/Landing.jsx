import "../styles/main.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <section className="hero fade-up">
        <div className="hero-content">
          <h1 className="fade-in">
            Unlock Your Future with Scholarships
          </h1>
          <p className="fade-in delay">
            Discover, apply, and track scholarship opportunities with ease.
            Built for students. Designed for success.
          </p>

          <div className="hero-buttons fade-in delay2">
            <Link to="/login" className="btn">
              Get Started
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src="/education.svg" alt="Education Illustration" />
        </div>
      </section>

      <div className="wave-divider"></div>

      <section className="features">
        <div className="feature-card">
            <div className="icon">🎯</div>
          <h3>Smart Matching</h3>
          <p>Find scholarships that match your profile instantly.</p>
        </div>

        <div className="feature-card">
            <div className="icon">📊</div>
          <h3>Application Tracking</h3>
          <p>Monitor status in real-time from your dashboard.</p>
        </div>

        <div className="feature-card">
             <div className="icon">🛡️</div>
          <h3>Admin Review System</h3>
          <p>Efficient approval and rejection workflow.</p>
        </div>
      </section>
      <footer className="footer">
  <p>© 2026 Scholarship Management Platform</p>
  <p>Built for Academic Review</p>
</footer>
    </>
  );
}

export default Landing;