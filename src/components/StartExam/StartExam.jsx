//Regular Imports
import { useEffect, useState } from 'react';

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

//Component
function areAnswersSimilar(studentAns, correctAns) {
  if (!studentAns || !correctAns) return false;
  const clean = (str) =>
    str
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\\-_`~()]/g, "")
      .split(/\s+/)
      .filter(Boolean);

  const studentWords = new Set(clean(studentAns));
  const correctWords = new Set(clean(correctAns));

  // Count how many correct words are in the student's answer
  let matchCount = 0;
  correctWords.forEach((word) => {
    if (studentWords.has(word)) matchCount++;
  });

  // Consider it correct if, say, 70% of the correct words are present
  return matchCount / correctWords.size >= 0.7;
}

const StartExam = () => {
  const { examTitle } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ------------------------------------------------------------------ */
  /* 1. Fetch questions (objective → fallback to subjective)            */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");

      try {
        // ① Try objective first
        let res = await fetch(
          `https://online-exam-portal-server.onrender.com/api/questions/objective/${encodeURIComponent(
            examTitle
          )}`
        );

        if (res.ok) {
          const data = await res.json();
          setExam({
            exam_title: examTitle,
            type: "Objective",
            questions: data.questions.map((q) => ({
              question_text: q.question_title,
              options: q.options,
              correct_option: q.correct_option,
            })),
          });
          setAnswers(Array(data.questions.length).fill(""));
        } else {
          // ② Fallback to subjective
          res = await fetch(
            `https://online-exam-portal-server.onrender.com/api/questions/subjective/${encodeURIComponent(
              examTitle
            )}`
          );
          if (res.ok) {
            const data = await res.json();
            setExam({
              exam_title: examTitle,
              type: "Subjective",
              questions: data.questions.map((q) => ({
                question_text: q.question,
                answer: q.answer,
              })),
            });
            setAnswers(Array(data.questions.length).fill(""));
          } else {
            setError(
              `No exam data found for "${examTitle}". Please start the exam from the exams list.`
            );
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch questions. Please try again later.");
      }

      setLoading(false);
    };

    fetchQuestions();
  }, [examTitle]);

  /* ------------------------------------------------------------------ */
  /* 2. Handlers                                                        */
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
  const handleNext = () =>
    setCurrent((p) => Math.min(p + 1, exam.questions.length - 1));

  /* ------------------------------------------------------------------ */
  /* 3. Submit → save to database → navigate to review                  */
  /* ------------------------------------------------------------------ */
  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      // Calculate local score for immediate feedback
      let correct = 0;
      if (exam.type === "Objective") {
        exam.questions.forEach((q, idx) => {
          if (
            (typeof q.correct_option === "number" &&
              answers[idx] === q.correct_option) ||
            (typeof q.correct_option === "string" &&
              q.options[answers[idx]] === q.correct_option)
          ) {
            correct++;
          }
        });
      } else {
        exam.questions.forEach((q, idx) => {
          const userAns = answers[idx]?.trim().toLowerCase();
          const correctAns = q.answer?.trim().toLowerCase();
          if (areAnswersSimilar(userAns, correctAns)) correct++;
        });
      }

      // Submit to backend
      const response = await fetch('https://online-exam-portal-server.onrender.com/api/submissions/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          examTitle: exam.exam_title,
          examType: exam.type,
          answers: answers,
          questions: exam.questions
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit exam');
      }

      const submissionData = await response.json();
      console.log('Exam submitted successfully:', submissionData);

      // Navigate to review page with submission data
      navigate(
        `/exam/${encodeURIComponent(examTitle)}/review`,
        {
          state: {
            exam,
            answers,
            score: correct,
            totalQuestions: exam.questions.length,
            submissionId: submissionData.submission.id,
            submissionStatus: submissionData.submission.status
          },
        }
      );

    } catch (error) {
      console.error('Error submitting exam:', error);
      setError(`Failed to submit exam: ${error.message}`);
      setSubmitting(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* 4. Render states (loading / error / exam)                          */
  /* ------------------------------------------------------------------ */
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading exam questions...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Card sx={{ maxWidth: 600, m: "2rem auto", p: 2 }}>
        <CardContent>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          {!submitting && (
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()} 
              sx={{ mt: 2 }}
            >
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!exam) return null;

  const question = exam.questions[current];

  /* ------------------------------------------------------------------ */
  /* 5. Main exam UI                                                    */
  /* ------------------------------------------------------------------ */
  return (
    <Card
      className="start-exam-root"
      style={{ maxWidth: 700, m: "2rem auto", p: 3, backgroundColor: 'white' }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{
          background: 'white',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.5s ease-in-out',
            boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)",
            fontSize: '2.3em',
          },
        }}>
          {exam.exam_title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{
          background: 'white',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.5s ease-in-out',
            boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)",
            fontSize: '1.3em',
          },
        }}>
          Type:&nbsp;{exam.type}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom sx={{
          background: 'white',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.5s ease-in-out',
            boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)",
            fontSize: '1.3em',
          },
        }}>
          Q{current + 1}.&nbsp;{question.question_text}
        </Typography>

        {/* Progress indicator */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Question {current + 1} of {exam.questions.length}
        </Typography>

        {exam.type === "Subjective" ? (
          <TextField
            multiline
            minRows={3}
            fullWidth
            placeholder="Write your answer here..."
            value={answers[current] || ""}
            onChange={handleTextChange}
            disabled={submitted || submitting}
            sx={{
              '& :hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.5s ease-in-out',
                boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)",
                fontSize: '1.3em',
              },
            }}
          />
        ) : (
          <RadioGroup
            value={answers[current] ?? ""}
            onChange={handleOptionChange}
            sx={{
              ml: 1,
              '& :hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.5s ease-in-out',
                boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)",
                fontSize: '1.3em',
              },
            }}
          >
            {question.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={i}
                control={<Radio />}
                label={`${String.fromCharCode(65 + i)}. ${opt}`}
                disabled={submitted || submitting}
              />
            ))}
          </RadioGroup>
        )}

        <div
          style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}
        >
          <Button
            variant="contained"
            onClick={handlePrev}
            disabled={current === 0 || submitted || submitting}
          >
            Prev
          </Button>

          {current < exam.questions.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                submitted || 
                submitting || 
                answers[current] === "" || 
                answers[current] === undefined ||
                answers[current] === null
              }
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={
                submitted || 
                submitting || 
                answers[current] === "" || 
                answers[current] === undefined ||
                answers[current] === null
              }
            >
              {submitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </div>

        {/* Show submission status */}
        {submitting && (
          <Typography variant="body2" color="primary" sx={{ mt: 2, textAlign: 'center' }}>
            Submitting your exam... Please wait.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StartExam;