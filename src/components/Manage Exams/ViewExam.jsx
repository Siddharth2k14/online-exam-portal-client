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
  const [error, setError] = useState(null);

<<<<<<< HEAD
=======
 const server_url = import.meta.env.VITE_SERVER_URL;

>>>>>>> testing
  useEffect(() => {
    const fetchExam = async () => {
      try {
        console.log('=== DEBUG START ===');
        console.log('1. examTitle from useParams:', examTitle);
        console.log('2. examTitle type:', typeof examTitle);
        console.log('3. examTitle length:', examTitle?.length);
        console.log(examTitle);
        
        const res = await axios.get("https://online-exam-portal-server.onrender.com/api/questions/all");
        
        console.log('4. Raw API response:', res.data);
        console.log('5. res.data.exams exists?', !!res.data.exams);
        console.log('6. res.data.exams is array?', Array.isArray(res.data.exams));
        
        if (!res.data.exams || !Array.isArray(res.data.exams)) {
          throw new Error('API response does not contain exams array');
        }
        
        const exams = res.data.exams;
        console.log('7. Number of exams:', exams.length);
        
        if (exams.length === 0) {
          console.log('8. No exams found in response');
          setError('No exams available');
          return;
        }
        
        console.log('9. All exam titles in database:');
        exams.forEach((exam, index) => {
          console.log(`   [${index}] "${exam.exam_title}" (length: ${exam.exam_title?.length})`);
        });
        
        console.log('10. Attempting to find match...');
        const foundExam = exams.find(e => {
          console.log(`    Comparing "${e.exam_title}" === "${examTitle}"`);
          return e.exam_title === examTitle;
        });
        
        console.log('11. Found exam:', foundExam ? 'YES' : 'NO');
        console.log('=== DEBUG END ===');
        
        setExam(foundExam || null);
        
        if (!foundExam) {
          setError(`Exam "${examTitle}" not found. Available exams: ${exams.map(e => `"${e.exam_title}"`).join(', ')}`);
        }
        
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError(err.message);
        setExam(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExam();
  }, [examTitle]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  
  if (error) {
    return (
      <Box className="view-exam-container">
        <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Card style={{ padding: '20px', margin: '20px' }}>
          <Typography variant="h5" color="error">Error</Typography>
          <Typography>{error}</Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Check the browser console (F12) for detailed debugging information.
          </Typography>
        </Card>
      </Box>
    );
  }
  
  if (!exam) {
    return (
      <Box className="view-exam-container">
        <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Card style={{ padding: '20px', margin: '20px' }}>
          <Typography variant="h5" color="error">No exam found</Typography>
          <Typography>
            Looking for exam: "{examTitle}"
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Check the browser console (F12) for detailed debugging information.
          </Typography>
        </Card>
      </Box>
    );
  }

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
        <Typography variant="h4" className="view-exam-title" gutterBottom>
          {exam.exam_title}
        </Typography>
        {!exam.questions || exam.questions.length === 0 ? (
          <Typography>No questions in this exam.</Typography>
        ) : (
          exam.questions.map((q, idx) => (
            <div key={idx} className="view-exam-question-block"
              style={{
                padding: '16px',
                margin: '16px 0',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <Typography className="view-exam-question" variant="subtitle1">
                {idx + 1}. {q.question}
              </Typography>
              {exam.type === 'Objective' && q.options ? (
                q.options.map((opt, oidx) => (
                  <Typography
                    key={oidx}
                    className={`view-exam-option${q.correct_option === oidx ? ' correct-option' : ''}`}
                    style={q.correct_option === oidx ? {
                      fontWeight: 'bold', 
                      color: '#388e3c'
                    } : {}}
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