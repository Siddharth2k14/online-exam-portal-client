import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, Typography, Button } from '@mui/material';
import axios from 'axios';
import './ViewExam.css';

const ViewExam = () => {
  const { examTitle } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        // Fetch all exams and find the one matching examTitle
        const res = await axios.get('http://localhost:3000/api/questions/all');
        const exams = res.data.exams || [];
        const foundExam = exams.find(e => e.exam_title === examTitle);
        setExam(foundExam || null);
      } catch (error) {
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
    <div className="view-exam-container">
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        className="view-exam-back-btn"
      >
        Back
      </Button>
      <Card className="view-exam-card">
        <Typography variant="h4" className="view-exam-title" gutterBottom>
          {exam.exam_title}
        </Typography>
        {exam.questions.length === 0 ? (
          <Typography>No questions in this exam.</Typography>
        ) : (
          exam.questions.map((q, idx) => (
            <div key={idx} className="view-exam-question-block">
              <Typography className="view-exam-question" variant="subtitle1">
                {idx + 1}. {q.question_title || q.question}
              </Typography>
              {exam.type === 'Objective' && q.options ? (
                q.options.map((opt, oidx) => (
                  <Typography
                    key={oidx}
                    className={`view-exam-option${q.correct_option === oidx ? ' correct-option' : ''}`}
                    style={q.correct_option === oidx ? { fontWeight: 'bold', color: '#388e3c' } : {}}
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
    </div>
  );
};

export default ViewExam;