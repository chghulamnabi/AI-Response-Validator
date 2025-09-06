import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      if (mode === 'login') {
        await login(email, password);
      } else if (mode === 'signup') {
        await signup(email, password);
      } else {
        setMessage('If an account with that email exists, a reset link has been sent.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4">
        <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
                <CheckCircleIcon />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                AI Response Validator
            </h1>
        </div>
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">
          {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
            required
          />
          {mode !== 'forgot' && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
              required
            />
          )}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {message && <p className="text-green-400 text-sm text-center">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-300"
          >
            {isLoading ? 'Loading...' : mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
          </button>
        </form>
        <div className="text-center mt-6 text-sm">
          {mode === 'login' && (
            <p className="text-gray-400">
              No account? <button onClick={() => { setMode('signup'); setError(''); }} className="font-semibold text-cyan-400 hover:underline">Sign up</button>
            </p>
          )}
          {mode === 'signup' && (
            <p className="text-gray-400">
              Already have an account? <button onClick={() => { setMode('login'); setError(''); }} className="font-semibold text-cyan-400 hover:underline">Log in</button>
            </p>
          )}
           <button onClick={() => { setMode('forgot'); setError(''); }} className="font-semibold text-gray-500 hover:underline mt-2">Forgot Password?</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
