import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from './firebase';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terms: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Account created successfully!');
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d] text-white px-4">
      <div className="w-full max-w-md bg-[#191919] p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
        <p className="text-center mb-6 text-gray-400">Enter your information to create an account</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2 mb-4">
            <div className="w-1/2">
              <label className="block mb-2">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-[#0d0d0d] text-white border border-gray-700 focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2">Last name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-[#0d0d0d] text-white border border-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 px-3 py-2 rounded bg-[#0d0d0d] text-white border border-gray-700 focus:outline-none"
          />
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 px-3 py-2 rounded bg-[#0d0d0d] text-white border border-gray-700 focus:outline-none"
          />
        
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
          >
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-white hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;