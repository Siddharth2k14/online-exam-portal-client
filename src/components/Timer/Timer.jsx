import { useEffect, useState } from "react";
import { Typography, LinearProgress } from "@mui/material";

export const Timer = ({ totalTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Persist timer if page reloads
    const saved = localStorage.getItem("exam_time_left");
    return saved ? parseInt(saved) : totalTime;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem("exam_time_left");
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("exam_time_left", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percent = (timeLeft / totalTime) * 100;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Typography variant="subtitle1" color="text.secondary">
        Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{ height: 6, borderRadius: 3 }}
      />
    </div>
  );
};