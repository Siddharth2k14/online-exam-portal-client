import React from 'react'
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
import HomeMain from './components/Home Main/homeMain';

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<Admin />} />
        <Route path='/student/login' element={<Student />} />
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
      </Routes>

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
    </div>
  )
}

export default App
