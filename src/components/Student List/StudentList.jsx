import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card' // Added missing import
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import process from 'process';
import './StudentList.css'; // Import CSS file

const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  const server_url = process.env.REACT_APP_SERVER_URL;

  const fetchStudent = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("https://online-exam-portal-client.vercel.app/api/auth/student/all");
      console.log('API Response:', response.data);

      // Handle different possible response structures
      if (response.data.students) {
        // If backend returns { students: [...] }
        setStudentData(response.data.students);
      } else if (response.data.data) {
        // If backend returns { data: [...] }
        setStudentData(response.data.data);
      } else if (Array.isArray(response.data)) {
        // If backend returns [...] directly
        setStudentData(response.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch students');
      setStudentData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudent();
  }, []);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress size={60} className="loading-spinner" />
        <Typography variant="h6" className="loading-text">
          Loading students...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Typography variant='h4' className="page-title" gutterBottom>
          Student List
        </Typography>
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
        <button
          onClick={fetchStudent}
          className="retry-button"
        >
          Try Again
        </button>
      </Box>
    );
  }

  function navigateToStudentDetail(selectedStudent) {
    navigate("/student-list/student-detail", {
      state: {
        name: selectedStudent.name,
        email: selectedStudent.email,
        phoneNumber: selectedStudent.phoneNumber,
        role: selectedStudent.role,
        student_id: selectedStudent._id,
      },
    });
  };

  return (
    <Box className="student-list-container">
      <Typography variant='h4' className="page-title" gutterBottom>
        Student Information List
      </Typography>

      {studentData.length === 0 ? (
        <Typography variant="h6" className="no-students-text">
          No students found.
        </Typography>
      ) : (
        <Box className="students-wrapper">
          <Typography variant="body1" className="student-count" gutterBottom>
            Total Students: {studentData.length}
          </Typography>

          {studentData.map((student) => (
            <Card
              key={student._id}
              className="student-card"
            >
              <CardContent className="student-card-content">
                <Typography variant="h6" className="student-name" gutterBottom>
                  <Button onClick={() => {
                    setSelectedStudent(student);
                    navigateToStudentDetail(selectedStudent);
                  }}>
                    {student.name}
                  </Button>
                </Typography>
                <Typography variant="body2" className="student-detail">
                  Email: {student.email}
                </Typography>
                <Typography variant="body2" className="student-detail">
                  Phone Number: {student.phoneNumber || student.phoneNo || 'Not provided'}
                </Typography>
                <Typography variant="body2" className="student-detail">
                  Role: {student.role}
                </Typography>
                {student.createdAt && (
                  <Typography variant="body2" className="student-detail">
                    Created At: {new Date(student.createdAt).toLocaleString()}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default StudentList