import React from 'react'
// import Suspense, { lazy } from 'react';
// import {Routes} from 'react-router-dom';
// import {Route} from 'react-router-dom';
// const Signup = lazy(() => import('./components/Authentication/Signup/Signup'));
// const Admin = lazy(() => import('./pages/admin/Admin'));
// const Student = lazy(() => import('./pages/student/Student'));
// const ForgetPassword = lazy(() => import('./components/Authentication/Forget Password/ForgetPassword'));
// const AdminDashboard = lazy(() => import('./pages/admin/Admin Dashboard/AdminDashboard'));
// const ObjectiveExamPage = lazy(() => import('./pages/admin/Objective Exam Page/ObjectiveExamPage'));
// const ViewExam = lazy(() => import('./components/Manage Exams/ViewExam'));
// const StudentDashboard = lazy(() => import('./pages/student/Student Dashboard/StudentDashboard'));
// const SubjectiveExamCreation = lazy(() => import('./components/Subjective Exam Creation/SubjectiveExamCreation'));
// const StartExam = lazy(() => import('./components/StartExam/StartExam'));
// const View_Exam = lazy(() => import('./components/ViewExam/ViewExam'));
// const Home = lazy(() => import('./pages/Home/Home'));
// const About = lazy(() => import('./pages/About/About'));
// const Contact = lazy(() => import('./pages/Contact/Contact'));
// const ChangePassword = lazy(() => import('./components/Change Password/ChangePassword'));
import Login from './components/Authentication/Login/Login'
import Signup from './components/Authentication/Signup/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <ThemeProvider>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/admin/login" element={<Admin />} /> */}
          <Route path='/login/:role' element={<Login />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/student' element={<Student />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/exam-creation/objective' element={<ObjectiveExamPage />} />
          <Route path="/manage-exams/:examTitle" element={<ViewExam />} />
          <Route path='/student/dashboard' element={<StudentDashboard />} />
          <Route path='/exam-creation/subjective' element={<SubjectiveExamCreation />} />
          <Route path="/start-exam/:examTitle" element={<StartExam />} />
          <Route path="/exam/:examTitle/review" element={<View_Exam />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      {/* </Suspense> */}

      {/* <NavBar /> */}
      {/* <SideBar /> */}
      {/* <AdminDashboard /> */}
      {/* <AdminPage /> */}
      {/* <ManageExam /> */}
      {/* <AccountSettings /> */}
      {/* <StudentDashboard /> */}
      {/* <StudentPage /> */}
      {/* <Home /> */}
      {/* <HomeMain /> */}
    </ThemeProvider>
  )
}

export default App