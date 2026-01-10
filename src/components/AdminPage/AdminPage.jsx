// Regular Imports
import { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import SideBar from "../SideBar/SideBar.jsx";

// MUI
import { Card, Typography, CardContent, Box } from '@mui/material';

// Theme
import { useTheme } from '../Theme Context/ThemeContext';

// CSS
import './AdminPage.css';
import AssignExam from '../Assignment Exam/AssignExam.jsx';

// Lazy Components
const ExamCreation = lazy(() => import('../Exam Creation/ExamCreation'));
const ManageExam = lazy(() => import('../Manage Exams/ManageExam'));
const AccountSettings = lazy(() => import('../Account Settings/AccountSettings'));
const ChangePassword = lazy(() => import('../Change Password/ChangePassword'));
const StudentList = lazy(() => import('../Student List/StudentList'));

// Loading component
const ComponentLoading = ({ message = "Loading..." }) => (
  <div style={{
    padding: '40px',
    textAlign: 'center',
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <Typography variant="h6">{message}</Typography>
  </div>
);

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const user = useSelector(state => state.auth.user);
  const { themeMode } = useTheme();

  // ✅ Safe resize handling
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyles = useMemo(() => ({
    border: themeMode === 'dark' ? '2px solid #fff' : '2px solid #333',
    left: isMobile ? '51px' : '261px',
    width: isMobile ? '832px' : '1018px',
  }), [themeMode, isMobile]);

  const renderContent = () => {
    if (!selectedSection) {
      return (
        <div className="admin-welcome" style={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Welcome, {user?.name || 'Admin'}
          </Typography>
          <Typography>
            Use the sidebar to manage exams and settings.
          </Typography>
        </div>
      );
    }

    return (
      <Suspense
        fallback={
          <ComponentLoading
            message={`Loading ${selectedSection}...`}
          />
        }
      >
        {selectedSection === 'Exam Creation' && <ExamCreation />}
        {selectedSection === 'Manage Exams' && <ManageExam />}
        {selectedSection === 'Account Info' && <AccountSettings />}
        {selectedSection === 'Change Password' && <ChangePassword />}
        {selectedSection === 'Student List' && <StudentList />}
        {selectedSection === 'Assign Exam' && <AssignExam />}
      </Suspense>
    );
  };

  return (
    <>
      <SideBar onSectionSelect={setSelectedSection} />

      <Box
        className="admin-page"
        style={containerStyles}
      >
        <Typography
          variant="h4"
          className="admin-heading"
          sx={{ color: themeMode === 'dark' ? '#fff' : '#333' }}
        >
          Admin Dashboard
        </Typography>

        <hr
          style={{
            borderTop: themeMode === 'dark' ? '2px solid #fff' : '2px solid #333',
            margin: '0 30px 30px',
          }}
        />

        <Card
          className="admin-card"
          sx={{
            bgcolor: themeMode === 'dark' ? '#333' : '#fff',
            color: themeMode === 'dark' ? '#fff' : '#333',
            boxShadow: themeMode === 'dark'
              ? '0 0 90px 10px rgba(86,157,228,.85)'
              : '0 0 90px 10px rgb(141,141,141)',
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