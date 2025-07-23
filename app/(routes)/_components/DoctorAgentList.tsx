'use client';

import React from 'react';
import { AIDoctorAgents } from '@/shared/list';
import DoctorAgentCard from './DoctorAgentCard';

const DoctorAgentList = () => {
  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 py-10 bg-gradient-to-br from-black via-black to-purple-950 rounded-2xl shadow-2xl border border-purple-200">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text mb-8 text-center">
        AI Doctor Agents
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {AIDoctorAgents.map((agent) => (
          <DoctorAgentCard
            key={agent.id}
            doctor={agent}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorAgentList;
