import { Card, Typography, Box, Grid, List, ListItem, ListItemText } from '@mui/material';
import './HomeMain.css';

const HomeMain = () => {
  return (
    <Box className="home-main-outer">
      <Card className="home-main-card">
        <Typography variant="h2" align="center" className="home-main-title" gutterBottom>
          Welcome to ExamMaster – Your Smart Online Exam Portal
        </Typography>
        <Box className="home-main-desc" mb={4}>
          <Typography variant="h6">
            Why <strong>ExamMaster</strong>?
          </Typography>
          <Typography variant="body1">
            Say goodbye to exam stress and confusing platforms. Whether you're a student preparing for your next test or an admin managing assessments, ExamMaster brings simplicity, flexibility, and speed to your fingertips.
          </Typography>
        </Box>
        <Grid container spacing={51.7} justifyContent="center" className="home-main-features">
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
        </Grid>
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