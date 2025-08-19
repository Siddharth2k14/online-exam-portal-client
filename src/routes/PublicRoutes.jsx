// routes/PublicRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Components
import Home from '../pages/Home/Home.jsx';
import About from '../pages/About/About.jsx';
import Contact from '../pages/Contact/Contact.jsx';
import Login from '../components/Authentication/Login/Login.jsx';
import Signup from '../components/Authentication/Signup/Signup.jsx';
import ForgetPassword from '../components/Authentication/Forget Password/ForgetPassword.jsx';
import { ThemeProvider } from '../components/Theme Context/ThemeContext.jsx';

const PublicRoutes = () => {
  return (
    <ThemeProvider>
      <Routes>
        {/* Main Public Routes */}
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
      </Routes>
    </ThemeProvider>
  );
};

export default PublicRoutes;