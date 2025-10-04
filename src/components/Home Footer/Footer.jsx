//Regular Imports
import {Link} from 'react-router-dom';

//Material UI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//CSS
import './Footer.css';

//Component
const Footer = () => (
    <Box className="footer-container">
        <Box className="footer-row">
            {/* Left: Navigation Links */}
            <Box className="footer-left">
                <Typography className="footer-title" variant="h6">NAVIGATION LINKS</Typography>
                <Typography className="footer-link" variant="subtitle1">
                    <Link to="/home" className='footer-link'>HOME</Link>
                </Typography>
                <Typography className="footer-link" variant="subtitle1">
                    <Link to="/login" className='footer-link'>LOG IN</Link>
                </Typography>
                <Typography className="footer-link" variant="subtitle1">
                    <Link to="/signup" className='footer-link'>SIGN UP</Link>
                </Typography>
            </Box>

            {/* Right: Credits and Social */}
            <Box className="footer-right">
                <Typography className="footer-credits-title" variant="h6">Developer Credits</Typography>
                <Typography className="footer-credits" variant="subtitle1">
                    Built with <span className="footer-heart">❤️</span> by Siddharth Singh
                </Typography>
                <Typography className="footer-social" variant="subtitle1">
                    <a href="https://github.com/Siddharth2k14" target="_blank" rel="noopener" underline="hover" color="inherit">
                        GitHub
                    </a>
                    {' | '}
                    <a href="https://www.linkedin.com/in/siddharth-singh-a2a822253/" target="_blank" rel="noopener" underline="hover" color="inherit">
                        LinkedIn
                    </a>
                </Typography>
            </Box>
        </Box>
        {/* Disclaimer at the bottom */}
        <Box className="footer-disclaimer-bar">
            <Typography className="footer-disclaimer-title" variant="h6">Disclaimer</Typography>
            <Typography className="footer-disclaimer" variant="subtitle1">
                This is a student project for learning purposes
            </Typography>
        </Box>
    </Box>
);

export default Footer;