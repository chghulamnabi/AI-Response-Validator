import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import PricingPage from './components/PricingPage';
import Header from './components/Header';
import ValidatorApp from './ValidatorApp';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [view, setView] = useState<'validator' | 'pricing'>('validator');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header setView={setView} />
      <main className="container mx-auto px-4 py-8">
        {view === 'validator' && <ValidatorApp setView={setView} />}
        {view === 'pricing' && <PricingPage onPlanSelected={() => setView('validator')} />}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
