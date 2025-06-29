import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Typography, CardContent, Divider, Button, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";

const LOCAL_STORAGE_KEY = "studentExamHistory";

const ViewExam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { exam, answers, score, totalQuestions } = location.state || {};

  const [history, setHistory] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);

  // Helper to load history from localStorage
  const loadHistory = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  };

  // Save current exam to localStorage if present in navigation state
  useEffect(() => {
    if (exam && answers && score !== undefined && totalQuestions !== undefined) {
      let history = loadHistory();
      // Avoid duplicate (by exam title and answers)
      const alreadyExists = history.some(
        (e) =>
          e.exam.exam_title === exam.exam_title &&
          JSON.stringify(e.answers) === JSON.stringify(answers)
      );
      if (!alreadyExists) {
        history.push({
          exam,
          answers,
          score,
          totalQuestions,
          date: new Date().toISOString(),
        });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
      }
      setHistory(history);
      setSelectedExam({ exam, answers, score, totalQuestions });
    } else {
      // If no navigation state, just load history
      const hist = loadHistory();
      setHistory(hist);
      if (hist.length > 0) {
        // Show the most recent by default
        const last = hist[hist.length - 1];
        setSelectedExam({
          exam: last.exam,
          answers: last.answers,
          score: last.score,
          totalQuestions: last.totalQuestions,
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  // Handler for selecting an exam from history
  const handleSelectExam = (idx) => {
    const item = history[idx];
    setSelectedExam({
      exam: item.exam,
      answers: item.answers,
      score: item.score,
      totalQuestions: item.totalQuestions,
    });
  };

  if (!selectedExam || !selectedExam.exam || !selectedExam.answers) {
    return (
      <Card sx={{ maxWidth: 600, m: "2rem auto", p: 2 }}>
        <CardContent>
          <Typography color="error" variant="h6">
            No exam data to review. Please take an exam first.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/student/dashboard")}>Go to Dashboard</Button>
        </CardContent>
      </Card>
    );
  }

  const { exam: selExam, answers: selAnswers, score: selScore, totalQuestions: selTotal } = selectedExam;

  return (
    <Card sx={{ maxWidth: 900, m: "2rem auto", p: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
          {/* Exam History List */}
          <Box sx={{ minWidth: 250, maxWidth: 300 }}>
            <Typography variant="h6" gutterBottom>Exam History</Typography>
            <List dense>
              {history.length === 0 && (
                <ListItem><ListItemText primary="No exams taken yet." /></ListItem>
              )}
              {history.map((item, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton
                    selected={
                      selExam.exam_title === item.exam.exam_title &&
                      JSON.stringify(selAnswers) === JSON.stringify(item.answers)
                    }
                    onClick={() => handleSelectExam(idx)}
                  >
                    <ListItemText
                      primary={item.exam.exam_title}
                      secondary={`Score: ${item.score}/${item.totalQuestions} | ${new Date(item.date).toLocaleString()}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Exam Review Section */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {selExam.exam_title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Type: {selExam.type}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Score: {selScore} / {selTotal}
            </Typography>
            <Divider sx={{ my: 2 }} />

            {selExam.questions.map((q, idx) => (
              <div key={idx} style={{ marginBottom: 24 }}>
                <Typography variant="subtitle1">
                  Q{idx + 1}. {q.question_text}
                </Typography>
                {selExam.type === "Objective" ? (
                  <div>
                    {q.options.map((opt, i) => {
                      const isSelected = selAnswers[idx] === i;
                      const isCorrect = q.correct_option === i;
                      return (
                        <div
                          key={i}
                          style={{
                            padding: "4px 0",
                            fontWeight: isSelected ? "bold" : "normal",
                            color: isCorrect
                              ? "green"
                              : isSelected && !isCorrect
                              ? "red"
                              : "inherit",
                          }}
                        >
                          {String.fromCharCode(65 + i)}. {opt}
                          {isSelected && " (Your answer)"}
                          {isCorrect && " (Correct answer)"}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <Typography>
                      <strong>Your answer:</strong> {selAnswers[idx]}
                    </Typography>
                    <Typography>
                      <strong>Correct answer:</strong> {q.answer}
                    </Typography>
                  </div>
                )}
                <Divider sx={{ my: 1 }} />
              </div>
            ))}
            <Button variant="contained" onClick={() => navigate("/student/dashboard")}>Back to Dashboard</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ViewExam;