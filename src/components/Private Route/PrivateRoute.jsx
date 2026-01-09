// Regular Imports
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ roles }) => {
  const { token, role } = useSelector((state) => state.auth);

  // Backup from localStorage in case Redux state is cleared on refresh
  const localToken = localStorage.getItem('token');
  const localRole = localStorage.getItem('role');

  const userToken = token || localToken;
  const userRole = role || localRole;

  // 1️⃣ Authentication check
  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Role existence check
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Role authorization check
  if (!roles) {
    return <Navigate to="/" replace />;
  }

  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  const normalizedAllowedRoles = allowedRoles.map(r =>
    typeof r === 'string' ? r.toLowerCase().trim() : r
  );

  const normalizedUserRole =
    typeof userRole === 'string' ? userRole.toLowerCase().trim() : userRole;

  if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Render nested routes
  return <Outlet />;
};

export default PrivateRoute;