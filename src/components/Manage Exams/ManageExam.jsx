import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ViewExam from './ViewExam';

const ManageExam = () => {
  const [exams, setExams] = useState([]);
  const [viewExamTitle, setViewExamTitle] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch('https://online-exam-portal-server.onrender.com/api/questions/all');
      const data = await response.json();
      if (data.exams) {
        setExams(data.exams);
      } else {
        setExams([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setExams([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = (exam_title) => {
    navigate(`/manage-exams/${encodeURIComponent(exam_title)}`);
  };

  const handleDelete = async (exam_title) => {
    try {
      await fetch(`https://online-exam-portal-server.onrender.com/api/questions/objective/${exam_title}`, { method: 'DELETE' });
      await fetch(`https://online-exam-portal-server.onrender.com/api/questions/subjective/${exam_title}`, { method: 'DELETE' });
      setExams((prev) => prev.filter((exam) => exam.exam_title !== exam_title));
    } catch (error) {
      alert('Error deleting exam');
    }
  };

  return (
    <div>
      <Typography variant="h4" style={{ margin: '32px 0 16px 0', textAlign: 'center' }}>
        Manage Exams
      </Typography>
      {viewExamTitle ? (
        <ViewExam exam_title={viewExamTitle} onClose={() => setViewExamTitle(null)} />
      ) : (
        <div className="exam-cards-container">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <Card key={exam.exam_title} style={{ margin: 16, padding: 16 }}>
                <Typography variant="h6">{exam.exam_title}</Typography>
                <Typography variant="body2" style={{ margin: '8px 0' }}>
                  {exam.questions.length} Questions
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: 8 }}>
                  Type: {exam.type}
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleView(exam.exam_title)}
                    style={{ marginRight: 8 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(exam.exam_title)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              No exams available.
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageExam;
