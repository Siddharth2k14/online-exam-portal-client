import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import './NavBar.css'

const NavBar = ({ toggle, setToggle, name }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isAdminDash = location.pathname === '/admin/dashboard';
  const isStudent = location.pathname === '/student/login' || location.pathname === '/student/signup';
  const isStudentDash = location.pathname === '/student/dashboard';

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">ExamMaster</Link>
        </div>
        <ul
          className="navbar-menu"
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '24px',
            margin: '0',
            padding: '0 25px',
            flex: '1',
            alignItems: 'center',
          }}
        >
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {(isAdminDash || isStudentDash) ? (
          <div
            className="navbar-auth"
          >
            <Link to={isStudentDash ? "/student/login" : "/admin/login"} className="logout-btn">Log Out</Link>
          </div>
        ) : (name === "admin" ? (
          <div
            className="navbar-auth"
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <Link
              to="/admin/login"
              className="btn"
              style={{
                backgroundColor: 'white',
                color: '#1976d2',
                padding: '6px 18px',
                borderRadius: '20px',
                fontWeight: '500',
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >Login</Link>
          </div>
        ) : (
          <div
            className="navbar-auth"
          >
            <Link to="/student/login" className="btn"
              style={{
                backgroundColor: 'white',
                color: '#1976d2',
                padding: '6px 18px',
                borderRadius: '20px',
                fontWeight: '500',
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >Login</Link>
            <Link to="/signup" className="btn"
              style={{
                backgroundColor: 'white',
                color: '#1976d2',
                padding: '6px 18px',
                borderRadius: '20px',
                fontWeight: '500',
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >Sign Up</Link>
          </div>
        ))}

        <div className="navbar-toggle" onClick={handleToggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
      <div className={`navbar-overlay${menuOpen ? ' open' : ''}`} onClick={handleClose}></div>
      <div className={`navbar-collapse${menuOpen ? ' open' : ''}`}>
        <ul className="navbar-menu">
          <li><Link to="/home" onClick={handleClose}>Home</Link></li>
          <li><Link to="/about" onClick={handleClose}>About</Link></li>
          <li><Link to="/contact" onClick={handleClose}>Contact</Link></li>
        </ul>
        <div className="navbar-auth">
          <Link to="/student/login" className="btn"
            style={{
              backgroundColor: 'white',
              color: '#1976d2',
              padding: '6px 18px',
              borderRadius: '20px',
              fontWeight: '500',
              fontSize: '1rem',
              textDecoration: 'none',
            }}
            onClick={handleClose}>Login</Link>
          <Link to="/signup" className="btn"
            style={{
              backgroundColor: 'white',
              color: '#1976d2',
              padding: '6px 18px',
              borderRadius: '20px',
              fontWeight: '500',
              fontSize: '1rem',
              textDecoration: 'none',
            }}
            onClick={handleClose}>Sign Up</Link>
        </div>
        <div className="navbar-close" onClick={handleClose}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  )
}

export default NavBar
