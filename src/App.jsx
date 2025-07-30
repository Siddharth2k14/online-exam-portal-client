import React from 'react'
import Login from './components/Authentication/Login/Login'
import Signup from './components/Authentication/Signup/Signup'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Student from './pages/student/Student';
import ForgetPassword from './components/Authentication/Forget Password/ForgetPassword';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar'
import AdminDashboard from './pages/admin/Admin Dashboard/AdminDashboard';
import AdminPage from './components/AdminPage/AdminPage'
import ObjectiveExamCreation from './components/Objective Exam Creation/ObjectiveExamCreation';
import ObjectiveExamPage from './pages/admin/Objective Exam Page/ObjectiveExamPage';
import ManageExam from './components/Manage Exams/ManageExam';
import ViewExam from './components/Manage Exams/ViewExam';
import AccountSettings from './components/Account Settings/AccountSettings';
import StudentDashboard from './pages/student/Student Dashboard/StudentDashboard';
import SubjectiveExamCreation from './components/Subjective Exam Creation/SubjectiveExamCreation';
import StudentPage from './components/StudentPage/StudentPage';
import StartExam from './components/StartExam/StartExam';
import View_Exam from './components/ViewExam/ViewExam';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import HomeMain from './components/Home Main/HomeMain';
import ChangePassword from './components/Change Password/ChangePassword';
import { ThemeProvider } from './components/Theme Context/ThemeContext';
import PrivateRoute from './components/Private Route/PrivateRoute';

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />

        {/* Redirect old routes */}
        <Route path="/signup/:role" element={<Navigate to="/signup" replace />} />
        <Route path="/login/:role" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/exam-creation/objective" element={<ObjectiveExamPage />} />
          <Route path="/exam-creation/subjective" element={<SubjectiveExamCreation />} />
          <Route path="/manage-exams/:examTitle" element={<ViewExam />} />
        </Route>

        {/* Protected Student Routes */}
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/start-exam/:examTitle" element={<StartExam />} />
          <Route path="/exam/:examTitle/review" element={<View_Exam />} />
        </Route>

        {/* Shared Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={['admin', 'student']} />}>
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;