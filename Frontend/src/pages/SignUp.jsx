import React from "react";
import { Link } from "react-router-dom";


const SignUp = () => {
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

                    <form className="space-y-5">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Your full name"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Username</label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+91-9876543210"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-slate-800 text-white font-semibold py-2 rounded transition"
                        >
                            
                            SignUp →
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