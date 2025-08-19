//Regular Imports
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/Private Route/PrivateRoute.jsx';
import { ThemeProvider } from './components/Theme Context/ThemeContext';

//Lazy imports
import { Suspense } from 'react';
import PublicRoutes from './routes/PublicRoutes.jsx';
import AdminRoutes from './routes/AdminRoutes.jsx';
import StudentRoutes from './routes/StudentRoutes.jsx';
import SharedRoutes from './routes/SharedRoutes.jsx';

//Main App Routing Component
const App = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App;
