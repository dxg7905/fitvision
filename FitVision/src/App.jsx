import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hero from './Components/Hero';
import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard'; // Import the Dashboard component
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> {/* Protect the Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;