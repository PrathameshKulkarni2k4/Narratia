import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const API_ENDPOINT = import.meta.env.VITE_USER_API_END_POINT;

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_ENDPOINT}/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            if (response.data.success) {
                // Store user data in localStorage if needed
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                
                navigate('/hub'); 
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
            <div className="max-w-sm w-full space-y-6 bg-[#161b22] p-8 rounded-md border border-[#30363d] shadow">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="text-white text-4xl font-bold">🐙</div>
                </div>

                <h2 className="text-center text-2xl font-semibold text-white">
                    Sign in to Narratia
                </h2>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm text-white mb-1">Email address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-[#30363d] rounded bg-[#0d1117] text-white focus:outline-none focus:ring focus:border-blue-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="flex justify-between text-sm text-white mb-1">
                            <span>Password</span>
                            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-[#30363d] rounded bg-[#0d1117] text-white focus:outline-none focus:ring focus:border-blue-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 pt-2">
                    New to Narratia?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export { SignIn };