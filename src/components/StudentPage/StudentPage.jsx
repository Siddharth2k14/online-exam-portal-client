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

const StudentPage = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const user = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);

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
        else if(selectedSection === 'Account Info') {
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
                    <Typography variant="h6" gutterBottom>
                        Welcome, {user?.name || 'Student'}!
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
            <div className='student-page'>
                <Typography variant='h4' className='student-heading'>
                    Student Dashboard
                </Typography>
                <hr className='horizontal-line' />
                <Card className="student-card">
                    <CardContent>
                        {renderContent()}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default StudentPage;