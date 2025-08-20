// routes/StudentRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Regular Student Components (loaded immediately)
import StudentDashboard from '../pages/student/Student Dashboard/StudentDashboard.jsx';
import ExamsPage from '../components/ExamsPage/ExamsPage.jsx';
import Result from '../components/Result/Result.jsx';

// Lazy loaded components (loaded only when needed)
const StartExam = lazy(() => import('../components/StartExam/StartExam.jsx'));
const ViewExamReview = lazy(() => import('../components/ViewExam/ViewExam.jsx'));

// Loading component for lazy routes only
const LazyLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-blue-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading exam interface...</p>
    </div>
  </div>
);

const StudentRoutes = () => {
  return (
    <Routes>
      {/* Regular routes - NO Suspense needed */}
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/exams" element={<ExamsPage />} />
      <Route path="/results" element={<Result />} />

      {/* ONLY lazy routes need Suspense */}
      <Route
        path="/start-exam/:examTitle"
        element={
          <Suspense fallback={<LazyLoadingSpinner />}>
            <StartExam />
          </Suspense>
        }
      />
      <Route
        path="/exam/:examTitle/review"
        element={
          <Suspense fallback={<LazyLoadingSpinner />}>
            <ViewExamReview />
          </Suspense>
        }
      />

      {/* Future routes can be regular or lazy as needed */}
      {/* <Route path="/progress" element={<StudentProgress />} /> */}
      {/* <Route path="/certificates" element={<LazyCertificates />} /> */}
    </Routes>
  );
};

export default StudentRoutes;