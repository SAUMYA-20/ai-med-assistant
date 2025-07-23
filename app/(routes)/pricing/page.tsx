import { PricingTable } from '@clerk/nextjs';
import React from 'react';

const Billing = () => {
  return (
    <div className="mt-20 px-6 md:px-12 lg:px-24 text-center">
      <div className="bg-gradient-to-b from-black via-purple-900 to-black rounded-2xl shadow-lg border border-purple-700/30 py-10 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-300 mb-4">
          Subscription Plans
        </h2>
        <p className="text-purple-400 mb-8 max-w-2xl mx-auto">
          Choose the best plan for your healthcare AI assistant needs. Upgrade or downgrade anytime.
        </p>

        <div className="flex justify-center">
          <PricingTable />
        </div>
      </div>
    </div>
  );
};

export default Billing;
