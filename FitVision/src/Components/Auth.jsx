// Auth.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase.js'; // Import your Firebase configuration
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Handle login
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in successfully');
        navigate('/dashboard'); // Redirect to Dashboard after login
      } else {
        // Handle signup
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Signed up successfully');
        navigate('/dashboard'); // Redirect to Dashboard after signup
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here (e.g., show an error message to the user)
    }
  };

  const toggleMode = () => setIsLogin(!isLogin);

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const nameFieldVariants = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: { opacity: 1, height: 'auto', marginBottom: 16, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#000a06_0%,#115739_50%,#4ead85_100%)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white bg-opacity-20 p-8 rounded-3xl shadow-lg backdrop-blur-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="nameField"
                variants={nameFieldVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-white bg-opacity-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ead85]"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-white bg-opacity-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ead85]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-white bg-opacity-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4ead85]"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-opacity-90 transition duration-300"
            type="submit"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </motion.button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-white hover:underline focus:outline-none"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;