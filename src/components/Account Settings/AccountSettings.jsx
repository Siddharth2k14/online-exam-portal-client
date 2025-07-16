import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './AccountSettings.css';

const AccountSettings = ({ user, role }) => {
    return (
        <>
            <Typography variant="h4" style={{ margin: '32px 0 16px 0', textAlign: 'center', color: 'white' }}>
                Account Settings
            </Typography>

            <Card className='account-settings-container'>
                <Card className='profile-info-card'>
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
            </Card>
        </>
    )
}

export default AccountSettings;