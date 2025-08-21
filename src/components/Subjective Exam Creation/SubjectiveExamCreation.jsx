//Regular Imports
import { useState } from 'react';

//Material UI Imports
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//CSS
import './SubjectiveExamCreation.css';

//Redux
import { addSubjectiveQuestion } from '../../redux/subjectiveExamSlice';

//Router
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const SubjectiveExamCreation = () => {
  const [examTitle, setExamTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const location = useLocation();
  const subjectiveTitleExam = location.state?.titleExam || '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subjectiveQuestions = useSelector(state => state.subjectiveExam.questions);

  const handleAddQuestion = async () => {
    if (!subjectiveTitleExam.trim() || !question.trim() || !answer.trim()) {
      alert('Please fill all fields.');
      return;
    }

    // Save to backend
    await fetch('https://online-exam-portal-server.onrender.com/api/questions/subjective', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        exam_title: subjectiveTitleExam, // <-- sends exam_name, not exam_title
        question,
        answer,
      })
    });

    dispatch(addSubjectiveQuestion({
      exam_title: subjectiveTitleExam,
      question,
      answer,
    }));

    setExamTitle('');
    setQuestion('');
    setAnswer('');
    alert('Question added!');

  };

  return (
    <div>
      <Card className='subjective-exam-creation'>
        <Typography className='exam-title' variant='h6'>
          Create Subjective Exam for: {subjectiveTitleExam || 'New Exam'}
        </Typography>
        <Card className='exam-details'>
          <Box style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '10px',
            paddingTop: '20px',
            width: '95%',
            marginBottom: '30px',
          }}>
            <Card className='exam-title-card'>
              <Typography className='exam-title-text' variant='h6'>
                Question title
              </Typography>
              <Input
                type="text"
                placeholder="Enter the question here"
                className='exam-title-input'
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
            </Card>

            <Card className='exam-title-marks'>
              <Typography className='exam-marks-text' variant='h6'>
                Marks
              </Typography>
              <Input
                type="number"
                placeholder="Enter marks"
                className='marks-input'
              />
            </Card>
          </Box>
          <Card className='exam-question-card'>
            <Typography className='exam-answer-text' variant='h6'>
              Answer
            </Typography>
            <Input
              type="text"
              placeholder="Enter the answer"
              multiline
              rows={4}
              className='exam-answer-input'
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
          </Card>
          <div className="button-row">
            <Button className="nav-btn" onClick={handleAddQuestion}>
              Add Question
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              className="view-exam-back-btn"
            >
              Back
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  )
}

export default SubjectiveExamCreation
