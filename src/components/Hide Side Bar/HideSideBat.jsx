import { Box, Button, Card, Collapse, List, ListItem, ListItemText, Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import "./HideSideBar.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../Theme Context/ThemeContext';

const HideSideBat = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [examOpen, setExamOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [showThemeToggle, setShowThemeToggle] = useState(false);
    const { themeMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        setSidebarOpen(false)
    }, [props.location.pathname])

    const handleToggleSideBar = () => setSidebarOpen(prev => !prev);
    const handleCloseSideBar = () => setSidebarOpen(false);

    const handleExamToggle = () => setExamOpen((prev) => !prev);
    const handleSettingsToggle = () => setSettingsOpen((prev) => !prev);
    const handleThemeModeClick = () => setShowThemeToggle(true);
    const handleClickItem = (path) => navigate(`${location.pathname}#${path}`);

    const isAdminDashboard = props.isAdminDash;
    const isStudentDashboard = props.isStudentDash;
    const onSectionSelect = props.onSectionSelect;

    return (
        <>
            <Box
                className="Mobile-view-box"
                style={{
                    width: '50px',
                    height: '100vh',
                    maxHeight: '100vh',
                    color: 'white',
                }}
            >
                <Box className="hamburger-menu" onClick={handleToggleSideBar} mt={10}>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                </Box>
            </Box>

            <Box
                className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
                onClick={handleCloseSideBar}
            ></Box>

            <Box className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <Box className="sidebar-close" onClick={handleCloseSideBar}>
                    <span className="close-bar"></span>
                    <span className="close-bar"></span>
                </Box>

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
            </Box>
        </>
    )
}

export default HideSideBat;
