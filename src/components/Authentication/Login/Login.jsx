import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from '../../../redux/authSlice'; // Adjust path as needed
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = (role) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);
    const navigate = useNavigate();
    // const { role } = useParams();

    const handleBack = () => {
        navigate('/');
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await dispatch(login({ email, password, role })).unwrap();
                // Redirect or show success as needed
                if (role === 'admin') {
                    navigate('/admin/dashboard');
                } else if (role === 'student') {
                    navigate('/student/dashboard');
                }
            } catch (err) {
                setErrors({ api: err?.message || err?.toString() || 'Invalid credentials' });
                setOpenSnackbar(true);
            }
        } else {
            setOpenSnackbar(true);
        }
    };

    return (
        <div
            className='container'
            style={{
                background: 'linear-gradient(195deg, #0f2027, #2c5364)',
            }}
        >
            <div className='login-card'>
                <Card>
                    <div>
                        <h2 className="login-title">Login for {role}</h2>
                    </div>
                    <CardContent className='login-card-body'>
                        <form
                            onSubmit={handleLogin} className='login-form'>
                            <FormControl>
                                <InputLabel className='email-header'>Enter the Email</InputLabel>
                                <Input
                                    type='email'
                                    placeholder='Email'
                                    className='email-input'
                                    value={email}
                                    onChange={handleEmailChange}
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.1)'
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel className='password-header'>Enter the Password</InputLabel>
                                <Input
                                    type='password'
                                    placeholder='Password'
                                    className='password-input'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.1)'
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                <Button className='login-btn' variant='contained' color='primary'
                                    type='submit' disabled={loading}
                                >
                                    Login
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
                    <div>
                        <CardHeader
                            className='login-card-footer'
                            title="Don't have an account?"
                            action={
                                <Button
                                    variant='text'
                                    color='primary'
                                    href='/signup'
                                >
                                    Sign Up
                                </Button>
                            }
                        />
                        <CardHeader
                            className='login-card-footer'
                            title="Forgot Password?"
                            action={
                                <Button
                                    variant='text'
                                    color='primary'
                                    href='/forgetPassword'
                                >
                                    Reset Password
                                </Button>
                            }
                        />
                    </div>
                </Card>
            </div>
            <Snackbar open={openSnackbar || !!error} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {(errors.api && errors.api.toString()) ||
                        (error && error.toString()) ||
                        "Please fill all required fields correctly!"}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;