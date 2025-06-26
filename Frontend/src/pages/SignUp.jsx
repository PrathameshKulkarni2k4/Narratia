import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_USER_API_END_POINT;

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
        setSuccess('');

        try {
            const response = await axios.post(`${API_ENDPOINT}/register`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            if (response.data.success) {
                setSuccess(response.data.message);
                // Reset form
                setFormData({
                    name: '',
                    username: '',
                    email: '',
                    phone: '',
                    password: ''
                });
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
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
        <div className="min-h-screen grid md:grid-cols-2 bg-black text-white">
            {/* Left Section */}
            <div className="flex flex-col justify-center items-center px-8 py-20 bg-gradient-to-b from-black to-slate-900">
                <h1 className="text-4xl font-bold mb-4">Create your free account</h1>
                <p className="text-slate-400 mb-6 text-center max-w-md">
                    Explore Narratia's immersive storytelling features designed for creators and visionaries.
                </p>
                <div className="mt-10">
                    {/* Placeholder for animation or graphics */}
                    <div className="w-40 h-40 bg-slate-800 rounded-full flex items-center justify-center text-xl text-slate-500">
                        🎭
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="bg-[#f6f8fa] text-black flex items-center justify-center px-8 py-16">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Sign up to Narratia</h2>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {success} Redirecting to login...
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your full name"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Choose a username"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+91-9876543210"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                minLength="6"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black hover:bg-slate-800 text-white font-semibold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up →'}
                        </button>
                    </form>

                    <p className="text-sm text-slate-500 mt-4 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Sign in →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export { SignUp };