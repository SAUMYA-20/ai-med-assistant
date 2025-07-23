'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard';
import { useRouter } from 'next/navigation';
import SuggestedDoctor from './SuggestedDoctor';
import { useAuth } from '@clerk/nextjs';
import { SessionDetail } from '../dashboard/medical-agent/[sessionId]/page';

const AddNewSessionDialog = () => {
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const router = useRouter();

  const {has} = useAuth();
  //   @ts-ignore
  const isProUser = has?.({ plan: 'pro' });
  const isPremiumUser = has?.({ plan: 'premium' });
  // console.log(isProUser)
  // console.log(isPremiumUser)
  useEffect(() => {
    GetHistoryList();
  }, []); 

  const GetHistoryList = async () => {
    try {
      const result = await axios.get('/api/session-chat?sessionId=all');
      console.log(result.data);
      setHistoryList(result.data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const consultationsLimitReached = () => {
    if (isPremiumUser) return false; 
    if (isProUser) return historyList.length >= 20;
    return historyList.length >= 10;
  };

  const disableButton = consultationsLimitReached();

  const OnClickNext = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/suggest-doctors', { notes: note });
      const data = result?.data;
      let doctors: doctorAgent[] = [];
      if (Array.isArray(data)) {
        doctors = data;
      } else if (Array.isArray(data?.doctors)) {
        doctors = data.doctors;
      } else if (data) {
        doctors = [data];
      }
      setSuggestedDoctors(doctors);
    } catch (error) {
      console.error('Error fetching doctor suggestion:', error);
      setSuggestedDoctors([]);
    }
    setLoading(false);
  };

  const onStartConsultation = async () => {
  if (!selectedDoctor) return;
  setLoading(true);
  try {
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor:selectedDoctor,
    });

    localStorage.setItem("lastSession", JSON.stringify(result.data));
    router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    console.log('Consultation started successfully:', result.data);
  } catch (error) {
    console.error('Error starting consultation:', error);
  }
  setLoading(false);
};


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disableButton} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full px-6 py-2 text-white">
          Start Consultation
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-black/90 border border-purple-500/30 shadow-2xl backdrop-blur-md max-w-5xl w-full p-6 rounded-xl space-y-6">
        <DialogHeader>
          <DialogTitle className="text-purple-300 text-2xl mb-1">Start New Consultation</DialogTitle>
          <DialogDescription className="text-purple-400 text-base mb-4">
            {suggestedDoctors.length === 0
              ? 'Please describe your symptoms. Our AI doctor will assist you.'
              : 'Select a doctor from the suggestions below:'}
          </DialogDescription>
        </DialogHeader>

        {suggestedDoctors.length === 0 ? (
          <div className="space-y-3">
            <label className="text-white text-sm font-medium">Your Symptoms</label>
            <Textarea
              placeholder="e.g., Fever, headache, body pain..."
              className="h-[180px] bg-black/60 border border-purple-500/20 focus-visible:ring-purple-600 text-white"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
            {suggestedDoctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className={`cursor-pointer rounded-xl transition-all duration-300 ${
                  selectedDoctor?.id === doctor?.id
                    ? 'ring-2 ring-purple-500 scale-105'
                    : 'hover:ring-1 hover:ring-purple-300'
                }`}
              >
                <SuggestedDoctor doctor={doctor} />
              </div>
            ))}
          </div>
        )}

        <DialogFooter className="flex justify-between pt-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="hover:text-purple-400 border border-purple-400 text-white"
            >
              Cancel
            </Button>
          </DialogClose>

          {suggestedDoctors.length === 0 ? (
            <Button
              disabled={!note || loading}
              onClick={OnClickNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {loading && <Loader2 className="animate-spin mr-2" size={16} strokeWidth={2} />}
              Next <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button
              disabled={!selectedDoctor || loading}
              onClick={onStartConsultation}
              className={`text-white ${
                selectedDoctor
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              {loading && <Loader2 className="animate-spin mr-2" size={16} strokeWidth={2} />}
              Start Consultation <ArrowRight className="ml-2" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSessionDialog;