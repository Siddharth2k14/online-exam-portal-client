import React, { useState } from 'react'; // Correct useState import
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './NavBar.css'

const NavBar = ({ name }) => { // Removed toggle and setToggle props, as internal state handles menu
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  const isAdminDash = location.pathname === '/admin/dashboard';
  const isStudentDash = location.pathname === '/student/dashboard';
  // Check if currently on any dashboard (authenticated state for NavBar's purpose)
  const isOnDashboard = isAdminDash || isStudentDash;

  const handleToggleMenu = () => { // Renamed for clarity
    setMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => { // Renamed for clarity
    setMenuOpen(false);
  };

  // Centralized logout logic
  const handleLogout = () => {
    // *** IMPORTANT: Implement your actual logout logic here ***
    // This typically involves:
    // 1. Clearing authentication tokens (e.g., from localStorage, sessionStorage, cookies)
    // 2. Dispatching a Redux logout action if you're using Redux for user state
    // 3. Resetting any other user-specific state
    console.log("Logging out...");
    localStorage.removeItem('authToken'); // Example: clear a token
    // If using Redux: dispatch(logoutUser());

    // Redirect to the appropriate login page based on current dashboard, then close menu
    if (isStudentDash) {
      navigate('/student/login');
    } else if (isAdminDash) {
      navigate('/admin/login');
    } else {
      // Fallback for general logout if not on a specific dashboard
      navigate('/'); // Or a generic /login page
    }
    handleCloseMenu();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" onClick={handleCloseMenu}>ExamMaster</Link> {/* Closes menu on brand click */}
        </div>

        {/* Hamburger menu icon for smaller screens */}
        <div className="navbar-toggle" onClick={handleToggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Main navigation menu for larger screens */}
        {/* These links remain visible on desktop based on your CSS */}
        <ul className="navbar-menu">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Authentication/Logout section for desktop */}
        <div className="navbar-auth">
          {isOnDashboard ? (
            // If on any dashboard, show logout button
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            // If not on a dashboard, show login/signup.
            // Simplified logic: If 'name' prop indicates 'admin', show admin login, otherwise student/signup.
            name === "admin" ? ( // Check 'name' prop from parent (e.g., AdminDashboard)
              <Link to="/admin/login" className="btn">Login</Link>
            ) : ( // Default to student login/signup
              <>
                <Link to="/student/login" className="btn">Login</Link>
                <Link to="/signup" className="btn">Sign Up</Link>
              </>
            )
          )}
        </div>
      </nav>

      {/* Mobile menu overlay (for dimming background) */}
      <div className={`navbar-overlay${menuOpen ? ' open' : ''}`} onClick={handleCloseMenu}></div>

      {/* Mobile menu content */}
      <div className={`navbar-collapse${menuOpen ? ' open' : ''}`}>
        <ul className="navbar-menu-mobile"> {/* Use a distinct class for mobile menu */}
          <li><Link to="/home" onClick={handleCloseMenu}>Home</Link></li>
          <li><Link to="/about" onClick={handleCloseMenu}>About</Link></li>
          <li><Link to="/contact" onClick={handleCloseMenu}>Contact</Link></li>
          {/* Mobile-specific authentication/logout links */}
          {isOnDashboard ? (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          ) : (
            name === "admin" ? (
              <li><Link to="/admin/login" className="btn" onClick={handleCloseMenu}>Login</Link></li>
            ) : (
              <>
                <li><Link to="/student/login" className="btn" onClick={handleCloseMenu}>Login</Link></li>
                <li><Link to="/signup" className="btn" onClick={handleCloseMenu}>Sign Up</Link></li>
              </>
            )
          )}
        </ul>
        {/* Close button for mobile menu */}
        <div className="navbar-close" onClick={handleCloseMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;