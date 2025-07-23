'use client';

import Image from 'next/image';
import React from 'react';
import AddNewSessionDialog from './AddNewSessionDialog';

// Define type inside this file or import it from a shared location
export type doctorAgent = {
  id: number;
  name: string;
  specialist: string;
  description: string;
  rating: number;
  image: string;
  agentPrompt: string;
};

const SuggestedDoctor = ({ doctor }: { doctor: doctorAgent }) => {
  const { name, specialist, description, rating, image } = doctor;

  return (
    <div className="bg-black/70 backdrop-blur-md border border-purple-500/20 rounded-xl p-5 hover:scale-105 transition-transform shadow-xl">
      <div className="flex flex-col items-center gap-3">
        <img
          src={image || '/doctor.png'}
          alt={name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <h2 className="text-xl font-semibold text-white">{name}</h2>
        <p className="text-purple-300">{specialist}</p>
        <p className="text-sm text-gray-300 text-center">{description}</p>
        <p className="text-yellow-400">⭐ {rating}</p>

        {/* You can pass the doctor to the dialog if needed */}
        {/* <AddNewSessionDialog /> */}
      </div>
    </div>
  );
};

export default SuggestedDoctor;