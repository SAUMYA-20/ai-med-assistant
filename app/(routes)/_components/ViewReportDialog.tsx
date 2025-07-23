'use client';

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "../dashboard/medical-agent/[sessionId]/page";
import moment from "moment";

type Props = {
  record: SessionDetail;
};

const ViewReportDialog = ({ record }: Props) => {
  const { selectedDoctor, notes, createdAt, report } = record;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-purple-400 hover:text-purple-300"
        >
          View Report
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-black/90 border border-purple-500/30 shadow-2xl backdrop-blur-md max-w-3xl w-full p-6 rounded-xl space-y-4 overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl text-purple-300 mb-4">
            Medical AI Voice Agent Report
          </DialogTitle>
          <DialogDescription className="text-sm text-purple-400">
            AI-generated summary of your recent consultation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-white">
          {/* Session Info */}
          <section>
            <h3 className="text-lg text-purple-400 font-semibold mb-2">Session Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><strong>Doctor:</strong> {selectedDoctor?.specialist || "N/A"}</p>
              <p><strong>User:</strong> Anonymous</p>
              <p><strong>Consulted On:</strong> {moment(createdAt).format("MMMM Do YYYY, h:mm a")}</p>
              <p><strong>Agent:</strong> {selectedDoctor?.name || "N/A"}</p>
            </div>
          </section>

          {/* Chief Complaint */}
          <section>
            <h3 className="text-lg text-purple-400 font-semibold mb-2">Chief Complaint</h3>
            <p className="text-sm">{notes || "No complaint noted."}</p>
          </section>

          {/* Summary */}
          <section>
            <h3 className="text-lg text-purple-400 font-semibold mb-2">Summary</h3>
            <p className="text-sm">{report?.summary || "No summary available."}</p>
          </section>

          {/* Symptoms */}
          <section>
            <h3 className="text-lg text-purple-400 font-semibold mb-2">Symptoms</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {(report?.symptoms || []).map((symptom: string, idx: number) => (
                <li key={idx}>{symptom}</li>
              ))}
            </ul>
          </section>

          {/* Medications */}
          <section>
            <h3 className="text-lg text-purple-400 font-semibold mb-2">Medications</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {(report?.medications || []).map((med: string, idx: number) => (
                <li key={idx}>{med}</li>
              ))}
            </ul>
          </section>

          {/* Recommendations */}
          <section>
            <h3 className="text-lg text-purple-400 font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {(report?.recommendations || []).map((rec: string, idx: number) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </section>

          {/* Duration & Severity */}
          <section className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Duration:</strong> {report?.duration || "Not specified"}</p>
            <p><strong>Severity:</strong> {report?.severity || "Not specified"}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportDialog;
