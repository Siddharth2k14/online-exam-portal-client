//Regular Imports
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

//Component
const PrivateRoute = ({ allowedRoles }) => {
  const { token, role } = useSelector((state) => state.auth);

  // Backup from localStorage in case Redux state is cleared on refresh
  const localToken = localStorage.getItem('token');
  const localRole = localStorage.getItem('role');

  const userToken = token || localToken;
  const userRole = role || localRole;

  // Check if user is authenticated
  if (!userToken) {
    return <Navigate to="/login/student" replace />;
  }

  // Check if user role is authorized
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // Ensure allowedRoles is an array and normalize roles for comparison
  if (!allowedRoles) {
    return <Navigate to="/" replace />;
  }
  
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const normalizedAllowedRoles = rolesArray.map(role => 
    typeof role === 'string' ? role.toLowerCase().trim() : role
  );
  const normalizedUserRole = typeof userRole === 'string' ? userRole.toLowerCase().trim() : userRole;

  if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;