// routes/AdminRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Admin Components (Regular imports - loaded immediately)
import AdminDashboard from '../pages/admin/Admin Dashboard/AdminDashboard.jsx';
import ExamCreation from '../components/Exam Creation/ExamCreation.jsx';
import ManageExam from '../components/Manage Exams/ManageExam.jsx';

// Lazy loaded components (loaded only when needed)
const ObjectiveExamCreation = lazy(() => import('../components/Objective Exam Creation/ObjectiveExamCreation.jsx'));
const SubjectiveExamCreation = lazy(() => import('../components/Subjective Exam Creation/SubjectiveExamCreation.jsx'));
const ViewExam = lazy(() => import('../components/Manage Exams/ViewExam.jsx'));

// Loading component for lazy routes only
const LazyLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading component...</p>
    </div>
  </div>
);

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Regular routes - NO Suspense needed */}
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/exam-creation" element={<ExamCreation />} />
      <Route path="/manage-exams" element={<ManageExam />} />

      {/* ONLY lazy routes need Suspense */}
      <Route 
        path="/exam-creation/objective" 
        element={
          <Suspense fallback={<LazyLoadingSpinner />}>
            <ObjectiveExamCreation />
          </Suspense>
        } 
      />
      <Route 
        path="/exam-creation/subjective" 
        element={
          <Suspense fallback={<LazyLoadingSpinner />}>
            <SubjectiveExamCreation />
          </Suspense>
        } 
      />
      <Route 
        path="/manage-exams/:examTitle" 
        element={
          <Suspense fallback={<LazyLoadingSpinner />}>
            <ViewExam />
          </Suspense>
        } 
      />

      {/* Future routes can be regular or lazy as needed */}
      {/* <Route path="/users" element={<ManageUsers />} /> */}
      {/* <Route path="/reports" element={<LazyReports />} /> */}
    </Routes>
  );
};

export default AdminRoutes;