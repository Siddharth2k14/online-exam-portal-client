// App.jsx - Main App Component (Refactored)
import { Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './components/Theme Context/ThemeContext';

// Route Components
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import StudentRoutes from './routes/StudentRoutes';
import SharedRoutes from './routes/SharedRoutes';

// Private Route Component
import PrivateRoute from './components/Private Route/PrivateRoute.jsx';

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes - No authentication required */}
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

        {/* Shared Protected Routes (Both Admin and Student) */}
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
  );
};

export default App;