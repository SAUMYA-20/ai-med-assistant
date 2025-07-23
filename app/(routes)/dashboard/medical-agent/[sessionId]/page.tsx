"use client";

import { doctorAgent } from "@/app/(routes)/_components/DoctorAgentCard";
import axios from "axios";
import { Circle, PhoneCallIcon, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Vapi from "@vapi-ai/web";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  name: string;
  image: string;
  sessionId: string;
  report: any;
  notes: string;
  selectedDoctor: doctorAgent | null;
  createdAt: string;
};

type Message = {
  role: string;
  text: string;
};

const MedicalAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isEndingCall, setIsEndingCall] = useState(false);
  const [liveTranscripts, setLiveTranscripts] = useState<string>("");
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [callStartTime, setCallStartTime] = useState<number | null>(null);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [liveTime, setLiveTime] = useState<string>("00:00");

  const router = useRouter();
  const vapiRef = useRef<any>(null);

  const handleCallStart = useCallback(() => {
    setIsConnected(true);
    setCallStartTime(Date.now());
    console.log("Voice conversation started");
  }, []);

  const handleCallEnd = useCallback(() => {
    setIsConnected(false);
    if (callStartTime) {
      const duration = Math.floor((Date.now() - callStartTime) / 1000);
      setCallDuration(duration);
    }
    console.log("Voice conversation ended");
  }, [callStartTime]);

  const handleMessage = useCallback((msg: any) => {
    if (msg.type === "transcript") {
      const { role, transcript, transcriptType } = msg;

      if (transcriptType === "partial") {
        setLiveTranscripts(transcript);
        setCurrentRole(role);
      } else if (transcriptType === "final") {
        setMessages((prev) => [...prev, { role, text: transcript }]);
        setLiveTranscripts("");
        setCurrentRole(null);
      }
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      GetSessionDetails();
    }

    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

    return () => {
      vapiRef.current?.stop();
      vapiRef.current?.off("call-start", handleCallStart);
      vapiRef.current?.off("call-end", handleCallEnd);
      vapiRef.current?.off("message", handleMessage);
    };
  }, [sessionId, handleCallStart, handleCallEnd, handleMessage]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isConnected && callStartTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
        const seconds = String(elapsed % 60).padStart(2, "0");
        setLiveTime(`${minutes}:${seconds}`);
      }, 1000);
    } else {
      setLiveTime("00:00");
    }

    return () => clearInterval(interval);
  }, [isConnected, callStartTime]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get(`/api/session-chat?sessionId=${sessionId}`);
      setSessionDetails(result.data);
    } catch (error) {
      console.error("Error fetching session details:", error);
    } finally {
      setLoading(false);
    }
  };

  const VapiAgentConfig = {
    name: "AI MEDICAL DOCTOR VOICE AGENT",
    firstMessage: "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health issues.",
    transcriber: {
      provider: "assembly-ai",
      language: "en",
    },
    voice: {
      provider: "playht",
      voiceId: sessionDetails?.selectedDoctor?.voiceId,
    },
    model: {
      provider: "openai",
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: sessionDetails?.selectedDoctor?.agentPrompt,
        },
      ],
    },
  };

  const StartCall = () => {
    if (!vapiRef.current) return;

    vapiRef.current.start( VapiAgentConfig );

    vapiRef.current.on("call-start", handleCallStart);
    vapiRef.current.on("call-end", handleCallEnd);
    vapiRef.current.on("message", handleMessage);
  };

  const EndCall = async () => {
    setIsEndingCall(true);
    try {
      if (!vapiRef.current) return;

      vapiRef.current.stop();
      vapiRef.current.off("call-start", handleCallStart);
      vapiRef.current.off("call-end", handleCallEnd);
      vapiRef.current.off("message", handleMessage);

      setIsConnected(false);
      setLiveTranscripts("");
      setCurrentRole(null);

      await GenerateReport();
      toast.success('Your report is generated');
      router.replace('/history');
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsEndingCall(false);
    }
  };

  const GenerateReport = async () => {
    const result = await axios.post("/api/medical-report", {
      messages: messages,
      sessionDetails: sessionDetails,
      sessionId: sessionId,
      callDuration: callDuration, 
    });
    console.log(result.data);
    return result.data;
  };

  if (loading || !sessionDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading session details...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-[#2e004f] via-[#4b0082] to-[#1a002e]">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/30 p-8 text-white">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium border border-red-500 text-red-400 rounded-full px-3 py-1 flex items-center gap-2">
            <Circle
              className={`w-3 h-3 ${
                isConnected ? "fill-green-500 text-green-500" : "fill-red-500 text-red-500"
              }`}
            />
            {isConnected ? "Connected" : "Not Connected"}
          </span>
          <span className="text-purple-300 text-sm">{liveTime}</span>
        </div>

        {/* Doctor Profile */}
        {sessionDetails.selectedDoctor ? (
          <div className="flex flex-col items-center justify-center mb-8">
            <Image
              src={sessionDetails.selectedDoctor.image || "/doctor.png"}
              alt={sessionDetails.selectedDoctor.name || "Doctor"}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border-2 border-purple-400 shadow-lg"
            />
            <h2 className="text-xl font-semibold mt-4 text-purple-100">
              {sessionDetails.selectedDoctor.name}
            </h2>
            <p className="text-purple-300">
              {sessionDetails.selectedDoctor.specialist}
            </p>
            <p className="text-sm text-purple-400 mt-1">
              {sessionDetails.selectedDoctor.description}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-purple-400 flex items-center justify-center bg-purple-900/20">
              <span className="text-white">No Doctor Selected</span>
            </div>
            <h2 className="text-xl font-semibold mt-4 text-purple-100">Loading...</h2>
          </div>
        )}

        {/* Message Section */}
        <div className="mt-12 space-y-2 text-center">
          {messages.slice(-4).map((msg, index) => (
            <p key={index} className="text-purple-400 text-sm italic">
              {msg.role}: {msg.text}
            </p>
          ))}
          {liveTranscripts && (
            <p className="text-purple-100 font-medium">
              {currentRole}: {liveTranscripts}
            </p>
          )}
        </div>

        {/* Bottom Call Button */}
        <div className="flex justify-center mt-10">
          {!isConnected ? (
            <Button
              className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-full shadow-xl flex items-center gap-2"
              onClick={StartCall}
            >
              <PhoneCallIcon className="w-5 h-5" /> Start Call
            </Button>
          ) : (
            <Button
              disabled={isEndingCall}
              className={`bg-red-600 hover:bg-red-700 transition text-white px-6 py-2 rounded-full shadow-xl flex items-center gap-2 ${
                isEndingCall ? "opacity-60 cursor-not-allowed" : ""
              }`}
              onClick={EndCall}
            >
              <PhoneOff className="w-5 h-5" /> {isEndingCall ? "Ending..." : "End Call"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalAgent;
