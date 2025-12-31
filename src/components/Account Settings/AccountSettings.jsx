//Material UI Imports
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

//Theme Context
import { useTheme } from '../Theme Context/ThemeContext';

//CSS
import './AccountSettings.css';

//Component
const AccountSettings = ({ user, role }) => {
    const { themeMode } = useTheme();

    return (
        <>
            <Typography variant="h4" style={{ margin: '32px 0 16px 0', textAlign: 'center', color: 'white' }}>
                Account Settings
            </Typography>
            <Card className='profile-info-card'
                sx={{
                    background: themeMode === 'dark' ? 'transparent' : '#fff',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.5s ease-in-out',
                        boxShadow: themeMode === 'dark'
                            ? '0 0 90px 10px rgba(86, 157, 228, 0.854)'
                            : '0 0 90px 10px rgba(11, 11, 11, 0.854)',
                    },
                }}
            >
                <Typography className='profile-info-text'
                    sx={{ color: themeMode === 'dark' ? '#fff' : '#333' }}
                >
                    Name: {user?.name || 'John Doe'}
                </Typography>

                <Typography className='profile-info-text'
                    sx={{ color: themeMode === 'dark' ? '#fff' : '#333' }}
                >
                    Email: {user?.email || 'john.doe@example.com'}
                </Typography>

                <Typography className='profile-info-text'
                    sx={{ color: themeMode === 'dark' ? '#fff' : '#333' }}
                >
                    Role: {role || 'Admin'}
                </Typography>
            </Card>
        </>
    )
}

export default AccountSettings;