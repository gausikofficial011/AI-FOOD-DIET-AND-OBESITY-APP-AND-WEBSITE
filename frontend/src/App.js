import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';

import ResponsiveNavbar from './components/ResponsiveNavbar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FoodLog from './pages/FoodLog';
import FoodDatabase from './pages/FoodDatabase';
import WaterTracker from './pages/WaterTracker';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import Recipes from './pages/Recipes';
import Social from './pages/Social';
import BarcodeScanner from './pages/BarcodeScanner';
import ExportData from './pages/ExportData';
import Allusers from './pages/Allusers';
import Chatbot from './pages/Chatbot';
import Allchat from './pages/Allchat';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ResponsiveNavbar />
        <Container fluid className="px-0 px-md-3 mt-3">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/log-food" element={<PrivateRoute><FoodLog /></PrivateRoute>} />
            <Route path="/foods" element={<PrivateRoute><FoodDatabase /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
             <Route path="/allchats" element={<PrivateRoute><Allchat /></PrivateRoute>} />
            <Route path="/water" element={<PrivateRoute><WaterTracker /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/allusers" element={<PrivateRoute><Allusers /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
            <Route path="/recipes" element={<PrivateRoute><Recipes /></PrivateRoute>} />
            <Route path="/social" element={<PrivateRoute><Social /></PrivateRoute>} />
            <Route path="/barcode" element={<PrivateRoute><BarcodeScanner /></PrivateRoute>} />
            <Route path="/export" element={<PrivateRoute><ExportData /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Container>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
};

export default App;