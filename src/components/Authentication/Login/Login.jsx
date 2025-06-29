import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/authSlice'; // Adjust path as needed
import { FormControl, Card, CardHeader, CardContent, Input, InputLabel, Button, Snackbar, Alert } from '@mui/material';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const Login = ({ name }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);
    const navigate = useNavigate();

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
                await dispatch(login({ email, password, role: name })).unwrap();
                // Redirect or show success as needed
                if (name === 'admin') {
                    navigate('/admin/dashboard');
                } else if (name === 'student') {
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
        <div className='container'>
            <div className='login-card'>
                <Card>
                    <h2 className="login-title">Login for {name}</h2>
                    <CardContent className='login-card-body'>
                        <form onSubmit={handleLogin} className='login-form'>
                            <FormControl>
                                <InputLabel className='email-header'>Enter the Email</InputLabel>
                                <Input
                                    type='email'
                                    placeholder='Email'
                                    className='email-input'
                                    value={email}
                                    onChange={handleEmailChange}
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
                                />
                            </FormControl>
                            <FormControl>
                                <Button className='login-btn' variant='contained' color='primary'
                                    type='submit' disabled={loading}
                                >
                                    Login
                                </Button>
                            </FormControl>
                        </form>
                    </CardContent>

                    {name === 'student' && (
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
                    )}
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