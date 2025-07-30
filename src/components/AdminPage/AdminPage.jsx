import { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import ExamCreation from '../Exam Creation/ExamCreation';
import ManageExam from '../Manage Exams/ManageExam';
import { useSelector } from 'react-redux';
import AccountSettings from '../Account Settings/AccountSettings';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import './AdminPage.css';
import Box from '@mui/material/Box';
import { useTheme } from '../Theme Context/ThemeContext';

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState('');
  // const [submittedTitle, setSubmittedTitle] = useState('');
  const user = useSelector(state => state.auth.user);
  const role = useSelector(state => state.auth.role);
  const { themeMode } = useTheme();

  const renderContent = () => {
    if (selectedSection === 'Exam Creation') {
      return <ExamCreation />;
    }
    else if (selectedSection === 'Manage Exams') {
      return <ManageExam />;
    }
    else if (selectedSection === 'Account Info') {
      return <AccountSettings user={user} role={role}  />;
    }

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
    )
  }

  return (
    <>
      <SideBar onSectionSelect={setSelectedSection} />
      <Box
        className='admin-page'
        style={{
          border: themeMode === 'dark' ? '2px solid #fff' : '2px solid #333',
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
          // border: 'none',
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