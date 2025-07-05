import {
  Card,
  Typography,
  CardContent,
  Divider,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./StartExam.css";

// Utility: check if two answers are similar by keywords
function areAnswersSimilar(studentAns, correctAns) {
  if (!studentAns || !correctAns) return false;
  // Lowercase, remove punctuation, split into words
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
  const [submitted, setSubmitted] = useState(false); // remains true only briefly

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
  /* 3. Submit → score → navigate to review                             */
  /* ------------------------------------------------------------------ */
  const handleSubmit = () => {
    setSubmitted(true);

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

    /* 👉  jump to review page  */
    navigate(
      `/exam/${encodeURIComponent(examTitle)}/review`,
      {
        state: {
          exam,
          answers,
          score: correct,
          totalQuestions: exam.questions.length,
        },
      }
    );
  };

  /* ------------------------------------------------------------------ */
  /* 4. Render states (loading / error / exam)                          */
  /* ------------------------------------------------------------------ */
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <CircularProgress />
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
      sx={{ maxWidth: 700, m: "2rem auto", p: 3 }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {exam.exam_title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Type:&nbsp;{exam.type}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Q{current + 1}.&nbsp;{question.question_text}
        </Typography>

        {exam.type === "Subjective" ? (
          <TextField
            multiline
            minRows={3}
            fullWidth
            placeholder="Write your answer here..."
            value={answers[current]}
            onChange={handleTextChange}
            disabled={submitted}
          />
        ) : (
          <RadioGroup
            value={answers[current]}
            onChange={handleOptionChange}
            sx={{ ml: 1 }}
          >
            {question.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={i}
                control={<Radio />}
                label={`${String.fromCharCode(65 + i)}. ${opt}`}
                disabled={submitted}
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
            disabled={current === 0 || submitted}
          >
            Prev
          </Button>

          {current < exam.questions.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={submitted || answers[current] === "" || answers[current] === undefined}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={submitted || answers[current] === "" || answers[current] === undefined}
            >
              Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StartExam;