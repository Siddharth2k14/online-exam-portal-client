//Regular Imports
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//Material UI Imports
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

//Axios
import axios from 'axios';

//CSS
import './ViewExam.css';

//Component
const ViewExam = () => {
  const { examTitle } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        // Fetch all exams and find the one matching examTitle
        const res = await axios.get('https://online-exam-portal-server.onrender.com/api/questions/all');
        const exams = res.data.exams || [];
        const foundExam = exams.find(e => e.exam_title === examTitle);
        setExam(foundExam || null);
      } catch (err) {
        console.error('Error fetching exam:', err);
        setExam(null);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examTitle]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!exam) return <Typography>No exam found.</Typography>;

  return (
    <Box className="view-exam-container">
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        className="view-exam-back-btn"
      >
        Back
      </Button>
      <Card className="view-exam-card">
        <Typography variant="h4" className="view-exam-title" gutterBottom
          sx={{
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.5s ease-in-out',
              boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)",
              fontSize: '2.3em',
            },
          }}
        >
          {exam.exam_title}
        </Typography>
        {exam.questions.length === 0 ? (
          <Typography>No questions in this exam.</Typography>
        ) : (
          exam.questions.map((q, idx) => (
            <div key={idx} className="view-exam-question-block"
              style={{
                // border: '2px solid black',
                padding: '16px',
                margin: '16px 0',
                // background: 'black',

              }}
            >
              <Typography className="view-exam-question" variant="subtitle1"
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.5s ease-in-out',
                    boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)",
                    fontSize: '1.3rem',
                  },
                }}
              >
                {idx + 1}. {q.question_title || q.question}
              </Typography>
              {exam.type === 'Objective' && q.options ? (
                q.options.map((opt, oidx) => (
                  <Typography
                    key={oidx}
                    className={`view-exam-option${q.correct_option === oidx ? ' correct-option' : ''}`}
                    sx={q.correct_option === oidx ? {
                      fontWeight: 'bold', color: '#388e3c',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.5s ease-in-out',
                        boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)",
                        fontSize: '1.3rem',
                      },
                    } : {}
                    }
                  >
                    {String.fromCharCode(65 + oidx)}. {opt}
                    {q.correct_option === oidx && (
                      <span style={{ marginLeft: 8, color: '#388e3c' }}>(Correct)</span>
                    )}
                  </Typography>
                ))
              ) : (
                <Typography className="view-exam-answer" style={{ marginTop: 8, color: '#1976d2' }}>
                  Answer: {q.answer}
                </Typography>
              )}
            </div>
          ))
        )}
      </Card>
    </Box>
  );
};

export default ViewExam;