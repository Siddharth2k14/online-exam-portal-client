import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card' // Added missing import
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import React, { useEffect, useState } from 'react'
import axios from "axios";

import './AdminList.css'; // Import CSS file

const AdminList = () => {
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD
=======
 const server_url = import.meta.env.VITE_SERVER_URL;
>>>>>>> testing

  const fetchAdmin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get("https://online-exam-portal-server.onrender.com/api/auth/admin/all");
      console.log('API Response:', response.data);
      
      // Handle different possible response structures
      if (response.data.admins) {
        // If backend returns { admins: [...] }
        setAdminData(response.data.admins);
      } else if (response.data.students) {
        // If backend has the bug and returns { students: [...] } for admins
        setAdminData(response.data.students);
      } else if (response.data.data) {
        // If backend returns { data: [...] }
        setAdminData(response.data.data);
      } else if (Array.isArray(response.data)) {
        // If backend returns [...] directly
        setAdminData(response.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error('Error fetching admins:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch admins');
      setAdminData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdmin();
  }, []);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress size={60} className="loading-spinner" />
        <Typography variant="h6" className="loading-text">
          Loading admins...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Typography variant='h4' className="page-title" gutterBottom>
          Admin List
        </Typography>
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
        <button 
          onClick={fetchAdmin}
          className="retry-button"
        >
          Try Again
        </button>
      </Box>
    );
  }

  return (
    <Box className="admin-list-container">
      <Typography variant='h4' className="page-title" gutterBottom>
        Admin Information List
      </Typography>
      
      {adminData.length === 0 ? (
        <Typography variant="h6" className="no-admins-text">
          No admins found.
        </Typography>
      ) : (
        <Box className="admins-wrapper">
          <Typography variant="body1" className="admin-count" gutterBottom>
            Total Admins: {adminData.length}
          </Typography>
          
          {adminData.map((admin) => (
            <Card 
              key={admin._id} 
              className="admin-card"
            >
              <CardContent className="admin-card-content">
                <Typography variant="h6" className="admin-name" gutterBottom>
                  {admin.name}
                </Typography>
                <Typography variant="body2" className="admin-detail">
                  Email: {admin.email}
                </Typography>
                <Typography variant="body2" className="admin-detail">
                  Phone Number: {admin.phoneNumber || admin.phoneNo || 'Not provided'}
                </Typography>
                <Typography variant="body2" className="admin-detail">
                  Role: {admin.role}
                </Typography>
                {admin.createdAt && (
                  <Typography variant="body2" className="admin-detail">
                    Created At: {new Date(admin.createdAt).toLocaleString()}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default AdminList;