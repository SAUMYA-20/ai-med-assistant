"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "../dashboard/medical-agent/[sessionId]/page";

export default function HistoryList() {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-black via-black to-purple-950 text-white">
      {loading ? (
        <p>Loading...</p>
      ) : historyList.length === 0 ? (
        <div className="flex flex-col items-center gap-6">
          <Image
            src={"/front.png"}
            alt="No Consultation"
            width={1000}
            height={400}
            className="rounded-2xl shadow-xl"
          />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            No Previous Consultation
          </h2>
          <p className="text-lg text-purple-300 text-center max-w-xl">
            It looks like you haven't had any consultations yet. Start your first consultation now and get connected with expert doctors instantly.
          </p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </div>
  );
}
