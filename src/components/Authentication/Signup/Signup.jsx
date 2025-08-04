//Regular Imports
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

//Material UI Imports
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  CardHeader,
  CardContent,
  Card,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';

//CSS
import './Signup.css';

//Redux
import { signup } from '../../../redux/authSlice';

//Component
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (loading) {
      setTimer(0);
      interval = setInterval(() => {
        setTimer((prev) => (prev + 1))
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [loading]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);

        // Backend will determine role from email domain
        const result = await dispatch(signup({ name, email, password, confirmPassword })).unwrap();
        console.log('Signup successful, role assigned:', result.role);
        // Navigate to login without role parameter
        navigate('/login');
      } catch (err) {
        setErrors({ api: err || 'Signup failed' });
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    } else {
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading === true) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(195deg, #0f2027, #2c5364)'
      }}>
        <CircularProgress size={60} style={{ color: 'white', marginBottom: '20px' }} />
        <h2 style={{ color: 'white', margin: 0 }}>Signing Up ...</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: '10px 0 0 0' }}>
          Please wait ({timer}s)
        </p>
      </div>
    )
  }

  return (
    <div
      className='container'
      style={{ background: 'linear-gradient(195deg, #0f2027, #2c5364)' }}
    >
      <div className='signup-card'>
        <Card>
          <div>
            <h2 className="signup-title">Signup</h2>
          </div>
          <CardContent className='signup-card-body'>
            <form onSubmit={handleSubmit} className='signup-form'>
              <FormControl>
                <InputLabel className='name-header'>Enter the Name</InputLabel>
                <Input
                  type='text'
                  placeholder='Name'
                  className='name-input'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  sx={{ background: 'rgba(255, 255, 255, 0.1)' }}
                />
              </FormControl>
              <FormControl>
                <InputLabel className='email-header'>Enter the Email</InputLabel>
                <Input
                  type='email'
                  placeholder='Email'
                  className='email-input'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  sx={{ background: 'rgba(255, 255, 255, 0.1)' }}
                />
              </FormControl>
              <FormControl>
                <InputLabel className='password-header'>Enter the Password</InputLabel>
                <Input
                  type='password'
                  placeholder='Password'
                  className='password-input'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  sx={{ background: 'rgba(255, 255, 255, 0.1)' }}
                />
              </FormControl>
              <FormControl>
                <InputLabel className='confirm-password-header'>Confirm the Password</InputLabel>
                <Input
                  type='password'
                  placeholder='Confirm Password'
                  className='confirm-password-input'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  sx={{ background: 'rgba(255, 255, 255, 0.1)' }}
                />
              </FormControl>
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Button
                  className='signup-btn'
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={loading || !name || !email || !password || !confirmPassword}
                >
                  {loading ? 'Signing up...' : 'Signup'}
                </Button>

                <Button
                  onClick={handleBack}
                  variant='contained'
                  color='primary'
                  style={{ marginRight: '16px' }}
                >
                  Back
                </Button>
              </FormControl>
            </form>
          </CardContent>

          <CardHeader
            className='signup-card-footer'
            title="Already have an account?"
            action={
              <Button
                component={Link}
                to='/'
                variant='text'
                color='primary'
              >
                Log In
              </Button>
            }
          />
        </Card>
      </div>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errors.api || error || "Please fill all required fields correctly!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;