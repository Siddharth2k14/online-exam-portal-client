// routes/StudentRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Student Components
import StudentDashboard from '../pages/student/Student Dashboard/StudentDashboard.jsx';
import ExamsPage from '../components/ExamsPage/ExamsPage.jsx';
import Result from '../components/Result/Result.jsx';

// Lazy loaded components for better performance
const StartExam = lazy(() => import('../components/StartExam/StartExam'));
const ViewExamReview = lazy(() => import('../components/ViewExam/ViewExam'));

// Loading component
const StudentLoadingSpinner = () => (
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
      {/* Student Dashboard */}
      <Route path="/dashboard" element={<StudentDashboard />} />

      <Suspense fallback={<StudentLoadingSpinner />}>
        {/* Exam Related Routes */}
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/start-exam/:examTitle" element={<StartExam />} />
        <Route path="/exam/:examTitle/review" element={<ViewExamReview />} />

        {/* Results */}
        <Route path="/results" element={<Result />} />
      </Suspense>

      {/* You might want to add more student-specific routes here */}
      {/* <Route path="/progress" element={<StudentProgress />} /> */}
      {/* <Route path="/certificates" element={<Certificates />} /> */}
      {/* <Route path="/study-materials" element={<StudyMaterials />} /> */}
    </Routes>
  );
};

export default StudentRoutes;