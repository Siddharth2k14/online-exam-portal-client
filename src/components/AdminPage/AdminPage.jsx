<<<<<<< HEAD
=======
<<<<<<< HEAD
import React, { useState } from 'react'
import './AdminPage.css';
import { Card, CardContent, Typography } from '@mui/material';
import SideBar from '../SideBar/SideBar';
import ExamCreation from '../Exam Creation/ExamCreation';
import ManageExam from '../Manage Exams/ManageExam';
import AccountSettings from '../Account Settings/AccountSettings';
=======
>>>>>>> master
import useState from 'react';
import SideBar from '../SideBar/SideBar';
import ExamCreation from '../Exam Creation/ExamCreation';
import ManageExam from '../Manage Exams/ManageExam';
import { useSelector} from 'react-redux';
import AccountSettings from '../Account Settings/AccountSettings';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import './AdminPage.css';
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> master

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [titleExam, setTitleExam] = useState('');
  // const [submittedTitle, setSubmittedTitle] = useState('');
<<<<<<< HEAD
  const user = { useSelector}(state => state.auth.user);
=======
<<<<<<< HEAD
=======
  const user = { useSelector}(state => state.auth.user);
>>>>>>> master
>>>>>>> master

  const renderContent = () => {
    if (selectedSection === 'Exam Creation') {
      return <ExamCreation />;
    }
    else if (selectedSection === 'Manage Exams') {
      return <ManageExam />;
    }
    else if (selectedSection === 'Account Settings') {
<<<<<<< HEAD
      return <AccountSettings user={user} />;
=======
<<<<<<< HEAD
      return <AccountSettings />;
=======
      return <AccountSettings user={user} />;
>>>>>>> master
>>>>>>> master
    }

    return (
      <>
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <div className='admin-welcome'>
=======
>>>>>>> master
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
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> master
          <Typography variant="h6" gutterBottom>
            Welcome, Admin!
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
      <div className='admin-page'>
        <Typography variant='h4' className='admin-heading'>
          Admin Dashboard
        </Typography>
        <hr className='horizontal-line' />
        <Card className='admin-card'>
=======
>>>>>>> master
      <div
        className='admin-page'
        style={{
          width: '79.6vw',
          minHeight: '98.5vh',
          position: 'absolute',
          top: '65px',
          left: '261px'
        }}
      >
        <Typography variant='h4' className='admin-heading'>
          Admin Dashboard
        </Typography>
        <hr style={{
          border: 'none',
          borderTop: '2px solid black',
          margin: '0 30px 30px 30px',
          height: '0'
        }} />
        <Card
          className='admin-card'
          sx={{
            margin: '20px',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(60, 60, 60, 0.06)',
          }}
        >
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> master
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AdminPage;
