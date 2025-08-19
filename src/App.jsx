//Regular Imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/Private Route/PrivateRoute.jsx';
import { ThemeProvider } from './components/Theme Context/ThemeContext';

//Lazy imports
import { Suspense } from 'react';
import PublicRoutes from './routes/PublicRoutes.jsx';
import AdminRoutes from './routes/AdminRoutes.jsx';
import StudentRoutes from './routes/StudentRoutes.jsx';
import SharedRoutes from './routes/SharedRoutes.jsx';


// Global Loading Component
const GlobalLoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
      <p className="mt-6 text-lg text-gray-700 font-medium">Loading Application...</p>
    </div>
  </div>
);

//Main App Routing Component
const App = () => {
  return (
    <ThemeProvider>
      <Suspense fallback={<GlobalLoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={<PublicRoutes />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminRoutes />
              </PrivateRoute>
            }
          />

          {/* Protected Student Routes */}
          <Route
            path="/student/*"
            element={
              <PrivateRoute allowedRoles={['student']}>
                <StudentRoutes />
              </PrivateRoute>
            }
          />

          {/* Shared Protected Routes */}
          <Route
            path="/shared/*"
            element={
              <PrivateRoute allowedRoles={['admin', 'student']}>
                <SharedRoutes />
              </PrivateRoute>
            }
          />

          {/* Legacy route redirects for backward compatibility */}
          <Route path="/account-info" element={<Navigate to="/shared/account-settings" replace />} />

          {/* Catch-all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App;
