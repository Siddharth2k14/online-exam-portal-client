import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CardActions, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './ExamsPage.css';
import StartExam from '../StartExam/StartExam.jsx';
import { useNavigate } from "react-router-dom";

const LOCAL_STORAGE_KEY = "studentExamHistory";

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [completedExamTitles, setCompletedExamTitles] = useState([]);
  const navigate = useNavigate();

  // Load completed exams from localStorage
  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      try {
        const history = JSON.parse(data);
        const titles = history.map((item) => item.exam.exam_title);
        setCompletedExamTitles(titles);
      } catch { /* ignore JSON parse errors, treat as no completed exams */ }
    } else {
      setCompletedExamTitles([]);
    }
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('https://online-exam-portal-server.onrender.com/api/questions/all');
        const examData = response.data.exams || [];
        setExams(examData);

        // Extract unique subjects only from exams not completed
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        let completedTitles = [];
        if (data) {
          try {
            const history = JSON.parse(data);
            completedTitles = history.map((item) => item.exam.exam_title);
          } catch { /* ignore JSON parse errors, treat as no completed exams */ }
        }
        const availableExams = examData.filter(exam => !completedTitles.includes(exam.exam_title));
        const uniqueSubjects = [...new Set(availableExams.map(exam => exam.exam_title))];
        setSubjects(uniqueSubjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exams:', error);
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  // Filter out completed exams
  const filteredExams = exams.filter(exam => {
    const matchesSubject = !selectedSubject || exam.exam_title === selectedSubject;
    const matchesType = !selectedType || exam.type === selectedType;
    const notCompleted = !completedExamTitles.includes(exam.exam_title);
    return matchesSubject && matchesType && notCompleted;
  });

  const handleStartExam = (exam) => {
    navigate(`/start-exam/${encodeURIComponent(exam.exam_title)}`, { state: { exam } });
  }

  return (
    <div className="exams-page">
      <Typography variant="h4" className="page-title" gutterBottom sx={{
        margin: '32px 0 16px 0',
        textAlign: 'center',
        color: 'white'
      }}>
        Available Exams
      </Typography>

      <div className="filters">
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel sx={{
            color: 'white'
          }}>Select Subject</InputLabel>
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            label="Select Subject"
          >
            <MenuItem value="">All Subjects</MenuItem>
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>{subject}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{
            color: 'white'
          }}>Exam Type</InputLabel>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            label="Exam Type"
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Objective">Objective</MenuItem>
            <MenuItem value="Subjective">Subjective</MenuItem>
          </Select>
        </FormControl>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className="exams-grid">
          {filteredExams.map((exam) => (
            <Card key={exam.exam_title} className="exam-card">
              <CardContent>
                <Typography variant="h6">{exam.exam_title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {exam.type}
                </Typography>
                <Typography variant="body2">
                  Questions: {exam.questions.length}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStartExam(exam)}
                >
                  Start Exam
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
