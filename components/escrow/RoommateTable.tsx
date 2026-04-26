"use client";

import React from "react";

interface Roommate {
  id: string;
  name: string;
  address: string;
  share: number;
  paid: number;
  status: "Paid" | "Pending" | "Partially Paid";
}

const mockRoommates: Roommate[] = [
  {
    id: "1",
    name: "Alex Johnson",
    address: "GBX...1234",
    share: 500,
    paid: 500,
    status: "Paid",
  },
  {
    id: "2",
    name: "Sarah Smith",
    address: "GAY...5678",
    share: 500,
    paid: 250,
    status: "Partially Paid",
  },
  {
    id: "3",
    name: "Mike Ross",
    address: "GCZ...9012",
    share: 500,
    paid: 0,
    status: "Pending",
  },
];

export default function RoommateTable() {
  return (
    <div className="w-full glass-card overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <h3 className="text-xl font-bold text-white">Roommates</h3>
        <p className="text-sm text-dark-400">Contribution status for this escrow agreement.</p>
      </div>
      
      {/* Horizontal scroll container for mobile */}
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-xs font-semibold text-dark-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-dark-300 uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-xs font-semibold text-dark-300 uppercase tracking-wider">Share</th>
              <th className="px-6 py-4 text-xs font-semibold text-dark-300 uppercase tracking-wider">Paid</th>
              <th className="px-6 py-4 text-xs font-semibold text-dark-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockRoommates.map((roommate) => (
              <tr key={roommate.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{roommate.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-xs text-brand-400 font-mono">{roommate.address}</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">${roommate.share}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">${roommate.paid}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    roommate.status === "Paid" 
                      ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                      : roommate.status === "Partially Paid"
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {roommate.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-brand-500/5 text-center lg:hidden">
        <p className="text-[10px] text-brand-300 uppercase tracking-widest font-semibold">
          ← Swipe to view more details →
        </p>
      </div>
    </div>
  );
}
