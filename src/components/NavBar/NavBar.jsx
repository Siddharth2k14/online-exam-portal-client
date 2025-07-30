import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null); // 'admin' or 'student'
  const [logout, setLogout] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get role from localStorage if logged in
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);
  }, [location.pathname]);

  const isAdminDash = location.pathname === '/admin/dashboard';
  const isStudentDash = location.pathname === '/student/dashboard';
  const isOnDashboard = isAdminDash || isStudentDash;

  const handleToggleMenu = () => setMenuOpen(prev => !prev);
  const handleCloseMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    setLogout(true);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    if (isStudentDash) navigate('/login/student');
    else if (isAdminDash) navigate('/login/admin');
    else navigate('/login/student'); // default to student login
    setLogout(false);
    handleCloseMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={handleCloseMenu}>ExamMaster</Link>
      </div>

      <div className="navbar-toggle" onClick={handleToggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className="navbar-menu">
        <li><Link to="/home" onClick={handleCloseMenu}>Home</Link></li>
        <li><Link to="/about" onClick={handleCloseMenu}>About</Link></li>
        <li><Link to="/contact" onClick={handleCloseMenu}>Contact</Link></li>
      </ul>

      <div className="navbar-auth">
        {isOnDashboard ? (
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        ) : (
          <>
            <Link to="/login" className="btn">Log In</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </>
        )}
      </div>

      <div className={`navbar-overlay${menuOpen ? ' open' : ''}`} onClick={handleCloseMenu}></div>

      <div className={`navbar-collapse${menuOpen ? ' open' : ''}`}>
        <ul className="navbar-menu-mobile">
          <li><Link to="/home" onClick={handleCloseMenu}>Home</Link></li>
          <li><Link to="/about" onClick={handleCloseMenu}>About</Link></li>
          <li><Link to="/contact" onClick={handleCloseMenu}>Contact</Link></li>
          {isOnDashboard ? (
            <li>
              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </li>
          ) : (
            <>
              <li><Link to="/login" className="btn" onClick={handleCloseMenu}>Log In</Link></li>
              <li><Link to="/signup" className="btn" onClick={handleCloseMenu}>Sign Up</Link></li>
            </>
          )}
        </ul>
        <div className="navbar-close" onClick={handleCloseMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
