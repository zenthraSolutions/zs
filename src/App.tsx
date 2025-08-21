import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LeadProvider } from './contexts/LeadContext';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LeadProvider>
          <CustomCursor />
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminAuth />} />
                <Route path="/admin/login" element={<AdminAuth />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </Router>
        </LeadProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;