//Material UI Imports 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

//CSS
import './HomeMain.css';
import { useEffect, useState } from 'react';

//Component
const HomeMain = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box 
      className="home-main-outer"
      sx={{
        paddingRight: '7px',
        paddingLeft: '7px'
      }}
    >
      <Card className="home-main-card">
        <Typography 
          variant= {isMobile ? 'h4' : 'h2'} 
          align="center" 
          className="home-main-title" 
          gutterBottom>
          Welcome to ExamMaster – Your Smart Online Exam Portal
        </Typography>
        <Box className="home-main-desc" mb={4}>
          <Typography variant="h6">
            Why <strong>ExamMaster</strong>?
          </Typography>
          <Typography className="home-main-text">
            Say goodbye to exam stress and confusing platforms. Whether you're a student preparing for your next test or an admin managing assessments, ExamMaster brings simplicity, flexibility, and speed to your fingertips.
          </Typography>
        </Box>
        {!isMobile ? (
          <Box alignItems="center" justifyContent="center" className="home-main-features">
            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>For Students</Typography>
              <List>
                <ListItem><ListItemText primary="📝 Take objective & subjective exams" /></ListItem>
                <ListItem><ListItemText primary="📊 View your scores instantly" /></ListItem>
                <ListItem><ListItemText primary="🗂 Track your exam history anytime" /></ListItem>
                <ListItem><ListItemText primary="🎓 Practice & prepare with ease" /></ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>For Admins</Typography>
              <List>
                <ListItem><ListItemText primary="🛠️ Create exams in minutes (MCQs or written)" /></ListItem>
                <ListItem><ListItemText primary="📁 Organize exams by subject & type" /></ListItem>
                <ListItem><ListItemText primary="🕒 Schedule exams for later" /></ListItem>
                <ListItem><ListItemText primary="🧠 Analyze performance via built-in dashboards" /></ListItem>
              </List>
            </Grid>
          </Box>
        ) : (
          <Box
            alignItems="center"
            justifyContent="center"
            className="home-main-features-mobile"
          >
            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>
                For Students
              </Typography>

              <List>
                <ListItem><ListItemText primary="📝 Take objective & subjective exams" /></ListItem>
                <ListItem><ListItemText primary="📊 View your scores instantly" /></ListItem>
                <ListItem><ListItemText primary="🗂 Track your exam history anytime" /></ListItem>
                <ListItem><ListItemText primary="🎓 Practice & prepare with ease" /></ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={5} ml={8}>
              <Typography variant="h6" gutterBottom>
                For Admins
              </Typography>

              <List>
                <ListItem><ListItemText primary="🛠️ Create exams in minutes (MCQs or written)" /></ListItem>
                <ListItem><ListItemText primary="📁 Organize exams by subject & type" /></ListItem>
                <ListItem><ListItemText primary="🕒 Schedule exams for later" /></ListItem>
                <ListItem><ListItemText primary="🧠 Analyze performance via built-in dashboards" /></ListItem>
              </List>
            </Grid>
          </Box>
        )}
        <Box className="home-main-coming-soon" mt={6} textAlign="center">
          <Typography variant="h6" gutterBottom>Coming Soon</Typography>
          <List>
            <ListItem><ListItemText primary="🖊️ Timed exams with auto–submit" /></ListItem>
            <ListItem><ListItemText primary="💬 Exam discussion forums" /></ListItem>
            <ListItem><ListItemText primary="🌐 Multi–language support" /></ListItem>
          </List>
        </Box>
      </Card>
    </Box>
  );
};

export default HomeMain;