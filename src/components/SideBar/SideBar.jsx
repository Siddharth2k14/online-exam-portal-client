//Regular Imports
import { useEffect, useState } from 'react';

//Material UI Imports
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

//Theme Context
import { useTheme } from '../Theme Context/ThemeContext'

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//CSS
import './SideBar.css';
import HideSideBat from '../Hide Side Bar/HideSideBat';

const MOBILE_WIDTH = 900;

//Component
const SideBar = ({ onSectionSelect }) => {
    const [examOpen, setExamOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [showThemeToggle, setShowThemeToggle] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { themeMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_WIDTH);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleExamToggle = () => {
        setExamOpen((prev) => !prev);
    };

    const handleSettingsToggle = () => {
        setSettingsOpen((prev) => !prev);
    };

    const handleThemeModeClick = () => {
        setShowThemeToggle(true);
    };

    const handleClickItem = (path) => {
        navigate(`${location.pathname}#${path}`);
    }

    // Determine which dashboard based on current route
    const location = useLocation();
    const isAdminDashboard = location.pathname.includes('/admin/dashboard');
    const isStudentDashboard = location.pathname.includes('/student/dashboard');

    return (
        <>
            {isMobile ? (
                <HideSideBat isAdminDash={isAdminDashboard} isStudentDash={isStudentDashboard} location={location} onSectionSelect={onSectionSelect} />
            ) : (
                <div
                    className="dashboard-sidebar"
                    style={{
                        width: '260px',
                        height: '25vh',
                        maxHeight: '100vh',
                        color: 'white',
                    }}
                >
                    <div className="sidebar-container">
                        <div style={{ width: 250 }}>
                            <Card className="exam-creation" variant="outlined" sx={{
                                mb: 2,
                                p: 2
                            }}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    onClick={handleExamToggle}
                                    style={{ cursor: 'pointer' }}
                                    className="exam-management"
                                    sx={{
                                        textAlign: 'center',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Exam Management
                                </Typography>

                                {isAdminDashboard ? (
                                    <Collapse
                                        in={examOpen}
                                        timeout="auto"
                                        unmountOnExit
                                        className="exam-list"
                                    >
                                        <List>
                                            <ListItem onClick={() => {
                                                onSectionSelect('Exam Creation');
                                                handleClickItem('/exam-creation');
                                            }}>
                                                <ListItemText primary="Exam Creation" />
                                            </ListItem>
                                            <ListItem onClick={() => {
                                                onSectionSelect('Manage Exams');
                                                handleClickItem('/manage-exams');
                                            }}>
                                                <ListItemText primary="Manage Exams" />
                                            </ListItem>
                                            <ListItem onClick={() => {
                                                onSectionSelect('Student List');
                                                handleClickItem('/student-list');
                                            }}>
                                                <ListItemText primary="Student List" />
                                            </ListItem>
                                            <ListItem onClick={() => {
                                                onSectionSelect('Assign Exam');
                                                handleClickItem('/assign-exam');
                                            }}>
                                                <ListItemText primary="Assign Exam" />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                ) : isStudentDashboard ? (
                                    <Collapse
                                        in={examOpen}
                                        timeout="auto"
                                        unmountOnExit
                                        className="exam-list"
                                    >
                                        <List className="exam-list-items">
                                            <ListItem onClick={() => {
                                                onSectionSelect('Exams');
                                                handleClickItem('/exams');
                                            }}>
                                                <ListItemText primary="Exams" />
                                            </ListItem>
                                            <ListItem onClick={() => {
                                                onSectionSelect('View Exam');
                                                handleClickItem('/viewExam');
                                            }}>
                                                <ListItemText primary="View Exam" />
                                            </ListItem>
                                            <ListItem onClick={() => {
                                                onSectionSelect('Result');
                                                handleClickItem('/result');
                                            }}>
                                                <ListItemText primary="Result" />
                                            </ListItem>
                                            <ListItem onClick={() => {
                                                onSectionSelect('Admin List');
                                                handleClickItem('/admin-list');
                                            }}>
                                                <ListItemText primary="Admin List" />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                ) : (
                                    <Typography>
                                        Error
                                    </Typography>
                                )}
                            </Card>

                            <Card className="settings" variant="outlined" sx={{
                                p: 2
                            }}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    onClick={handleSettingsToggle}
                                    style={{ cursor: 'pointer' }}
                                    className="setting"
                                >
                                    Settings
                                </Typography>
                                <Collapse
                                    in={settingsOpen}
                                    timeout="auto"
                                    unmountOnExit
                                    className="setting-list"
                                >
                                    <List className="setting-list-items">
                                        <ListItem button onClick={() => {
                                            onSectionSelect('Account Info');
                                            handleClickItem('/account-info');
                                        }}>
                                            <ListItemText primary="Account Info" />
                                        </ListItem>
                                        <ListItem button onClick={() => onSectionSelect('Change Password')}>
                                            <ListItemText primary="Change Password" />
                                        </ListItem>
                                        <ListItem button onClick={handleThemeModeClick}>
                                            <ListItemText primary="Theme Mode" />
                                        </ListItem>
                                        {showThemeToggle && (
                                            <ListItem>
                                                <ListItemText primary={themeMode === 'light' ? 'Light Mode' : 'Dark Mode'} />
                                                <Switch
                                                    checked={themeMode === 'dark'}
                                                    onChange={toggleTheme}
                                                    color="primary"
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                </Collapse>
                            </Card>
                            <List sx={{
                                position: 'absolute',
                                top: '33rem',
                                left: '2rem',
                            }}>
                                <ListItem button onClick={() => onSectionSelect('Back To Dashboard')}>
                                    {/* <ListItemText primary="Back To Dashboard" /> */}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#1976d2', // Primary blue background
                                            color: 'white',
                                        }}
                                    >
                                        Back To Dashboard
                                    </Button>
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </div >
            )}
        </>
    );
};

export default SideBar;
