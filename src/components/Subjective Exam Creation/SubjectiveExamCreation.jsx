//Regular Imports
import { useState } from 'react';
import process from 'process';

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
  const [marks, setMarks] = useState('');
  const [timer, setTimer] = useState('');

  const location = useLocation();
  const subjectiveTitleExam = location.state?.titleExam || '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subjectiveQuestions = useSelector(state => state.subjectiveExam.questions);
  const server_url = process.env.REACT_APP_SERVER_URL;

  const handleAddQuestion = async () => {
    // Fixed validation - includes marks check
    if (!subjectiveTitleExam.trim() || !question.trim() || !answer.trim() || !marks.trim()) {
      alert('Please fill all fields.');
      return;
    }

    // Validate marks is a positive number
    const marksNumber = parseInt(marks);
    if (isNaN(marksNumber) || marksNumber <= 0) {
      alert('Please enter a valid positive number for marks.');
      return;
    }

    try {
      // Save to backend
      const response = await fetch(`https://online-exam-portal-client.vercel.app/api/questions/subjective`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam_title: subjectiveTitleExam,
          question,
          answer,
          marks: marksNumber, // Use the validated number
          timer: timer
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add question');
      }

      // Update Redux store
      dispatch(addSubjectiveQuestion({
        exam_title: subjectiveTitleExam,
        question,
        answer,
        marks: marksNumber, // Include marks in Redux too
        timer: timer
      }));

      // Clear all fields
      setExamTitle('');
      setQuestion('');
      setAnswer('');
      setMarks('');
      setTimer('');
      alert('Question added successfully!');

    } catch (error) {
      console.error('Error adding question:', error);
      alert('Error adding question: ' + error.message);
    }
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
                value={marks}
                onChange={e => setMarks(e.target.value)}
                inputProps={{ min: 1 }} // Ensure only positive numbers
              />
            </Card>

            <Card className='exam-title-marks'>
              <Typography className='exam-marks-text' variant='h6'>
                Timer
              </Typography>
              <Input
                type="number"
                placeholder="Enter Timer"
                className='marks-input'
                value={timer}
                onChange={e => setTimer(e.target.value)}
                inputProps={{ min: 1 }} // Ensure only positive numbers
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
              onClick={() => navigate(-1)}
              className="nav-btn"
            >
              Back
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  )
}

export default SubjectiveExamCreation;