import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Plan } from '../types';

interface PricingPageProps {
  onPlanSelected: () => void;
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    uses: '5 uses',
    description: 'Perfect for trying out the validator and occasional use.',
    planId: 'free',
    cta: 'Current Plan',
  },
  {
    name: 'Pro',
    price: '$40',
    per: '/year',
    uses: '500 uses',
    description: 'Ideal for developers and content creators with regular validation needs.',
    planId: 'pro',
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Business',
    price: '$100',
    per: '/year',
    uses: '5,000 uses',
    description: 'For teams and businesses that rely on frequent and high-volume AI response validation.',
    planId: 'business',
    cta: 'Upgrade to Business',
  },
];

const PricingPage: React.FC<PricingPageProps> = ({ onPlanSelected }) => {
  const { user, selectPlan } = useAuth();

  const handleSelectPlan = (planId: Plan) => {
    selectPlan(planId);
    onPlanSelected();
  };

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Choose Your Plan
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          Unlock more features and increase your usage limits.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-gray-800/50 p-8 rounded-2xl border ${
              plan.highlight ? 'border-cyan-500' : 'border-gray-700'
            } shadow-2xl flex flex-col relative overflow-hidden`}
          >
            {plan.highlight && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-cyan-500 text-white font-bold text-sm rounded-bl-lg">
                    POPULAR
                </div>
            )}
            <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            <div className="my-4">
              <span className="text-5xl font-extrabold text-white">{plan.price}</span>
              <span className="text-gray-400">{plan.per}</span>
            </div>
            <p className="text-cyan-400 font-semibold mb-6">{plan.uses}</p>
            <p className="text-gray-400 mb-8 flex-grow">{plan.description}</p>
            <button
              onClick={() => handleSelectPlan(plan.planId as Plan)}
              disabled={user?.plan === plan.planId}
              className={`w-full py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
                user?.plan === plan.planId
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : plan.highlight
                  ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                  : 'text-gray-200 bg-gray-700/50 border border-gray-600 hover:bg-gray-700'
              }`}
            >
              {user?.plan === plan.planId ? 'Current Plan' : plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
