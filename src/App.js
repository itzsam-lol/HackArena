import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import BufferPage from './pages/BufferPage';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import CustomCursor from './components/animations/CustomCursor';

// BufferPage wrapper for login/register
function BufferWrapper({ redirectTo }) {
  return <BufferPage timed={true} duration={2500} redirectTo={redirectTo} />;
}

function AppContent() {
  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setFirstVisit(false);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-hack-black text-white font-body flex flex-col">
      <CustomCursor />
      {!firstVisit && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Buffer page for first visit */}
          <Route path="/" element={firstVisit ? <BufferPage /> : <Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Show buffer for 2-3s after login/register */}
          <Route path="/buffer-login" element={<BufferWrapper redirectTo="/dashboard" />} />
          <Route path="/buffer-register" element={<BufferWrapper redirectTo="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buffer-login" element={<BufferPage timed={true} duration={2500} redirectTo="/dashboard" />} />
          <Route path="/buffer-register" element={<BufferPage timed={true} duration={2500} redirectTo="/dashboard" />} />


          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/team" element={
            <ProtectedRoute>
              <TeamManagement />
            </ProtectedRoute>
          } />
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!firstVisit && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
              border: '1px solid #555',
            },
            success: {
              iconTheme: {
                primary: '#4FFFB0',
                secondary: '#000',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF1F71',
                secondary: '#000',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
