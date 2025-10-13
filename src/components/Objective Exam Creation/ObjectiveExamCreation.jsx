//Regular Imports
import { useState } from 'react';
import process from 'process';

//Material UI Imports
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';

//Redux
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

//CSS
import './ObjectiveExamCreation.css';

//Redux
import { addQuestionToExam } from '../../redux/examSlice';

//Component
const ObjectiveExamCreation = () => {
  const location = useLocation();
  const titleExam = location.state?.titleExam || '';
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState(null); // index of correct answer
  const dispatch = useDispatch();

 const server_url = import.meta.env.VITE_SERVER_URL;

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = async () => {
    if (
      !titleExam.trim() ||
      !question.trim() ||
      options.some(opt => !opt.trim()) ||
      correct === null
    ) {
      alert('Please fill all fields and select the correct answer.');
      return;
    }
    // Save to Redux
    dispatch(addQuestionToExam({
      title: titleExam,
      question: {
        question,
        options,
        correct,
      }
    }));

    // Save to backend
    await fetch(`${server_url}/api/questions/objective`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examTitle: titleExam, // <-- sends exam_name, not examTitle
        question,
        options,
        correct,
      })
    });

    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrect(null);
    alert('Question added!');
  };

  return (
    <div className="objective-exam-container">
      <Card className="objective-exam-card">
        <Typography className="exam-title" variant="h6">
          Create Objective Question for: {titleExam}
        </Typography>
        <Input
          type="text"
          placeholder="Question Statement"
          value={question}
          className="question-input"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />

        <div className="options-container">
          {options.map((opt, idx) => (
            <div key={idx} className="option-row">
              <Radio
                checked={correct === idx}
                onChange={() => setCorrect(idx)}
                value={idx}
                name="correct-answer"
                className="option-radio"
              />
              <Input
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                className="option-input"
                onChange={(e) => {
                  handleOptionChange(idx, e.target.value)
                  // console.log({ idx, value: e.target.value });
                }}
              />
            </div>
          ))}
        </div>
        <div className="button-row">
          <Button className="nav-btn" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ObjectiveExamCreation;