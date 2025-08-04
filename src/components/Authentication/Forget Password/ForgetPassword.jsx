//Regular Imports
import { useState } from 'react'

//Material UI Imports
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

//CSS
import './ForgetPassword.css'

//Component
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