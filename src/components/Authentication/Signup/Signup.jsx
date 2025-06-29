import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../redux/authSlice'; // Adjust path as needed
import { FormControl, Card, CardHeader, CardContent, Input, InputLabel, Button, Snackbar, Alert } from '@mui/material';
import './Signup.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

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
                await dispatch(signup({ name, email, password, confirmPassword })).unwrap();
                window.location.href = '/student/login'; // Or use navigate if using react-router
            } catch (err) {
                setErrors({ api: err || 'Signup failed' });
                setOpenSnackbar(true);
            }
        } else {
            setOpenSnackbar(true);
        }
    };

    return (
        <div className='container'>
            <div className='signup-card'>
                <Card>
                    <h2 className="signup-title">Signup</h2>
                    <CardContent className='signup-card-body'>
                        <form onSubmit={handleSubmit} className='signup-form'>
                            <FormControl>
                                <InputLabel className='name-header'>Enter the Name</InputLabel>
                                <Input
                                    type='text'
                                    placeholder='Name'
                                    className='name-input'
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </FormControl>
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
                                <InputLabel className='confirm-password-header'>Confirm the Password</InputLabel>
                                <Input
                                    type='password'
                                    placeholder='Confirm Password'
                                    className='confirm-password-input'
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </FormControl>
                            <FormControl>
                                <Button className='signup-btn' variant='contained' color='primary'
                                    type='submit'
                                    disabled={loading || !name || !email || !password || !confirmPassword}
                                >
                                    Signup
                                </Button>
                            </FormControl>
                        </form>
                    </CardContent>
                    <CardHeader
                        className='signup-card-footer'
                        title="Already have an account?"
                        action={
                            <Button
                                variant='text'
                                color='primary'
                                href='/student/login'
                            >
                                Log In
                            </Button>
                        }
                    />
                </Card>
            </div>
            <Snackbar open={openSnackbar || !!error} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errors.api || error || "Please fill all required fields correctly!"}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Signup;