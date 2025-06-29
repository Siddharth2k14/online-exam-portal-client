import React, { useState } from 'react'
import { FormControl, Card, CardHeader, CardContent, Input, InputLabel, Button } from '@mui/material';
import './ForgetPassword.css'
import { Snackbar, Alert } from '@mui/material';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const validateForm = () => {
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Enter a valid email';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log('Password reset link sent to:', email);
        } else {
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 3000);
            return;
        }
    };

    return (
        <div className='container'>
            <div className='forget-password-card'>
                <Card>
                    <h2 className="forget-password-title">Forgot Password</h2>
                    <CardContent className='forget-password-card-body'>
                        <form
                            onSubmit={handleSubmit}
                            className='forget-password-form'
                        >
                            <FormControl>
                                <InputLabel className='email-header'>Enter your Email</InputLabel>
                                <Input
                                    type='text'
                                    placeholder='Email'
                                    className='email-input'
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </FormControl>
                            <FormControl>
                                <Button className='reset-btn' variant='contained' color='primary'
                                    onClick={handleSubmit}
                                >
                                    Send Reset Link
                                </Button>
                            </FormControl>
                        </form>
                    </CardContent>
                    <CardHeader
                        className='forget-password-card-footer'
                        title="Remembered your password?"
                        action={
                            <Button
                                variant='text'
                                color='primary'
                                href='/student/login'
                            >
                                Log In
                            </Button>
                        }
                    >
                    </CardHeader>
                </Card>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Please enter a valid email address!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ForgetPassword
