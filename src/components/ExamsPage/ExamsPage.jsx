// Regular Imports
import { useState, useEffect } from 'react';

// Material UI Imports
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

// Theme Context
import { useTheme } from '../Theme Context/ThemeContext';

// CSS
import './ExamsPage.css';

// Router
import { useNavigate } from 'react-router-dom';

const ExamsPage = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL || "https://online-exam-portal-server.onrender.com";
  const [exams, setExams] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();
  const { themeMode } = useTheme() || { themeMode: 'light' };

  // Get completed exams from localStorage
  const getCompletedExams = () => {
    try {
      const completed = localStorage.getItem('completedExams');
      return completed ? JSON.parse(completed) : [];
    } catch (error) {
      console.error('Error reading completed exams:', error);
      return [];
    }
  };

  // Save completed exam to localStorage
  const saveCompletedExam = (examTitle) => {
    try {
      const completedExams = getCompletedExams();
      if (!completedExams.includes(examTitle)) {
        completedExams.push(examTitle);
        localStorage.setItem('completedExams', JSON.stringify(completedExams));
      }
    } catch (error) {
      console.error('Error saving completed exam:', error);
    }
  };

  // Fetch Exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`${API_URL}/api/exams/assigned`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await response.json();

        console.log("Fetched data:", data);
        console.log("First exam entry:", data.exams?.[0]);

        if (!Array.isArray(data)) {
          throw new Error("Invalid response: exams not an array");
        }

        // Filter out completed exams
        const completedExams = getCompletedExams();
        const availableExams = data.exams.filter(exam =>
          !completedExams.includes(exam.exam_name)
        );

        console.log("Filtered exams:", availableExams);

        const uniqueSubjects = [...new Set(availableExams.map(exam => exam.exam_name))];
        setExams(availableExams);
        setSubjects(uniqueSubjects);
        setLoading(false);

        console.log("The subjects are:", uniqueSubjects);
        console.log("Completed exams filtered:", completedExams);
        console.log("Available exams:", availableExams.length);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setError("Failed to load exams. Please try again later.");
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Handle Start Exam
  const handleStartExam = exam => {
    if (!exam || !exam.exam_name) {
      console.error('Invalid exam data:', exam);
      return;
    }

    // Mark exam as completed when starting (you can move this to exam completion)
    saveCompletedExam(exam.exam_name);

    navigate(`/start-exam/${encodeURIComponent(exam.exam_name)}`, {
      state: { exam }
    });
  };

  const filteredExams = exams.filter((exam) => {
    const matchesSubject = !selectedSubject || exam.exam_name === selectedSubject;
    const matchesType = !selectedType || exam.exam_type === selectedType;
    return matchesSubject && matchesType;
  });

  return (
    <div className="exams-page">
      <Typography
        variant="h4"
        className="page-title"
        gutterBottom
        sx={{
          margin: '32px 0 16px 0',
          textAlign: 'center',
          color: 'white'
        }}
      >
        Available Exams
      </Typography>

      <div className="filters" style={{ display: 'flex', gap: '16px', marginBottom: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}>Select Subject</InputLabel>
          <Select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            label="Select Subject"
            sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '& .MuiSvgIcon-root': { color: 'white' }
            }}
          >
            <MenuItem value="">All Subjects</MenuItem>
            {
              subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}>Exam Type</InputLabel>
          <Select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            label="Exam Type"
            sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '& .MuiSvgIcon-root': { color: 'white' }
            }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Objective">Objective</MenuItem>
            <MenuItem value="Subjective">Subjective</MenuItem>
          </Select>
        </FormControl>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <Typography variant="h6" color="error" sx={{ color: 'white' }}>
            {error}
          </Typography>
        </div>
      ) : (
        <div className="exams-grid">
          {filteredExams.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'white' }}>
              <Typography variant="h6">
                {getCompletedExams().length > 0
                  ? "No more exams available. You have completed all matching exams."
                  : "No exams available matching your criteria."
                }
              </Typography>
            </div>
          ) : (
            filteredExams.map((exam, index) => (
              <div key={`${exam.exam_name}-${exam.exam_type}-${index}`} style={{ position: 'relative' }}>
                <Card
                  className="exam-card"
                  sx={{
                    background: 'transparent',
                    boxShadow: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': {
                      transition: 'box-shadow 0.5s ease-in-out',
                      boxShadow:
                        themeMode === 'dark'
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
                      {exam.exam_name}
                    </Typography>
                    <Typography variant="body2" style={{
                      color: 'white',
                    }}>
                      Subject: {exam.exam_name}
                    </Typography>
                    <Typography variant="body2" style={{
                      color: 'white',
                    }}>
                      Type: {exam.exam_type}
                    </Typography>
                    <Typography variant="body2" style={{
                      color: 'white',
                    }}>
                      Questions: {exam.questions?.length ?? 0}
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
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
