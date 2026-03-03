import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/api/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Invalid token");
          }
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard/club"
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <h1>Club Dashboard</h1>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/faculty"
        element={
          <ProtectedRoute allowedRoles={[2]}>
            <h1>Faculty Dashboard</h1>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/principal"
        element={
          <ProtectedRoute allowedRoles={[3]}>
            <h1>Principal Dashboard</h1>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={[4]}>
            <h1>Admin Dashboard</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;