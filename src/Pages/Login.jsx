import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const burl = 'https://learnlink-backend-0x63.onrender.com';
    const loginrequest = await fetch(`${burl}/api/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await loginrequest.json();

    if (loginrequest.ok) {
      window.localStorage.setItem("authToken", data.token);
      navigate('/resources');
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-8"
      >
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Login</h2>
          <p className="text-gray-600 text-sm mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition text-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition text-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition font-medium"
          >
            Login
          </button>
        </div>

        {/* Extra Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-black font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login;
