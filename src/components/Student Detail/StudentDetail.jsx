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

        // Get admin token for authentication
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Authentication token not found. Please login again.');
        }

        // Use the new detailed history endpoint with authentication
        const response = await axios.get(
          `https://online-exam-portal-server.onrender.com/api/submissions/student/${student_id}/history`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        console.log("Fetched exam history:", response.data);

        // Set the data from the new API response format
        setExamHistory(response.data.examHistory || []);
        setStudentInfo(response.data.student);
        setTotalExamsAttempted(response.data.totalExamsAttempted || 0);
        
      } catch (err) {
        console.error("Error fetching exam history:", err);
        
        // More specific error handling
        if (err.response?.status === 401) {
          setError("Authentication failed. Please login again.");
        } else if (err.response?.status === 403) {
          setError("Access denied. Admin privileges required.");
        } else if (err.response?.status === 404) {
          setError("Student not found.");
        } else {
          setError(err.response?.data?.message || "Failed to load exam history. Please try again.");
        }

        // Fallback: Try the basic submissions endpoint without authentication
        try {
          const fallbackResponse = await axios.get(
            `https://online-exam-portal-server.onrender.com/api/submissions/student/${student_id}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
          
          // Transform the basic submission data to match expected format
          const transformedHistory = fallbackResponse.data.map(submission => ({
            _id: submission._id,
            examName: submission.exam_title,
            exam: submission.exam_title,
            attemptedAt: submission.submitted_at,
            status: submission.status,
            totalScore: submission.score.total_score,
            score: submission.score.total_score,
            objectiveScore: submission.score.objective_score,
            subjectiveScore: submission.score.subjective_score,
            totalObjectiveMarks: submission.answers.filter(a => a.is_correct !== null).length,
            totalSubjectiveMarks: submission.answers.filter(a => a.is_correct === null).length,
            hasObjective: submission.score.objective_score > 0 || submission.exam_type === 'Objective',
            hasSubjective: submission.score.subjective_score > 0 || submission.exam_type === 'Subjective',
            totalQuestions: submission.total_questions
          }));
          
          setExamHistory(transformedHistory);
          setTotalExamsAttempted(transformedHistory.length);
          setError(null); // Clear the error since fallback worked
          
        } catch (fallbackErr) {
          console.error("Fallback request also failed:", fallbackErr);
          // Keep the original error message
        }
      } finally {
        setLoading(false);
      }
    };

    if (student_id) {
      fetchExamHistory();
    } else {
      setError("Student ID not provided.");
      setLoading(false);
    }
  }, [student_id]);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending Review":
        return "warning";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Calculate average score
  const calculateAverageScore = () => {
    if (examHistory.length === 0) return 0;
    const totalScore = examHistory.reduce((sum, exam) => sum + (exam.totalScore || exam.score || 0), 0);
    return (totalScore / examHistory.length).toFixed(1);
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
            {studentInfo && studentInfo._id && (
              <Typography variant="body2" className="student-id">
                Student ID: {studentInfo._id}
              </Typography>
            )}
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
              <Grid item xs={12} md={3} className="stat-item">
                <Typography variant="h6" className="stat-value">
                  {totalExamsAttempted}
                </Typography>
                <Typography variant="body2" className="stat-label">
                  Total Exams Attempted
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} className="stat-item">
                <Typography variant="h6" className="stat-value">
                  {examHistory.filter((exam) => exam.status === "Completed").length}
                </Typography>
                <Typography variant="body2" className="stat-label">
                  Completed
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} className="stat-item">
                <Typography variant="h6" className="stat-value">
                  {examHistory.filter((exam) => exam.status === "Pending Review").length}
                </Typography>
                <Typography variant="body2" className="stat-label">
                  Pending Review
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} className="stat-item">
                <Typography variant="h6" className="stat-value">
                  {calculateAverageScore()}
                </Typography>
                <Typography variant="body2" className="stat-label">
                  Average Score
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
                    {exam.examName || exam.exam || exam.exam_title || "Unknown Exam"}
                  </Typography>
                  <Typography variant="body2" gutterBottom className="exam-date">
                    Attempted on: {formatDate(exam.attemptedAt || exam.submitted_at)}
                  </Typography>
                  <Typography 
                    variant="subtitle2" 
                    className="exam-status"
                    sx={{ 
                      color: exam.status === "Completed" ? "green" : 
                             exam.status === "Pending Review" ? "orange" : "inherit"
                    }}
                  >
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

                    {(exam.hasObjective || exam.objectiveScore > 0) && (
                      <Grid item xs={12} sm={6} md={3} className="exam-detail">
                        <Typography variant="body2" className="detail-label">
                          Objective
                        </Typography>
                        <Typography variant="h6" className="detail-value">
                          {exam.objectiveScore || 0}/{exam.totalObjectiveMarks || 0}
                        </Typography>
                      </Grid>
                    )}

                    {(exam.hasSubjective || exam.subjectiveScore > 0) && (
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
                      <Typography variant="body2" sx={{ color: 'orange' }}>
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