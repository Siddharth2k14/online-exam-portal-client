import { Card, Collapse, List, ListItem, ListItemText, Typography, Switch } from "@mui/material";
import './SideBar.css';
import { useState } from "react";

const SideBar = ({ onSectionSelect }) => {
    const [examOpen, setExamOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [themeMode, setThemeMode] = useState('light');
    const [showThemeToggle, setShowThemeToggle] = useState(false);

    const handleExamToggle = () => {
        setExamOpen((prev) => !prev);
    };

    const handleSettingsToggle = () => {
        setSettingsOpen((prev) => !prev);
    };

    const handleThemeModeClick = () => {
        setShowThemeToggle(true);
    };

    const handleThemeToggle = () => {
        setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
        // Optionally, apply theme to body or context here
        document.body.style.background = themeMode === 'light' ? '#222' : '#fff';
        document.body.style.color = themeMode === 'light' ? '#fff' : '#222';
    };

    // Check if the URL contains "admin/dashboard"
    const isAdminDashboard = window.location.pathname.includes("admin/dashboard");
    const isStudentDashboard = location.pathname.includes("student/dashboard");

    return (
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
                                <ListItem onClick={() => onSectionSelect('Exam Creation')}>
                                    <ListItemText primary="Exam Creation" />
                                </ListItem>
                                <ListItem onClick={() => onSectionSelect('Manage Exams')}>
                                    <ListItemText primary="Manage Exams" />
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
                            <List>
                                <ListItem onClick={() => onSectionSelect('Exams')}>
                                    <ListItemText primary="Exams" />
                                </ListItem>
                                <ListItem onClick={() => onSectionSelect('View Exam')}>
                                    <ListItemText primary="View Exam" />
                                </ListItem>
                                <ListItem onClick={() => onSectionSelect('Result')}>
                                    <ListItemText primary="Result" />
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
                        <List>
                            <ListItem button onClick={() => onSectionSelect('Account Settings')}>
                                <ListItemText primary="Account Settings" />
                            </ListItem>
                            {isStudentDashboard && (
                                <ListItem button onClick={() => onSectionSelect('Change Password')}>
                                    <ListItemText primary="Change Password" />
                                </ListItem>
                            )}
                            <ListItem button onClick={handleThemeModeClick}>
                                <ListItemText primary="Theme Mode" />
                            </ListItem>
                            {showThemeToggle && (
                                <ListItem>
                                    <ListItemText primary={themeMode === 'light' ? 'Light Mode' : 'Dark Mode'} />
                                    <Switch
                                        checked={themeMode === 'dark'}
                                        onChange={handleThemeToggle}
                                        color="primary"
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Collapse>
                </Card>
            </div>
        </div>
    );
}

export default SideBar;