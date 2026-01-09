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
import Loading from './helper components/Loading.jsx';

// Lazy Loading Components
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const About = lazy(() => import('./pages/About/About.jsx'));
const Contact = lazy(() => import('./pages/Contact/Contact.jsx'));
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
// const Loading = ({ message = "Loading..." }) => {
//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h2>{message}</h2>
//     </div>
//   )
// }

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Suspense fallback={<Loading message="Loading page..." />}>
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
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute roles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/exam-creation"
            element={
              <PrivateRoute roles={['admin']}>
                <ExamCreation />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-exams"
            element={
              <PrivateRoute roles={['admin']}>
                <ManageExam />
              </PrivateRoute>
            }
          />
          <Route
            path="/exam-creation/objective"
            element={
              <PrivateRoute roles={['admin']}>
                <ObjectiveExamCreation />
              </PrivateRoute>
            }
          />
          <Route
            path="/exam-creation/subjective"
            element={
              <PrivateRoute roles={['admin']}>
                <SubjectiveExamCreation />
              </PrivateRoute>
            }
          />

          <Route
            path="/view-exam/:examTitle"
            element={
              <PrivateRoute roles={['admin']}>
                <ViewExam />
              </PrivateRoute>
            }
          />

          <Route
            path="/student-list"
            element={
              <PrivateRoute roles={['admin']}>
                <StudentList />
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
            path="/exams"
            element={
              <PrivateRoute roles={['student']}>
                <ExamsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/results"
            element={
              <PrivateRoute roles={['student']}>
                <Result />
              </PrivateRoute>
            }
          />

          {/* Lazy-loaded protected routes */}
          <Route
            path="/start-exam/:examTitle"
            element={
              <PrivateRoute roles={['student']}>
                <StartExam />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewExam"
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
      </Suspense>
    </ThemeProvider>
  );
};

export default App;