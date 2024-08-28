import React from "react";

const SignIn: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-sky-950 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Sign In
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-gray-300 hover:text-white">
            Forgot Password?
          </a>
        </div>
        <div className="mt-2 text-center">
          <p className="text-gray-400">
            Don’t have an account?{" "}
            <a href="/sign-up" className="text-gray-300 hover:text-white">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
