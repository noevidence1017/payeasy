"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Wallet, Shield, RefreshCw, Download } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RoommateTable from "@/components/escrow/RoommateTable";

export default function EscrowDashboard({ params }: { params: { contractId: string } }) {
  const contractId = params.contractId;

  return (
    <main aria-label="Escrow Dashboard" className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-accent-500/10 text-accent-400 text-xs font-bold uppercase tracking-wider border border-accent-500/20">
                  Active Escrow
                </span>
                <span className="text-dark-500 text-xs font-mono">ID: {contractId}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Rent <span className="gradient-text">Escrow</span>
              </h1>
            </div>

            {/* Action Buttons - Full width on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button className="btn-secondary !w-full sm:!w-auto !justify-center !py-3">
                <RefreshCw size={16} />
                Check Status
              </button>
              <button className="btn-primary !w-full sm:!w-auto !justify-center !py-3">
                <Wallet size={16} />
                Contribute Share
              </button>
            </div>
          </div>

          {/* Main Grid - Single column on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Stats Overview */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-dark-400 text-sm font-medium mb-1">Total Rent Amount</h3>
                <div className="text-4xl font-bold text-white mb-6">$1,500.00</div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-dark-400">Progress</span>
                      <span className="text-accent-400 font-bold">50% Funded</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-500 to-accent-500 w-1/2" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <div className="text-xs text-dark-500 mb-1">Funded</div>
                      <div className="text-lg font-semibold text-white">$750.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-dark-500 mb-1">Remaining</div>
                      <div className="text-lg font-semibold text-white">$750.00</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Shield size={24} />
                </div>
                <div>
                  <div className="text-xs text-dark-500 uppercase tracking-widest font-bold">Deadline</div>
                  <div className="text-white font-semibold">May 01, 2026 (5 days left)</div>
                </div>
              </div>

              {/* Mobile Action Buttons - Visible only on small screens if needed, 
                  but we already have them in the header */}
              <div className="sm:hidden space-y-3 pt-4">
                <button className="btn-secondary !w-full !justify-center !py-4 !text-base">
                  <Download size={18} />
                  Agreement PDF
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className="lg:col-span-2">
              <RoommateTable />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
