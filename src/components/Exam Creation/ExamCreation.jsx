//Regular Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Material UI Imports
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

//Theme Context
import { useTheme } from '../Theme Context/ThemeContext';

//CSS
import './ExamCreation.css';

//Redux
import { useDispatch } from 'react-redux';
import { addExam } from '../../redux/examSlice';

//Component
const ExamCreation = () => {
  const [titleExam, setTitleExam] = useState('');
  const [open, setOpen] = useState(false);
  const [examType, setExamType] = useState('objective');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themeMode } = useTheme();

  const handleCreateExam = async () => {
    if (!titleExam.trim() || !examType) {
      setError('Please fill all fields.');
      setOpen(true);
      return;
    }
    setError('');
    setOpen(true);
    dispatch(addExam({ title: titleExam, type: examType }));

    if (examType === 'objective') {
      navigate('/exam-creation/objective', { state: { titleExam } });
    } else if (examType === 'subjective') {
      navigate('/exam-creation/subjective', { state: { titleExam } });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      <Typography
        variant='h6'
        gutterBottom
        sx={{
          margin: '32px 0 16px 0',
          textAlign: 'center',
          color: 'white'
        }}
      >
        Exam Creation
      </Typography>

      <Card className='exam-creation-card'
        sx={{
          background: 'transparent',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.5s ease-in-out',
            boxShadow: themeMode === 'dark'
              ? '0 0 90px 10px rgba(86, 157, 228, 0.854)'
              : '0 0 90px 10px rgba(11, 11, 11, 0.854)',
          }
        }}
      >
        <Input
          type='text'
          placeholder='Enter the title of the exam'
          value={titleExam}
          onChange={(e) => setTitleExam(e.target.value)}
          className='title-input'
          sx={{
            border: themeMode === 'dark' ? '1px solid #fff' : '1px solid black',
            color: 'white',
            '&:hover': {
              border: themeMode === 'dark' ? '3px solid #FAF9F6' : '3px solid black',
            },
          }}
        />

        <FormControl className='form-type'>
          <FormLabel className='form-type-label' sx={{
            color: 'white'
          }}>Type of Exam</FormLabel>
          <RadioGroup
            defaultValue="objective"
            onChange={(e) => setExamType(e.target.value)}
          >
            <FormControlLabel
              value="objective"
              control={<Radio />}
              label="Objective"
              className='form-type-radio'
              sx={{
                color: 'white'
              }}
            />
            <FormControlLabel
              value="subjective"
              control={<Radio />}
              label="Subjective"
              className='form-type-radio'
              sx={{
                color: 'white'
              }}
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            '&:hover': {
              bgcolor: '#0062cc',
            }
          }}
          onClick={handleCreateExam}
        >
          Create Exam
        </Button>
      </Card >

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Exam for {titleExam} subject of {examType} type questions is Created
        </Alert>
      </Snackbar>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
          {error
            ? error
            : `Exam for ${titleExam} subject of ${examType} type questions is Created`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ExamCreation;