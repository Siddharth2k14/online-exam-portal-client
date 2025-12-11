//Regular Imports
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SideBar from "../SideBar/SideBar.jsx";

//Material UI Imports
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

//Theme Context
import { useTheme } from '../Theme Context/ThemeContext';

//CSS
import './AdminPage.css';

//Lazy Imports
import { lazy, Suspense } from 'react';
// const SideBar = lazy(() => import("../SideBar/SideBar"));
const ExamCreation = lazy(() => import('../Exam Creation/ExamCreation'));
const ManageExam = lazy(() => import('../Manage Exams/ManageExam'));
const AccountSettings = lazy(() => import('../Account Settings/AccountSettings'));
const ChangePassword = lazy(() => import('../Change Password/ChangePassword'));
const StudentList = lazy(() => import('../Student List/StudentList'));

// Loading component with consistent styling
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

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const user = useSelector(state => state.auth.user);
  const role = useSelector(state => state.auth.role);
  const { themeMode } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    if (selectedSection === 'Exam Creation') {
      return (
        <Suspense fallback={<ComponentLoading message="Loading Exam Creation Tools..." />}>
          <ExamCreation />
        </Suspense>
      );
    }

    else if (selectedSection === 'Manage Exams') {
      return (
        <Suspense fallback={<ComponentLoading message="Loading Exam Management..." />}>
          <ManageExam />
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

    else if (selectedSection === 'Student List') {
      return (
        <Suspense fallback={<ComponentLoading message="Loading Student List..." />}>
          <StudentList />
        </Suspense>
      )
    }

    // Default dashboard content - no lazy loading needed
    return (
      <>
        <div
          className='admin-welcome'
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '1.5rem',
            fontWeight: '500',
            color: 'white',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Welcome, {user?.name || 'Admin'}
          </Typography>
          <Typography variant="body1">
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
        className='admin-page'
        style={{
          border: themeMode === 'dark' ? '2px solid #fff' : '2px solid #333',
          left: isMobile ? '51px' : '261px',
          width: isMobile ? '832px' : '1018px',
        }}
      >
        <Typography variant='h4' className='admin-heading'
          sx={{
            color: themeMode === 'dark' ? '#fff' : '#333'
          }}
        >
          Admin Dashboard
        </Typography>
        <hr style={{
          borderTop: themeMode === 'dark' ? '2px solid #fff' : '2px solid #333',
          margin: '0 30px 30px 30px',
          height: '0',
        }} />
        <Card
          className='admin-card'
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
  );
};

export default AdminPage;
