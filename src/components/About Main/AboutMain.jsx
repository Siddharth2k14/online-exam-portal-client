//Material UI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

//CSS
import './AboutMain.css'

//Component
const AboutMain = () => {
    return (
        <Box className="about-main-outer">
            <Card className="about-main-card">
                <Typography variant="h2" align="center" className="about-main-title" gutterBottom>
                    About
                </Typography>
                <Box className="about-main-desc" mb={4}>
                    <Typography variant="body1">
                        ExamMaster is a full-stack Online Exam Portal designed to simplify and modernize the exam process for both students and administrators.
                        Whether it's objective MCQs or subjective answers, the platform supports it all — allowing students to take exams securely, view results instantly, and track their progress over time. For admins, it offers a clean and intuitive dashboard to create, manage, and schedule exams efficiently.
                    </Typography>
                </Box>
                <Grid container spacing={4} justifyContent="center" className="about-main-features">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Purpose & Vision</Typography>
                        <Typography variant="body2">
                            The project was born out of a need to build something real and useful during my semester break. After experimenting with Firebase and Supabase, I moved to a custom MERN stack setup to have more control and flexibility. The goal is to offer a lightweight, scalable system that mimics real-world exam environments and helps me grow as a full-stack developer.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Key Features</Typography>
                        <List>
                            <ListItem><ListItemText primary="🔐 Secure Authentication for Students and Admins" /></ListItem>
                            <ListItem><ListItemText primary="📝 Objective & Subjective Exams with auto-scoring support" /></ListItem>
                            <ListItem><ListItemText primary="📅 Exam Scheduling and Subject-wise Filtering" /></ListItem>
                            <ListItem><ListItemText primary="📊 Real-Time Dashboards showing scores and analytics" /></ListItem>
                            <ListItem><ListItemText primary="📚 Exam History Tracking for students" /></ListItem>
                            <ListItem><ListItemText primary="🖥️ Modern, Responsive UI with Material UI" /></ListItem>
                            <ListItem><ListItemText primary="🌐 Built with React, Node.js, Express, MongoDB & Redux Toolkit" /></ListItem>
                        </List>
                        <Box className="about-main-built-by" mt={4} p={2}>
                            <Typography variant="subtitle1" fontWeight="bold">Built With Love by</Typography>
                            <Typography variant="body2">Siddharth Singh</Typography>
                            <Typography variant="body2">B.Tech Student | Full-Stack Developer in Progress 🚀</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default AboutMain
