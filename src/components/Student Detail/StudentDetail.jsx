import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import './StudentDetail.css'

const StudentDetail = () => {
  const [examHistory, setExamHistory] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [totalExamsAttempted, setTotalExamsAttempted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const {name, email, phoneNo, role, student_id} = location.state || {};

  useEffect(() => {
    const fetchExamHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the new detailed history endpoint
        const response = await axios.get(
          `https://online-exam-portal-server.onrender.com/api/submissions/student/${student_id}/history`
        );

        console.log("Fetched exam history:", response.data);

        setExamHistory(response.data.examHistory || []);
        setStudentInfo(response.data.student);
        setTotalExamsAttempted(response.data.totalExamsAttempted || 0);
      } catch (err) {
        console.error("Error fetching exam history:", err);
        setError("Failed to load exam history. Please try again.");

        // Fallback to original endpoint if new one fails
        try {
          const fallbackResponse = await axios.get(
            `https://online-exam-portal-server.onrender.com/api/submissions/student/${student_id}`
          );
          setExamHistory(fallbackResponse.data || []);
          setTotalExamsAttempted(fallbackResponse.data?.length || 0);
        } catch (fallbackErr) {
          console.error("Fallback request also failed:", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    if (student_id) {
      fetchExamHistory();
    }
  }, [student_id]);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "";
      case "Pending Review":
        return "";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="student-detail">
      {/* Student Info Header */}
      <Card className="student-info">
        <CardContent>
          <Typography variant="h5" className="student-name">
            {name} ({role})
          </Typography>
          <Box mt={1} className="student-contact">
            <Typography variant="body1" className="student-email">
              Email: {email}
            </Typography>
            <Typography variant="body1" className="student-phone">
              Phone: {phoneNo}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Exam Statistics */}
      <Box mt={2} className="exam-statistics-section">
        <Typography variant="h4" gutterBottom className="section-title">
          Exam Statistics
        </Typography>
        <Card className="exam-statistics-card">
          <CardContent>
            <Grid container spacing={3} className="exam-statistics-grid">
              <Grid item xs={12} md={4} className="stat-item">
                <Typography variant="h6" className="stat-value">
                  {totalExamsAttempted}
                </Typography>
                <Typography variant="body2" className="stat-label">
                  Total Exams Attempted
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} className="stat-item">
                <Typography variant="h6" className="stat-value">
                  {examHistory.filter((exam) => exam.status === "Completed").length}
                </Typography>
                <Typography variant="body2" className="stat-label">
                  Completed
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} className="stat-item">
                <Typography variant="h6" className="stat-value">
                  {
                    examHistory.filter(
                      (exam) => exam.status === "Pending Review"
                    ).length
                  }
                </Typography>
                <Typography variant="body2" className="stat-label">
                  Pending Review
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Exam History */}
      <Box mt={3} className="exam-history-section">
        <Typography variant="h4" gutterBottom className="section-title">
          Exam History
        </Typography>

        {loading ? (
          <Box textAlign="center" p={2} className="loading-state">
            <Typography variant="body2">Loading exam history...</Typography>
          </Box>
        ) : error ? (
          <Box textAlign="center" p={2} className="error-state">
            <Typography color="error">⚠️ {error}</Typography>
          </Box>
        ) : examHistory.length === 0 ? (
          <Box textAlign="center" p={2} className="empty-state">
            <Typography variant="body2">📝 No exams attempted yet.</Typography>
          </Box>
        ) : (
          <Box mt={2} className="exam-list">
            {examHistory.map((exam, index) => (
              <Card key={exam._id || index} className="exam-card">
                <CardContent>
                  <Typography variant="h6" className="exam-title">
                    {exam.examName || exam.exam || "Unknown Exam"}
                  </Typography>
                  <Typography variant="body2" gutterBottom className="exam-date">
                    Attempted on: {formatDate(exam.attemptedAt)}
                  </Typography>
                  <Typography variant="subtitle2" className="exam-status">
                    Status: {exam.status || "Completed"}
                  </Typography>

                  <Grid container spacing={2} mt={1} className="exam-details-grid">
                    <Grid item xs={12} sm={6} md={3} className="exam-detail">
                      <Typography variant="body2" className="detail-label">
                        Total Score
                      </Typography>
                      <Typography variant="h6" className="detail-value">
                        {exam.totalScore || exam.score || 0}
                      </Typography>
                    </Grid>

                    {exam.hasObjective && (
                      <Grid item xs={12} sm={6} md={3} className="exam-detail">
                        <Typography variant="body2" className="detail-label">
                          Objective
                        </Typography>
                        <Typography variant="h6" className="detail-value">
                          {exam.objectiveScore || 0}/{exam.totalObjectiveMarks || 0}
                        </Typography>
                      </Grid>
                    )}

                    {exam.hasSubjective && (
                      <Grid item xs={12} sm={6} md={3} className="exam-detail">
                        <Typography variant="body2" className="detail-label">
                          Subjective
                        </Typography>
                        <Typography variant="h6" className="detail-value">
                          {exam.subjectiveScore || 0}/{exam.totalSubjectiveMarks || 0}
                        </Typography>
                      </Grid>
                    )}

                    <Grid item xs={12} sm={6} md={3} className="exam-detail">
                      <Typography variant="body2" className="detail-label">
                        Total Questions
                      </Typography>
                      <Typography variant="h6" className="detail-value">
                        {exam.totalQuestions || 0}
                      </Typography>
                    </Grid>
                  </Grid>

                  {exam.status === "Pending Review" && (
                    <Box mt={2} className="pending-review">
                      <Typography variant="body2" color="warning.main">
                        ℹ️ This exam contains subjective questions that are awaiting
                        teacher review.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default StudentDetail;