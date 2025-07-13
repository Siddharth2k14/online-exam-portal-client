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

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [titleExam, setTitleExam] = useState('');
  // const [submittedTitle, setSubmittedTitle] = useState('');
  const user = { useSelector}(state => state.auth.user);

  const renderContent = () => {
    if (selectedSection === 'Exam Creation') {
      return <ExamCreation />;
    }
    else if (selectedSection === 'Manage Exams') {
      return <ManageExam />;
    }
    else if (selectedSection === 'Account Settings') {
      return <AccountSettings user={user} />;
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
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AdminPage;
