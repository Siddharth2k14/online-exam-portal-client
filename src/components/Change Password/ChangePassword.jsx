import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './ChangePassword.css';
import { useTheme } from '../Theme Context/ThemeContext';

const ChangePassword = () => {
  const [form, setForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { themeMode } = useTheme();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (form.new !== form.confirm) {
      setError("New passwords do not match!");
      return;
    }

    try {
      const response = await fetch('https://online-exam-portal-server.onrender.com/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token from localStorage
        },
        body: JSON.stringify({
          currentPassword: form.current,
          newPassword: form.new
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      setSuccess(true);
      setForm({ current: '', new: '', confirm: '' }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box className="change-password-container">
      <Card className="change-password-card"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.5s ease-in-out',
              boxShadow: themeMode === 'dark'
                ? '0 0 90px 10px rgba(86, 157, 228, 0.854)'
                : 'none',
            },
        }}
      >
        <CardContent>
          <Typography variant="h4" className="change-password-title"
            sx={{
              marginBottom: 3
            }}
          >
            Change Password
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password successfully updated!
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  variant="outlined"
                  value={form.current}
                  onChange={handleChange('current')}
                  className="password-field"
                  sx={{
                    '& label' : {
                      color: themeMode === 'dark' ? 'white' : 'black',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  variant="outlined"
                  value={form.new}
                  onChange={handleChange('new')}
                  className="password-field"
                  sx={{
                    '& label' : {
                      color: themeMode === 'dark' ? 'white' : 'black',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                  value={form.confirm}
                  onChange={handleChange('confirm')}
                  className="password-field"
                  sx={{
                    '& label' : {
                      color: themeMode === 'dark' ? 'white' : 'black',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="submit-button"
                >
                  Update Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChangePassword;