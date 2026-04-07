import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginSignUpPage from '../pages/authentication/LoginSignUpPage.jsx';
import TeacherDashboardPage from '../pages/dashboards/TeacherDashboardPage.jsx';
import StudentDashboardPage from '../pages/dashboards/StudentDashboardPage.jsx';
import AdminDashboardPage from '../pages/dashboards/AdminDashboardPage.jsx';
import ParentDashboard from '../pages/dashboards/ParentDashboard.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignUpPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/faculty" element={<TeacherDashboardPage />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/student" element={<StudentDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
