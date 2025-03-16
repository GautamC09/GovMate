import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from './firebase';

function Login() {
  const [authMode, setAuthMode] = useState('password'); // or 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.origin, // Redirect URL after login
        handleCodeInApp: true,
      });
      window.localStorage.setItem('emailForSignIn', email);
      alert('OTP sent to your email!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          setError('Please enter your email again.');
          return;
        }
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
        alert('Login successful!');
        navigate('/'); // Redirect to home page
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d] text-white px-4">
      <div className="w-full max-w-md bg-[#191919] p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome back</h2>
        <p className="text-center mb-6 text-gray-400">Login to access government services</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form Content */}
        {authMode === 'password' ? (
          <form onSubmit={handlePasswordLogin}>
            <label className="block mb-2">Email </label>
            <input
              type="text"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded bg-[#0d0d0d] text-white border border-gray-700 focus:outline-none"
            />
            <label className="block mb-2">Password</label>
            <div className="flex items-center justify-between">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-2 px-3 py-2 rounded bg-[#0d0d0d] text-white border border-gray-700 focus:outline-none"
              />
              <a href="#" className="text-sm text-gray-400 ml-2 hover:text-white">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-2 rounded mt-4 hover:bg-gray-200 transition"
            >
              Sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpLogin}>
            <label className="block mb-2">Email or ID</label>
            <input
              type="text"
              placeholder="name@example.com or Aadhaar ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded bg-[#0d0d0d] text-white border border-gray-700 focus:outline-none"
            />
            <label className="block mb-2">OTP</label>
            <input
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded bg-[#0d0d0d] text-white border border-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-white text-black py-2 rounded mt-4 hover:bg-gray-200 transition"
            >
              Sign in
            </button>
          </form>
        )}

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="/signup" className="text-white hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;