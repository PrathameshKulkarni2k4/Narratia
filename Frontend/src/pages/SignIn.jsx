import React from "react";
import { Link } from "react-router-dom";


const SignIn = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-6 bg-[#161b22] p-8 rounded-md border border-[#30363d] shadow">
        {/* GitHub Logo Placeholder */}
        <div className="flex justify-center">
          <div className="text-white text-4xl font-bold">🐙</div>
        </div>

        <h2 className="text-center text-2xl font-semibold text-white">
          Sign in to Narratia
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Username or email address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-[#30363d] rounded bg-[#0d1117] text-white focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>
          <div>
            <label className="flex justify-between text-sm text-white mb-1">
              <span>Password</span>
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-[#30363d] rounded bg-[#0d1117] text-white focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Sign in
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
