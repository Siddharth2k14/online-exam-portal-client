//Regular Imports
import { useEffect, useState } from 'react';
import axios from 'axios';

//Material UI Imports
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//CSS
import './StartExam.css';

//Router
import { useParams, useNavigate } from 'react-router-dom';
import {Timer} from '../Timer/Timer.jsx';

const StartExam = () => {
  const { examTitle } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  
  const handleTimeUp = () => {
    setTimeUp(true);
    alert("Time is up! Submitting your exam automatically");
    handleSubmit();
  };

  /* ------------------------------------------------------------------ */
  /* 1. OPTIMIZED: Use dedicated exam endpoint for better performance    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");

      try {
        // OPTIMIZATION: Use the specific exam endpoint instead of /all
        const response = await axios.get(
          "https://online-exam-portal-server.onrender.com/api/questions/exam/${encodeURIComponent(examTitle)}"
        );
        
        if (!response.data) {
          throw new Error('No exam data received');
        }

        const examData = response.data;

        // Data is already normalized from the server
        setExam(examData);
        setAnswers(Array(examData.questions.length).fill(""));

      } catch (err) {
        console.error('Error fetching exam:', err);
        
        // If the new endpoint doesn't exist yet, fallback to the old method
        if (err.response?.status === 404) {
          try {
            const fallbackResponse = await axios.get(
              "https://online-exam-portal-server.onrender.com/api/questions/all"
            );
            
            const foundExam = fallbackResponse.data?.exams?.find(
              exam => exam.exam_title === examTitle
            );

            if (!foundExam) {
              throw new Error(`Exam "${examTitle}" not found`);
            }

            // Normalize the exam data structure
            const normalizedExam = {
              exam_title: foundExam.exam_title,
              type: foundExam.type,
              questions: foundExam.questions.map((q, index) => ({
                id: index,
                question_text: foundExam.type === 'Objective' 
                  ? q.question_title || q.question 
                  : q.question,
                ...(foundExam.type === 'Objective' && {
                  options: q.options,
                  correct_option: q.correct_option,
                }),
                ...(foundExam.type === 'Subjective' && {
                  answer: q.answer,
                  marks: q.marks || 10
                })
              }))
            };

            setExam(normalizedExam);
            setAnswers(Array(normalizedExam.questions.length).fill(""));
          } catch (fallbackErr) {
            setError(`Failed to load exam: ${fallbackErr.message}`);
          }
        } else {
          setError(`Failed to load exam: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examTitle]);

  /* ------------------------------------------------------------------ */
  /* 2. OPTIMIZED: Event handlers                                       */
  /* ------------------------------------------------------------------ */
  const handleOptionChange = (e) => {
    const updated = [...answers];
    updated[current] = Number(e.target.value);
    setAnswers(updated);
  };

  const handleTextChange = (e) => {
    const updated = [...answers];
    updated[current] = e.target.value;
    setAnswers(updated);
  };

  const handlePrev = () => setCurrent((p) => Math.max(p - 1, 0));
  
  const handleNext = () => {
    setCurrent((p) => Math.min(p + 1, exam.questions.length - 1));
  };

  /* ------------------------------------------------------------------ */
  /* 3. Submit to backend with proper error handling                    */
  /* ------------------------------------------------------------------ */
  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      console.log('Submitting exam:', {
        examTitle: exam.exam_title,
        examType: exam.type,
        answersLength: answers.length
      });

      // Submit to backend
      const response = await axios.post(
        "https://online-exam-portal-server.onrender.com/api/submissions/submit",
        {
          examTitle: exam.exam_title,
          examType: exam.type,
          answers: answers
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 second timeout
        }
      );

      console.log('Submission response:', response.data);

      // Mark exam as completed in localStorage
      const completedExams = JSON.parse(localStorage.getItem('completedExams') || '[]');
      if (!completedExams.includes(exam.exam_title)) {
        completedExams.push(exam.exam_title);
        localStorage.setItem('completedExams', JSON.stringify(completedExams));
      }

      // Navigate to review page with submission data
      navigate(
        `/exam/${encodeURIComponent(exam.exam_title)}/review`,
        {
          state: {
            exam,
            answers,
            score: response.data.submission.score,
            totalQuestions: response.data.submission.totalQuestions,
            percentage: response.data.submission.percentage,
            submissionId: response.data.submission.id,
            submissionTime: response.data.submission.submissionTime
          },
        }
      );

    } catch (error) {
      console.error('Submission error:', error);
      
      let errorMessage = 'Failed to submit exam. ';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out. Please check your connection and try again.';
      } else if (error.response?.status === 400) {
        errorMessage += error.response.data?.message || 'Invalid data sent to server.';
      } else if (error.response?.status === 404) {
        errorMessage += 'Exam not found on server.';
      } else if (error.response?.status >= 500) {
        errorMessage += 'Server error. Please try again in a few moments.';
      } else if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else {
        errorMessage += error.message || 'Unknown error occurred.';
      }
      
      setError(errorMessage);
      setSubmitting(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* 4. Render states                                                   */
  /* ------------------------------------------------------------------ */
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        <CircularProgress size={40} />
        <Typography variant="body1" sx={{ mt: 2, color: 'white' }}>
          Loading exam questions...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Card sx={{ maxWidth: 600, m: "2rem auto", p: 2 }}>
        <CardContent>
          <Typography color="error" variant="h6" gutterBottom>
            Error Loading Exam
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
              disabled={submitting}
            >
              Retry
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/student-dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!exam || !exam.questions?.length) {
    return (
      <Card sx={{ maxWidth: 600, m: "2rem auto", p: 2 }}>
        <CardContent>
          <Typography color="warning" variant="h6">
            No questions found for this exam.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const question = exam.questions[current];
  const isLastQuestion = current === exam.questions.length - 1;
  const hasAnswer = answers[current] !== "" && 
                   answers[current] !== undefined && 
                   answers[current] !== null;

  /* ------------------------------------------------------------------ */
  /* 5. Main exam UI                                                    */
  /* ------------------------------------------------------------------ */
  return (
    <Card
      className="start-exam-root"
      sx={{ 
        maxWidth: 700, 
        m: "2rem auto", 
        p: 3, 
        backgroundColor: 'white',
        position: 'relative'
      }}
    >
      {/* Loading overlay during submission */}
      {submitting && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          borderRadius: 'inherit'
        }}>
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Submitting your exam...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please don't close this page
          </Typography>
        </div>
      )}

      <CardContent>
        <Typography variant="h5" gutterBottom>
          {exam.exam_title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Type: {exam.type}
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Marks: {exam.questions}
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Timer: {exam.timer}
        </Typography>

        <Timer 
          totalTime={exam.timer || 600}
          onTimeUp={handleTimeUp}
        />

        <Divider sx={{ my: 2 }} />

        {/* Progress indicator */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <Typography variant="body2" color="text.secondary">
            Question {current + 1} of {exam.questions.length}
          </Typography>
          <div style={{
            width: '200px',
            height: '4px',
            backgroundColor: '#e0e0e0',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((current + 1) / exam.questions.length) * 100}%`,
              height: '100%',
              backgroundColor: '#1976d2',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        <Typography variant="h6" gutterBottom>
          {question.question_text}
        </Typography>

        {/* Answer input section */}
        {exam.type === "Subjective" ? (
          <TextField
            multiline
            minRows={4}
            fullWidth
            placeholder="Write your answer here..."
            value={answers[current] || ""}
            onChange={handleTextChange}
            disabled={submitting}
            sx={{ mb: 2 }}
          />
        ) : (
          <RadioGroup
            value={answers[current] ?? ""}
            onChange={handleOptionChange}
            sx={{ ml: 1, mb: 2 }}
          >
            {question.options?.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={i}
                control={<Radio />}
                label={`${String.fromCharCode(65 + i)}. ${opt}`}
                disabled={submitting}
              />
            ))}
          </RadioGroup>
        )}

        {/* Navigation buttons */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: 'center',
          marginTop: 24 
        }}>
          <Button
            variant="outlined"
            onClick={handlePrev}
            disabled={current === 0 || submitting}
          >
            Previous
          </Button>

          <Typography variant="caption" color="text.secondary">
            {hasAnswer ? '✓ Answered' : 'Not answered'}
          </Typography>

          {isLastQuestion ? (
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={!hasAnswer || submitting}
              size="large"
            >
              Submit Exam
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!hasAnswer || submitting}
            >
              Next
            </Button>
          )}
        </div>

        {/* Error display */}
        {error && !submitting && (
          <Typography 
            color="error" 
            variant="body2" 
            sx={{ mt: 2, textAlign: 'center' }}
          >
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StartExam;