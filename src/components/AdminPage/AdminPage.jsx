import React, { useState } from 'react'
import './AdminPage.css';
import { Card, CardContent, Typography } from '@mui/material';
import SideBar from '../SideBar/SideBar';
import ExamCreation from '../Exam Creation/ExamCreation';
import ManageExam from '../Manage Exams/ManageExam';
import AccountSettings from '../Account Settings/AccountSettings';

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [titleExam, setTitleExam] = useState('');
  // const [submittedTitle, setSubmittedTitle] = useState('');

  const renderContent = () => {
    if (selectedSection === 'Exam Creation') {
      return <ExamCreation />;
    }
    else if (selectedSection === 'Manage Exams') {
      return <ManageExam />;
    }
    else if (selectedSection === 'Account Settings') {
      return <AccountSettings />;
    }

    return (
      <>
        <div className='admin-welcome'>
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
      <div className='admin-page'>
        <Typography variant='h4' className='admin-heading'>
          Admin Dashboard
        </Typography>
        <hr className='horizontal-line' />
        <Card className='admin-card'>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AdminPage;
