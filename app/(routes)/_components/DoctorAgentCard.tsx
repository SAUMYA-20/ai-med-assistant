"use client"
import Image from 'next/image';
import React from 'react';
import AddNewSessionDialog from './AddNewSessionDialog';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@clerk/nextjs';

// Define type inside this file or import it from a shared location
export type doctorAgent = {
  id: number;
  name: string;
  specialist: string;
  description: string;
  rating: number;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired:boolean;
};

const DoctorAgentCard = ({ doctor }: { doctor: doctorAgent }) => {
  const { name, specialist, description, rating, image} = doctor;
  const {has} = useAuth();
  //   @ts-ignore
  const isProUser = has?.({ plan: 'pro' });
  //   @ts-ignore
  const isPremiumUser = has?.({ plan: 'premium' });

  return (
    <div className="relative bg-black/70 backdrop-blur-md border border-purple-500/20 rounded-xl p-5 hover:scale-105 transition-transform shadow-xl overflow-hidden">
      
      {doctor.subscriptionRequired && <Badge className="absolute top-5 left-[-65px] -rotate-45 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-16 py-1 shadow-md z-10">
        Subscription
      </Badge>}

      <div className="flex flex-col items-center gap-3">
        <img
          src={image || '/doctor.png'}
          alt={name}
          width={100}
          height={100}
          className="rounded-full border border-purple-400/40 shadow-lg"
        />
        <h2 className="text-xl font-semibold text-white">{name}</h2>
        <p className="text-purple-300">{specialist}</p>
        <p className="text-sm text-gray-300 text-center">{description}</p>
        <p className="text-yellow-400">⭐ {rating}</p>

        <AddNewSessionDialog />
      </div>
    </div>
  );
};

export default DoctorAgentCard;
