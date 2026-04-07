import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService"; // ✅ ADD

export default function Signup() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  // ✅ ADD STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        email: email,
        password: password,
        role: role.toUpperCase(), // STUDENT / ADMIN
      });

      alert("Account created successfully!");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="signup-wrapper">
        <div className="signup-box">
          <h3>Create Account</h3>

          <div className="role-toggle">
            <button
              type="button"
              className={role === "student" ? "active" : ""}
              onClick={() => setRole("student")}
            >
              🎓 Student
            </button>

            <button
              type="button"
              className={role === "admin" ? "active" : ""}
              onClick={() => setRole("admin")}
            >
              🛡️ Admin
            </button>
          </div>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn-primary full">
              Sign Up as {role}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

