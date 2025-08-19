// routes/SharedRoutes.jsx
import { Routes, Route } from 'react-router-dom';

// Shared Components (accessible by both admin and student)
import ChangePassword from '../components/Change Password/ChangePassword.jsx';
import AccountSettings from '../components/Account Settings/AccountSettings.jsx';

const SharedRoutes = () => {
  return (
    <Routes>
      {/* Account Management Routes */}
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/account-settings" element={<AccountSettings />} />
      
      {/* You can add more shared routes here */}
      {/* <Route path="/help" element={<Help />} /> */}
      {/* <Route path="/support" element={<Support />} /> */}
      {/* <Route path="/notifications" element={<Notifications />} /> */}
    </Routes>
  );
};

export default SharedRoutes;