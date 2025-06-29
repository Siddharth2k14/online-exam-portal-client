import { Card, Typography } from '@mui/material';
import React from 'react'
import './AccountSettings.css';

const AccountSettings = () => {
    return (
        <>
            <Typography variant="h4" style={{ margin: '32px 0 16px 0', textAlign: 'center' }}>
                Account Settings
            </Typography>

            <Card className='account-settings-container'>
                <Card className='profile-info-card'>
                    <Typography variant='h5' className='profile-info-title'>
                        Profile Information
                    </Typography>
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
            </Card>
        </>
    )
}

export default AccountSettings;
