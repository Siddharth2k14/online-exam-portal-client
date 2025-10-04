//Regular Imports
import { useState, useEffect } from 'react';

//Material UI Imports
import { Link, useLocation, useNavigate } from 'react-router-dom';

//CSS
import './NavBar.css';
import SideNavBar from '../SideNavBar/SideNavBar';

//Component
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Fixed: Better naming and purpose
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isAdminDash = location.pathname === '/admin/dashboard';
  const isStudentDash = location.pathname === '/student/dashboard';
  const isOnDashboard = isAdminDash || isStudentDash;

  const handleCloseMenu = () => setMenuOpen(false);

  // Fixed: Proper async logout handling
  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Clear storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');

      // Navigate based on current dashboard
      if (isStudentDash) {
        navigate('/login/student');
      } else if (isAdminDash) {
        navigate('/login/admin');
      } else {
        navigate('/login/student'); // default to student login
      }

      handleCloseMenu();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      {isMobile ? (
        <SideNavBar isAdminDash = {isAdminDash} isStudentDash = {isStudentDash} location = {location} />
      ) : (

        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" onClick={handleCloseMenu}>ExamMaster</Link>
          </div>

          {/* {!isOnDashboard && ( */}
          {/* <div className="navbar-toggle" onClick={handleToggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div> */}
          {/* // )} */}

          <ul className="navbar-menu">
            <li>
                <Link to="/home" onClick={handleCloseMenu}>Home</Link>
            </li>
            <li><Link to="/about" onClick={handleCloseMenu}>About</Link></li>
            <li><Link to="/contact" onClick={handleCloseMenu}>Contact</Link></li>
          </ul>

          <div className="navbar-auth">
            {isOnDashboard ? (
              <button
                className={`logout-btn ${isLoggingOut ? 'loading' : ''}`}
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Log Out'}
              </button>
            ) : (
              <>
                <Link to="/login" className="btn">Log In</Link>
                <Link to="/signup" className="btn">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
