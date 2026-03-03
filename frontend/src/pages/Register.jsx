import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Auth.css'

function Register({ onRegister }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Club'
  })
  const [error, setError] = useState('')

  const roles = ['Club', 'Faculty', 'Principal', 'Admin']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.name || !formData.email || !formData.password) {
    setError("All fields are required");
    return;
  }

  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  // Convert role string to role_id number
  const roleMap = {
    Club: 1,
    Faculty: 2,
    Principal: 3,
    Admin: 4,
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role_id: roleMap[formData.role],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Registration failed");
      return;
    }

    alert("Registration successful! Please login.");
    navigate("/login");

  } catch (err) {
    setError("Server error. Make sure backend is running.");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Event Permission System</h1>
        <p className="auth-subtitle">Create a new account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'Faculty' ? 'Faculty In-charge' : role}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <p className="auth-link">
          Already registered? <Link to="/login">Go to Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register