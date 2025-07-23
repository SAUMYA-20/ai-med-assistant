"use client";

import React from "react";
import DoctorAgentList from "../_components/DoctorAgentList";
import AddNewSessionDialog from "../_components/AddNewSessionDialog";

export default function Workspace() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 md:px-6 lg:px-8 py-8">
      {/* 🔹 Dashboard Header */}
      <div
        className="w-full max-w-7xl h-56 sm:h-64 md:h-80 lg:h-[400px] bg-cover bg-center border border-purple-400 rounded-2xl shadow-2xl mb-8 mt-10 relative"
        style={{
          backgroundImage: "url('/front.png')",
        }}
      >
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
          <AddNewSessionDialog />
        </div>
      </div>

      {/* 🔹 Doctor Agent List */}
      <DoctorAgentList />
    </div>
  );
}
