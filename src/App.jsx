// App.jsx - Main App Component (Refactored)
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

// Context Providers
import { ThemeProvider } from './components/Theme Context/ThemeContext.jsx';

// Route Components
import PublicRoutes from './routes/PublicRoutes.jsx';
import AdminRoutes from './routes/AdminRoutes.jsx';
import StudentRoutes from './routes/StudentRoutes.jsx';
import SharedRoutes from './routes/SharedRoutes.jsx';

// Private Route Component
import PrivateRoute from './components/Private Route/PrivateRoute.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Login from './components/Authentication/Login/Login.jsx';
import Signup from './components/Authentication/Signup/Signup.jsx';
import ForgetPassword from './components/Authentication/Forget Password/ForgetPassword.jsx';
import AdminDashboard from './pages/admin/Admin Dashboard/AdminDashboard.jsx';
import ExamCreation from './components/Exam Creation/ExamCreation.jsx';
import ManageExam from './components/Manage Exams/ManageExam.jsx';
import ObjectiveExamCreation from './components/Objective Exam Creation/ObjectiveExamCreation.jsx';
import SubjectiveExamCreation from './components/Subjective Exam Creation/SubjectiveExamCreation.jsx';
import StudentDashboard from './pages/student/Student Dashboard/StudentDashboard.jsx';
import ExamsPage from './components/ExamsPage/ExamsPage.jsx';
import Result from './components/Result/Result.jsx';
import StartExam from './components/StartExam/StartExam.jsx';
import ChangePassword from './components/Change Password/ChangePassword.jsx';
import AccountSettings from './components/Account Settings/AccountSettings.jsx';

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes - No authentication required */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />

        {/* Legacy Route Redirects */}
        <Route path="/signup/:role" element={<Navigate to="/signup" replace />} />
        <Route path="/login/:role" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Protected Admin Routes */}
        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/exam-creation"
          element={
            <PrivateRoute roles={['admin']}>
              <ExamCreation />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-exams"
          element={
            <PrivateRoute roles={['admin']}>
              <ManageExam />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/exam-creation/objective"
          element={
            <PrivateRoute roles={['admin']}>
              <ObjectiveExamCreation />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/exam-creation/subjective"
          element={
            <PrivateRoute roles={['admin']}>
              <SubjectiveExamCreation />
            </PrivateRoute>
          }
        />

        {/* Protected Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute roles={['student']}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/exams"
          element={
            <PrivateRoute roles={['student']}>
              <ExamsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/results"
          element={
            <PrivateRoute roles={['student']}>
              <Result />
            </PrivateRoute>
          }
        />

        {/* Lazy-loaded protected routes */}
        <Route
          path="/student/start-exam/:examTitle"
          element={
            <PrivateRoute roles={['student']}>
              <StartExam />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/exam/:examTitle/review"
          element={
            <PrivateRoute roles={['student']}>
              <ViewExamReview />
            </PrivateRoute>
          }
        />


        {/* Shared Protected Routes (Both Admin and Student) */}
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/account-settings" element={<AccountSettings />} />

        {/* Legacy route redirects for backward compatibility */}
        <Route path="/account-info" element={<Navigate to="/shared/account-settings" replace />} />

        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;