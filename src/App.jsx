//Regular Imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//Components
import Login from './components/Authentication/Login/Login.jsx'
import Signup from './components/Authentication/Signup/Signup.jsx'
import ForgetPassword from './components/Authentication/Forget Password/ForgetPassword.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import ChangePassword from './components/Change Password/ChangePassword.jsx';
import PrivateRoute from './components/Private Route/PrivateRoute.jsx';
import { ThemeProvider } from './components/Theme Context/ThemeContext';
import StudentDashboard from './pages/student/Student Dashboard/StudentDashboard.jsx';
import AdminDashboard from './pages/admin/Admin Dashboard/AdminDashboard.jsx';

//Lazy imports
import { lazy, Suspense } from 'react';
const ObjectiveExamCreation = lazy(() => import('./components/Objective Exam Creation/ObjectiveExamCreation'));
const ViewExam = lazy(() => import('./components/Manage Exams/ViewExam'));
const SubjectiveExamCreation = lazy(() => import('./components/Subjective Exam Creation/SubjectiveExamCreation'));
const StartExam = lazy(() => import('./components/StartExam/StartExam'));
const View_Exam = lazy(() => import('./components/ViewExam/ViewExam'));

//Main App Routing Component
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
          <Route path="/admin/dashboard" element={
            <AdminDashboard />
          } />
          <Route path="/exam-creation/objective" element={
            <Suspense fallback={<div>Loading..</div>} >
              <ObjectiveExamCreation />
            </Suspense>
          } />
          <Route path="/exam-creation/subjective" element={
            <Suspense fallback={<div>Loading..</div>} >
              <SubjectiveExamCreation />
            </Suspense>
          } />
          <Route path="/manage-exams/:examTitle" element={
            <Suspense fallback={<div>Loading..</div>} >
              <ViewExam />
            </Suspense>
          } />
        </Route>

        {/* Protected Student Routes */}
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route path="/student/dashboard" element={
            <StudentDashboard />
          } />
          <Route path="/start-exam/:examTitle" element={
            <Suspense fallback={<div>Loading..</div>} >
              <StartExam />
            </Suspense>
          } />
          <Route path="/exam/:examTitle/review" element={
            <Suspense fallback={<div>Loading..</div>} >
              <View_Exam />
            </Suspense>
          } />
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