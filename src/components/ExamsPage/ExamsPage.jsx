//Regular Imports
import { useState, useEffect } from 'react';

//Material UI Imports
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

//Theme Context
import { useTheme } from '../Theme Context/ThemeContext';

//CSS
import './ExamsPage.css';

//Router
import { useNavigate } from "react-router-dom";

//Axios
import axios from 'axios';

const LOCAL_STORAGE_KEY = "studentExamHistory";

//Component
const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [completedExamTitles, setCompletedExamTitles] = useState([]);
  const navigate = useNavigate();
  const { themeMode } = useTheme();

  // Helper function to get completed exams from localStorage
  const getCompletedExams = () => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const history = JSON.parse(data);
        return history.map((item) => item.exam?.exam_title).filter(Boolean);
      }
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
    return [];
  };

  // Load completed exams from localStorage
  useEffect(() => {
    const completedTitles = getCompletedExams();
    setCompletedExamTitles(completedTitles);
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('https://online-exam-portal-server.onrender.com/api/questions/all');
        
        // Debug: Log the actual response structure
        console.log('API Response:', response.data);
        
        // Handle different possible response structures
        let examData = [];
        if (response.data.exams) {
          examData = response.data.exams;
        } else if (Array.isArray(response.data)) {
          examData = response.data;
        } else {
          throw new Error('Unexpected API response structure');
        }

        // Validate exam data structure
        const validExams = examData.filter(exam => 
          exam && 
          exam.exam_title && 
          exam.type && 
          Array.isArray(exam.questions)
        );

        setExams(validExams);

        // Get completed exams
        const completedTitles = getCompletedExams();
        
        // Filter out completed exams for subject extraction
        const availableExams = validExams.filter(exam => 
          !completedTitles.includes(exam.exam_title)
        );
        
        // Extract unique subjects - assuming you have a subject field
        // If you don't have a subject field, you might want to use exam_title
        const uniqueSubjects = [...new Set(availableExams.map(exam => 
          exam.subject || exam.exam_title // Use subject if available, otherwise exam_title
        ))];
        
        setSubjects(uniqueSubjects);
        setCompletedExamTitles(completedTitles);
        
      } catch (error) {
        console.error('Error fetching exams:', error);
        setError(error.message || 'Failed to fetch exams');
      } finally {
        setLoading(false);
      }
    };
    
    fetchExams();
  }, []);

  // Filter exams
  const filteredExams = exams.filter(exam => {
    const subjectToMatch = exam.subject || exam.exam_title;
    const matchesSubject = !selectedSubject || subjectToMatch === selectedSubject;
    const matchesType = !selectedType || exam.type === selectedType;
    const notCompleted = !completedExamTitles.includes(exam.exam_title);
    return matchesSubject && matchesType && notCompleted;
  });

  const handleStartExam = (exam) => {
    try {
      // Validate exam object before navigation
      if (!exam || !exam.exam_title) {
        throw new Error('Invalid exam data');
      }
      
      navigate(`/start-exam/${encodeURIComponent(exam.exam_title)}`, { 
        state: { exam } 
      });
    } catch (error) {
      console.error('Navigation error:', error);
      setError('Failed to start exam. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="exams-page" style={{ textAlign: 'center', padding: '40px' }}>
        <CircularProgress sx={{ color: 'white' }} />
        <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
          Loading exams...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exams-page">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </div>
    );
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
          <InputLabel sx={{ color: 'white' }}>
            Select Subject
          </InputLabel>
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            label="Select Subject"
            sx={{ color: 'white' }}
          >
            <MenuItem value="">All Subjects</MenuItem>
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: 'white' }}>
            Exam Type
          </InputLabel>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            label="Exam Type"
            sx={{ color: 'white' }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Objective">Objective</MenuItem>
            <MenuItem value="Subjective">Subjective</MenuItem>
          </Select>
        </FormControl>
      </div>

      {filteredExams.length === 0 ? (
        <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', mt: 4 }}>
          No exams available
        </Typography>
      ) : (
        <div className="exams-grid">
          {filteredExams.map((exam) => (
            <div key={exam.exam_title} style={{ position: 'relative' }}>
              <Card
                className="exam-card"
                sx={{
                  background: 'transparent',
                  boxShadow: 'none',
                  color: 'white',
                  '&:hover': {
                    transition: 'box-shadow 0.5s ease-in-out',
                    boxShadow: themeMode === 'dark'
                      ? '0 0 90px 10px rgba(86, 157, 228, 0.854)'
                      : '0 0 90px 10px rgba(11, 11, 11, 0.854)'
                  }
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: themeMode === 'dark' ? '#90caf9' : '#1976d2'
                      }
                    }}
                  >
                    {exam.exam_title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    Type: {exam.type}
                  </Typography>
                  <Typography variant="body2">
                    Questions: {exam.questions?.length || 0}
                  </Typography>
                  {exam.subject && (
                    <Typography variant="body2" sx={{ color: 'white' }}>
                      Subject: {exam.subject}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStartExam(exam)}
                    disabled={!exam.questions || exam.questions.length === 0}
                  >
                    Start Exam
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamsPage;