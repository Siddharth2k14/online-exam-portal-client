// Keep these as normal imports - they're lightweight and frequently used
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import { useTheme } from '../Theme Context/ThemeContext';
import './StudentPage.css';

// Lazy load these heavy/less frequent components
import { lazy, Suspense } from 'react';
const ExamsPage = lazy(() => import('../ExamsPage/ExamsPage'));
const ViewExam = lazy(() => import('../ViewExam/ViewExam'));
const Result = lazy(() => import('../Result/Result'));
const AccountSettings = lazy(() => import('../Account Settings/AccountSettings'));
const ChangePassword = lazy(() => import('../Change Password/ChangePassword'));

// Loading components with consistent styling
const ComponentLoading = ({ message = "Loading..." }) => (
    <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Typography variant="h6" color="inherit">
            {message}
        </Typography>
    </div>
);

const StudentPage = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const user = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);
    const { themeMode } = useTheme();

    const renderContent = () => {
        if (selectedSection === 'Exams') {
            return (
                <Suspense fallback={<ComponentLoading message="Loading Exams..." />}>
                    <ExamsPage />
                </Suspense>
            );
        }

        else if (selectedSection === 'View Exam') {
            return (
                <Suspense fallback={<ComponentLoading message="Loading Exam Details..." />}>
                    <ViewExam />
                </Suspense>
            );
        }

        else if (selectedSection === 'Result') {
            return (
                <Suspense fallback={<ComponentLoading message="Loading Results Dashboard..." />}>
                    <Result />
                </Suspense>
            );
        }
        
        else if (selectedSection === 'Account Info') {
            return (
                <Suspense fallback={<ComponentLoading message="Loading Account Settings..." />}>
                    <AccountSettings user={user} role={role} />
                </Suspense>
            );
        }

        else if (selectedSection === 'Change Password') {
            return (
                <Suspense fallback={<ComponentLoading message="Loading Password Settings..." />}>
                    <ChangePassword />
                </Suspense>
            );
        }

        // Default dashboard content - no lazy loading needed
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
        );
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
                            : '0 0 90px 10px rgb(141, 141, 141)',
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