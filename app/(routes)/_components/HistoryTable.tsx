import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { SessionDetail } from "../dashboard/medical-agent/[sessionId]/page";
import { Button } from "@/components/ui/button";
import moment from "moment"; 
import ViewReportDialog from "./ViewReportDialog";

type Props = {
  historyList: SessionDetail[];
};

const HistoryTable = ({ historyList }: Props) => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex justify-center pb-5">History</h2>
      <Table>
        <TableCaption>End</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">AI Medical Specialist</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyList.map((record: SessionDetail, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {record.selectedDoctor?.name || "Unknown"}
              </TableCell>
              <TableCell>{record.notes || "N/A"}</TableCell>
              <TableCell>
                {moment(record.createdAt).format("MMM D, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <Button variant={"link"}><ViewReportDialog record={record}/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryTable;
