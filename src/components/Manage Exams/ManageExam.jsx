//Regular Imports
import { useEffect, useState } from 'react';

//Material UI Imports
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

//Theme Context
import { useTheme } from '../Theme Context/ThemeContext';

//CSS
import './ManageExam.css';

//Router
import { useNavigate } from 'react-router-dom';

//Component
import ViewExam from './ViewExam';

const ManageExam = () => {
  const [exams, setExams] = useState([]);
  const [viewExamTitle, setViewExamTitle] = useState(null);
  const navigate = useNavigate();
  const { themeMode } = useTheme();


  const fetchData = async () => {
    try {
      const response = await fetch("https://online-exam-portal-client.vercel.app/api/questions/all");
      const data = await response.json();
      if (data.exams) {
        setExams(data.exams);
      } else {
        setExams([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setExams([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = (exam_title) => {
    navigate(`/view-exam/${encodeURIComponent(exam_title)}`);
  };

  const handleDelete = async (exam_title) => {
    try {
      await fetch("https://online-exam-portal-client.vercel.app/api/questions/objective/${exam_title}", { method: 'DELETE' });
      await fetch("https://online-exam-portal-client.vercel.app/api/questions/subjective/${exam_title}", { method: 'DELETE' });
      setExams((prev) => prev.filter((exam) => exam.exam_title !== exam_title));
    } catch (error) {
      alert('Error deleting exam');
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" style={{ margin: '32px 0 16px 0', textAlign: 'center', color: 'white' }}>
        Manage Exams
      </Typography>
      {viewExamTitle ? (
        <ViewExam exam_title={viewExamTitle} onClose={() => setViewExamTitle(null)} />
      ) : (
        <div className="exam-cards-container">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <Card key={exam.exam_title} sx={{
                margin: '16px', padding: '16px', background: 'transparent', '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.5s ease-in-out',
                  // boxShadow: "0 2px 15px rgba(25, 118, 210, 0.749)",
                  boxShadow: themeMode === 'dark'
                    ? '0 0 90px 10px rgba(86, 157, 228, 0.854)'
                    : '0 0 90px 10px rgba(11, 11, 11, 0.854)',
                },
              }}>
                <Typography variant="h6"
                  sx={{
                    color: 'white',
                  }}
                >{exam.exam_title}</Typography>
                <Typography variant="body2" style={{ margin: '8px 0', color: 'white' }}>
                  {exam.questions.length} Questions
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: 8, color: 'white' }}>
                  Type: {exam.type}
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleView(exam.exam_title)}
                    style={{ marginRight: 8 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(exam.exam_title)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              No exams available.
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageExam;
