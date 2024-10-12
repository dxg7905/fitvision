// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import your Firebase configuration

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; // Check if the user is authenticated

  if (!user) {
    // If not authenticated, redirect to Auth page
    return <Navigate to="/auth" />;
  }

  return children; // If authenticated, render the child components (e.g., Dashboard)
};

export default ProtectedRoute;