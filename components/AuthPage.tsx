import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44.5 24c0-1.6-.1-3.2-.4-4.7H24v9.1h11.4c-.5 2.9-2.2 5.4-4.7 7.1v5.9h7.6c4.4-4.1 7-10.1 7-17.4z" fill="#4285F4"/>
        <path d="M24 45c6.5 0 12-2.1 16-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-7.9 2.3-6.1 0-11.3-4.1-13.1-9.7H3.1v5.9C7 40.2 14.8 45 24 45z" fill="#34A853"/>
        <path d="M10.9 27.2c-.4-1.2-.6-2.5-.6-3.8s.2-2.6.6-3.8V14H3.1C1.1 18 0 22.8 0 28.1s1.1 10.1 3.1 14l7.8-5.9z" fill="#FBBC05"/>
        <path d="M24 9.8c3.5 0 6.6 1.2 9.1 3.6l6.7-6.7C36 2.1 30.5 0 24 0 14.8 0 7 4.8 3.1 12l7.8 5.6C12.7 13.9 17.9 9.8 24 9.8z" fill="#EA4335"/>
    </svg>
);

const GithubIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);


const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, loginWithProvider } = useAuth();

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

  const handleProviderLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError('');
    try {
        await loginWithProvider(provider);
    } catch (err) {
        setError(err instanceof Error ? err.message : `Failed to login with ${provider}.`);
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

        {mode !== 'forgot' && (
            <>
            <div className="space-y-4">
                <button
                    onClick={() => handleProviderLogin('google')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition duration-300 disabled:opacity-50"
                >
                    <GoogleIcon />
                    Continue with Google
                </button>
                <button
                    onClick={() => handleProviderLogin('github')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition duration-300 disabled:opacity-50"
                >
                    <GithubIcon />
                    Continue with GitHub
                </button>
            </div>
            <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-600"></div>
            </div>
            </>
        )}

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
