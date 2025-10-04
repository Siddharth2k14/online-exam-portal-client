//Material UI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

//CSS
import './ContactMain.css'

//Component
const ContactMain = () => {
  return (
    <Box className="contact-main-outer" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card className="contact-main-card" sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" mb={3}>
          Have a question, suggestion, or want to collaborate?
        </Typography>
        <Box mt={4} textAlign="center">
          <Typography variant="subtitle1" gutterBottom>
            Or email us at: <Link href="mailto:exam.portal.user.2025@gmail.com">exam.portal.user.2025@gmail.com</Link>
          </Typography>
          <Typography variant="subtitle2">
            <Link href="https://github.com/Siddharth2k14" target="_blank" rel="noopener" underline="hover">
              GitHub
            </Link>
            {' | '}
            <Link href="https://www.linkedin.com/in/siddharth-singh-a2a822253/" target="_blank" rel="noopener" underline="hover">
              LinkedIn
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ContactMain;