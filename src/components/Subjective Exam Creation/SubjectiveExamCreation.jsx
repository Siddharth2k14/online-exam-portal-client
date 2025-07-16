<<<<<<< HEAD
import { Button, Card, Input, Typography } from '@mui/material'
import React, { useState } from 'react'
import './SubjectiveExamCreation.css'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSubjectiveQuestion } from '../../redux/subjectiveExamSlice';
=======
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addSubjectiveQuestion } from '../../redux/subjectiveExamSlice';
import './SubjectiveExamCreation.css';
>>>>>>> master

const SubjectiveExamCreation = () => {
  const [examTitle, setExamTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const location = useLocation();
  const subjectiveTitleExam = location.state?.titleExam || '';
  const dispatch = useDispatch();
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
          <Card className='exam-title-card'>
            <Input
              type="text"
              placeholder="Enter the question here"
              className='exam-title-input'
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
          </Card>
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
          </div>
        </Card>
      </Card>
    </div>
  )
}

export default SubjectiveExamCreation
