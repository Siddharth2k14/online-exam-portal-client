import { useState, useEffect } from 'react';
import './SideNavBar.css'
import { Link, useNavigate } from 'react-router-dom';
import './SideNavBar.css';
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';


const SideNavBar = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setSidebarOpen(false)
    }, [props.location.pathname])

    const handleToggleSidebar = () => setSidebarOpen(prev => !prev);
    const handleCloseSidebar = () => setSidebarOpen(false);

    const isOnDashboard = props.isAdminDash || props.isStudentDash;

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');

            if (props.isStudentDash) {
                navigate('/login/student');
            } else if (props.isAdminDash) {
                navigate('/login/admin');
            } else {
                navigate('/login/student');
            }

            handleCloseSidebar();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [sidebarOpen]);

    return (
        <>
            <Box className="sidebar-topbar">
                <Box className="sidebar-brand">
                    <Link to="/" onClick={handleCloseSidebar}>
                        ExamMaster
                    </Link>
                </Box>

                <Box className="hamburger-menu" onClick={handleToggleSidebar}>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                </Box>
            </Box>

            <Box
                className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
                onClick={handleCloseSidebar}
            ></Box>

            <Box className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <Box className="sidebar-close" onClick={handleCloseSidebar}>
                    <span className="close-bar"></span>
                    <span className="close-bar"></span>
                </Box>

                <List className="sidebar-menu">
                    <ListItem>
                        <Link to="/home" onClick={handleCloseSidebar}>
                          <ListItemText primary="Home" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/about" onClick={handleCloseSidebar}>
                            <ListItemText primary="About" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/contact" onClick={handleCloseSidebar}>
                            <ListItemText primary="Contact" />
                        </Link>
                    </ListItem>
                </List>

                <Box className="sidebar-auth">
                    {isOnDashboard ? (
                        <Button
                            className={`logout-btn ${isLoggingOut ? 'loading' : ''}`}
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? "Logging out..." : "Log Out"}
                        </Button>
                    ) : (
                        <>
                            <Link to="/login" className="btn" onClick={handleCloseSidebar}>Log In</Link>
                            <Link to="/signup" className="btn" onClick={handleCloseSidebar}>Sign Up</Link>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default SideNavBar;
