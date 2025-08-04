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

  if (!userToken) {
    return <Navigate to="/login/student" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;