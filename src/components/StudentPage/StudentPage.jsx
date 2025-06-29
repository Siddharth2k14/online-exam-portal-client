import { Card, CardContent, Typography } from '@mui/material'
import './StudentPage.css'
import { useState } from 'react'
import SideBar from '../SideBar/SideBar';
import ExamsPage from '../ExamsPage/ExamsPage';
import ViewExam from '../ViewExam/ViewExam';
import { useSelector } from 'react-redux';
import Result from '../Result/Result';

const StudentPage = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const user = useSelector(state => state.auth.user);

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
                <Card data-testid="student-card">
                    <CardContent>
                        {renderContent()}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default StudentPage;
