// routes/AdminRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Admin Components
import AdminDashboard from '../pages/admin/Admin Dashboard/AdminDashboard.jsx';
import ExamCreation from '../components/Exam Creation/ExamCreation.jsx';
import ManageExam from '../components/Manage Exams/ManageExam.jsx';

// Lazy loaded components for better performance
const ObjectiveExamCreation = lazy(() => import('../components/Objective Exam Creation/ObjectiveExamCreation'));
const SubjectiveExamCreation = lazy(() => import('../components/Subjective Exam Creation/SubjectiveExamCreation'));
const ViewExam = lazy(() => import('../components/Manage Exams/ViewExam'));

// Loading component
const AdminLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading admin panel...</p>
    </div>
  </div>
);

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Admin Dashboard */}
      <Route path="/dashboard" element={<AdminDashboard />} />

      {/* Exam Management Routes */}
      <Suspense fallback={<AdminLoadingSpinner />}>
        <Route path="/exam-creation" element={<ExamCreation />} />
        <Route path="/exam-creation/objective" element={<ObjectiveExamCreation />} />
        <Route path="/exam-creation/subjective" element={<SubjectiveExamCreation />} />

        {/* Manage Exams */}
        <Route path="/manage-exams" element={<ManageExam />} />
        <Route path="/manage-exams/:examTitle" element={<ViewExam />} />
      </Suspense>

      {/* You might want to add more admin-specific routes here */}
      {/* <Route path="/users" element={<ManageUsers />} /> */}
      {/* <Route path="/reports" element={<Reports />} /> */}
      {/* <Route path="/settings" element={<AdminSettings />} /> */}
    </Routes>
  );
};

export default AdminRoutes;