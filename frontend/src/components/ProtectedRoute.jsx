import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user?.role_id)) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;