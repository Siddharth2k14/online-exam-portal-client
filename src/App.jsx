// App.jsx - Main App Component (Refactored)
import { Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './components/Theme Context/ThemeContext.jsx';

// Private Route Component
import PrivateRoute from './components/Private Route/PrivateRoute.jsx';
import { CssBaseline } from '@mui/material';

// Authentication Components
import Login from './components/Authentication/Login/Login.jsx';
import Signup from './components/Authentication/Signup/Signup.jsx';
import AI from './AI Integration/AI.jsx';

// Lazy Loading Components
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const About = lazy(() => import('./pages/About/About.jsx'));
const Contact = lazy(() => import('./pages/Contact/Contact.jsx'));
// const Login = lazy(() => import('./components/Authentication/Login/Login.jsx'));
// const Signup = lazy(() => import('./components/Authentication/Signup/Signup.jsx'));
const ForgetPassword = lazy(() => import('./components/Authentication/Forget Password/ForgetPassword.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/Admin Dashboard/AdminDashboard.jsx'));
const StudentDashboard = lazy(() => import('./pages/student/Student Dashboard/StudentDashboard.jsx'));
const ChangePassword = lazy(() => import('./components/Change Password/ChangePassword.jsx'));
const AccountSettings = lazy(() => import('./components/Account Settings/AccountSettings.jsx'));
const ExamCreation = lazy(() => import('./components/Exam Creation/ExamCreation.jsx'));
const ManageExam = lazy(() => import('./components/Manage Exams/ManageExam.jsx'));
const ObjectiveExamCreation = lazy(() => import('./components/Objective Exam Creation/ObjectiveExamCreation.jsx'));
const SubjectiveExamCreation = lazy(() => import('./components/Subjective Exam Creation/SubjectiveExamCreation.jsx'));
const ViewExam = lazy(() => import('./components/Manage Exams/ViewExam.jsx'));
const StudentList = lazy(() => import('./components/Student List/StudentList.jsx'));
const ExamsPage = lazy(() => import('./components/ExamsPage/ExamsPage.jsx'));
const Result = lazy(() => import('./components/Result/Result.jsx'));
const StartExam = lazy(() => import('./components/StartExam/StartExam.jsx'));
const ViewExamReview = lazy(() => import('./components/ViewExam/ViewExam.jsx'));

//Loading Component
const Loading = ({ message = "Loading..." }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{message}</h2>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AI />
    </ThemeProvider>
  );
};

export default App;