import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { useTheme } from '../Theme Context/ThemeContext'
import './SideBar.css';

const SideBar = ({ onSectionSelect }) => {
    const [examOpen, setExamOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [showThemeToggle, setShowThemeToggle] = useState(false);
    const { themeMode, toggleTheme } = useTheme();

    const handleExamToggle = () => {
        setExamOpen((prev) => !prev);
    };

    const handleSettingsToggle = () => {
        setSettingsOpen((prev) => !prev);
    };

    const handleThemeModeClick = () => {
        setShowThemeToggle(true);
    };

    // Check if the URL contains "admin/dashboard"
    const isAdminDashboard = window.location.pathname.includes("admin/dashboard");
    const isStudentDashboard = location.pathname.includes("student/dashboard");

    return (
        <div
            className="sidebar"
            style={{
                width: '260px',
                height: '100vh',
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
                                <List className="exam-list-items">
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
                            <List className="setting-list-items">
                                    <ListItem button onClick={() => onSectionSelect('Account Info')}>
                                        <ListItemText primary="Account Info" />
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
                                                onChange={toggleTheme}
                                                color="primary"
                                            />
                                        </ListItem>
                                    )}
                            </List>
                        </Collapse>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SideBar;