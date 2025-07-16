<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Card, Typography } from '@mui/material';
import React from 'react'
import './AccountSettings.css';

const AccountSettings = () => {
    return (
        <>
            <Typography variant="h4" style={{ margin: '32px 0 16px 0', textAlign: 'center' }}>
=======
>>>>>>> master
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './AccountSettings.css';

const AccountSettings = ({ user, role }) => {
    return (
        <>
            <Typography variant="h4" style={{ margin: '32px 0 16px 0', textAlign: 'center', color: 'white' }}>
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> master
                Account Settings
            </Typography>

            <Card className='account-settings-container'>
                <Card className='profile-info-card'>
                    <Typography variant='h5' className='profile-info-title'>
                        Profile Information
                    </Typography>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                    <Typography className='profile-info-text'>
                        Name: John Doe
                    </Typography>
                    <Typography className='profile-info-text'>
                        Email: john.doe@example.com
                    </Typography>
                    <Typography className='profile-info-text'>
                        Role: Admin
                    </Typography>
                </Card>
                <Card className='change-password-card'>
                    {/* <ChangePassword /> */}
                    {/* Place for Change Password Component */}
                </Card>
=======
>>>>>>> master

                    <Typography className='profile-info-text'>
                        Name: {user?.name || 'John Doe'}
                    </Typography>

                    <Typography className='profile-info-text'>
                        Email: {user?.email || 'john.doe@example.com'}
                    </Typography>

                    <Typography className='profile-info-text'>
                        Role: {role || 'Admin'}
                    </Typography>
                </Card>
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> master
            </Card>
        </>
    )
}

export default AccountSettings;
