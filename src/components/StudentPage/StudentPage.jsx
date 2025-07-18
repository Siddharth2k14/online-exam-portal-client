import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import ExamsPage from '../ExamsPage/ExamsPage';
import ViewExam from '../ViewExam/ViewExam';
import Result from '../Result/Result';
import AccountSettings from '../Account Settings/AccountSettings';
import ChangePassword from '../Change Password/ChangePassword';
import { useSelector } from 'react-redux';
import './StudentPage.css';
import { useTheme } from '../Theme Context/ThemeContext'
import Box from '@mui/material/Box';

const StudentPage = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const user = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);
    const { themeMode } = useTheme();

    const renderContent = () => {
        if (selectedSection === 'Exams') {
            return <ExamsPage />;
        }

        else if (selectedSection === 'View Exam') {
            return (
                <ViewExam />
            )
        }

        else if (selectedSection === 'Result') {
            return (
                <Result />
            )
        }
        else if (selectedSection === 'Account Info') {
            return (
                <AccountSettings user={user} role={role} />
            )
        }

        else if (selectedSection === 'Change Password') {
            return (
                <ChangePassword />
            )
        }
        return (
            <>
                <div className='student-welcome'>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Welcome, {user?.name || 'Student'}!
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Use the sidebar to manage exams and settings.
                    </Typography>
                </div>
            </>
        )
    }

    return (
        <>
            <SideBar onSectionSelect={setSelectedSection} />
            <Box
                className='student-page'
                style={{
                    border: themeMode === 'dark' ? '2px solid #fff' : '2px solid #333',
                }}
            >
                {console.log(themeMode)}
                <Typography
                    variant='h4'
                    className='student-heading'
                    sx={{ color: themeMode === 'dark' ? '#fff' : '#333' }}
                >
                    Student Dashboard
                </Typography>
                <hr
                    style={{
                        borderTop: themeMode === 'dark' ? '2px solid #fff' : '2px solid #333',
                        margin: '0 30px 30px 30px',
                        // border: 'none',
                        height: '0',
                    }}
                />
                <Card
                    className="student-card"
                    sx={{
                        bgcolor: themeMode === 'dark' ? '#333' : '#fff',
                        color: themeMode === 'dark' ? '#fff' : '#333',
                        boxShadow: themeMode === 'dark'
                            ? '0 0 90px 10px rgba(86, 157, 228, 0.854)'
                            : 'none',
                    }}
                >
                    <CardContent>
                        {renderContent()}
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default StudentPage;