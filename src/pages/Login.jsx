import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

/**
 * Login.jsx
 * Component for user login. Uses a two-column layout.
 * @param {object} props - Component props
 * @param {function} props.navigate - Function to change the current view.
 * @param {function} props.handleLogin - Function to handle the actual login process (passed from App.jsx).
 */
const Login = ({ navigate, handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // CALL REAL FIREBASE LOGIN HANDLER
            await handleLogin(email, password);
            // On success, App.jsx's onAuthStateChanged will handle navigation to 'home'
        } catch (err) {
            console.error("Login Error:", err);
            let displayError = 'Login failed. Please check your email and password.';
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                displayError = 'Invalid email or password.';
            } else {
                displayError = err.message;
            }
            setError(displayError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-full p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Side: Marketing/Info Column (Desktop Only) */}
                <div className="hidden md:block w-1/2 bg-sky-600 p-12 text-white flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold mb-4">Welcome Back!</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Log in to manage your pet profiles, update your tags, and check your order history.
                    </p>
                    <button
                        onClick={() => navigate('register')}
                        className="flex items-center justify-center px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-full shadow-lg hover:bg-amber-500 transition duration-200 mt-4"
                    >
                        <UserPlus className="w-5 h-5 mr-2" /> Need an Account? Register
                    </button>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
                        <LogIn className="w-7 h-7 mr-2 text-sky-600" /> User Login
                    </h2>
                    
                    {error && (
                        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 mt-4 text-white font-bold rounded-lg shadow-lg transition duration-200 flex items-center justify-center ${
                                isLoading ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'
                            }`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <><LogIn className="w-5 h-5 mr-2" /> Log In</>
                            )}
                        </button>
                        
                        {/* Mobile Register Link */}
                        <div className="md:hidden text-center pt-4">
                            <p className="text-gray-600">
                                Don't have an account? 
                                <button
                                    onClick={() => navigate('register')}
                                    className="text-sky-600 hover:text-sky-800 font-semibold transition duration-150 ml-1"
                                >
                                    Register here
                                </button>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;
