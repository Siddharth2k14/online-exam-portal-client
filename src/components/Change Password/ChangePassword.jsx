//Regular Imports
import { useState } from 'react';

//Material UI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

//Theme Context
import { useTheme } from '../Theme Context/ThemeContext';

//CSS
import './ChangePassword.css';

//Component
const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
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

    console.log('=== FRONTEND CHANGE PASSWORD DEBUG ===');

    // Client-side validation
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    if (form.currentPassword === form.newPassword) {
      setError("New password must be different from current password!");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token ? 'exists' : 'not found');
      console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'null');

      if (!token) {
        setError("You are not authenticated. Please login again.");
        return;
      }

      // Test token validity by decoding it (just for debugging)
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('Token payload:', payload);
          console.log('Token expires at:', new Date(payload.exp * 1000));
          console.log('Current time:', new Date());
          console.log('Token expired?', payload.exp * 1000 < Date.now());
        }
      } catch (tokenError) {
        console.log('Error parsing token:', tokenError);
      }

      const requestBody = {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      };
      console.log('Request body:', requestBody);

      console.log('Making request to change password...');

      const response = await fetch('https://online-exam-portal-server.onrender.com/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Handle different response types
      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        console.log('Response data:', data);
      } else {
        const text = await response.text();
        console.log('Non-JSON response:', text);
        throw new Error("Server returned unexpected response format");
      }

      if (!response.ok) {
        console.log('Request failed with status:', response.status);
        console.log('Error message:', data.message);
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      // Success
      console.log('Password change successful!');
      setSuccess(true);
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });

      // Optional: Show success message for longer
      setTimeout(() => setSuccess(false), 5000);

      console.log('=== END FRONTEND DEBUG ===');

    } catch (err) {
      console.error('Password change error:', err);
      console.log('Error details:', {
        message: err.message,
        stack: err.stack
      });
      setError(err.message || 'Failed to change password. Please try again.');
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
              : '0 0 90px 10px rgba(11, 11, 11, 0.854)',
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
                  value={form.currentPassword}
                  onChange={handleChange('currentPassword')}
                  className="password-field"
                  sx={{
                    '& label': {
                      color: themeMode === 'dark' ? 'white' : 'white',
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
                  value={form.newPassword}
                  onChange={handleChange('newPassword')}
                  className="password-field"
                  sx={{
                    '& label': {
                      color: themeMode === 'dark' ? 'white' : 'white',
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
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  className="password-field"
                  sx={{
                    '& label': {
                      color: themeMode === 'dark' ? 'white' : 'white',
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