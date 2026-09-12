import React from 'react';
import { MailOpen, Sparkles, Volume2 } from 'lucide-react';
import { BalineseOmSymbol, FrangipaniFlower, BalineseGateOrnament, BalineseCorner } from './BalineseOrnaments';
import { RyujinPhotoFrame } from './RyujinPhotoFrame';
import balineseGate from '../assets/images/balinese_gate_1789187668632.jpg';

interface CoverPageProps {
  guestName: string;
  onOpenInvitation: () => void;
  onOpenAdminGenerator: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  guestName,
  onOpenInvitation,
  onOpenAdminGenerator,
}) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#1A120B]">
      {/* Background Image with Warm Balinese Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={balineseGate}
          alt="Candi Bentar Bali"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-105 filter blur-[1.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/90 via-[#2A1510]/80 to-[#1A120B]/95" />
        {/* Subtle decorative radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Card Container */}
      <div className="relative z-20 w-full max-w-md my-auto bg-[#FAF7EE]/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[#D4AF37]/60 text-center flex flex-col items-center">
        {/* Balinese Corner Accents */}
        <BalineseCorner position="top-left" className="absolute -top-1 -left-1 w-10 h-10 text-[#D4AF37]" />
        <BalineseCorner position="top-right" className="absolute -top-1 -right-1 w-10 h-10 text-[#D4AF37]" />
        <BalineseCorner position="bottom-left" className="absolute -bottom-1 -left-1 w-10 h-10 text-[#D4AF37]" />
        <BalineseCorner position="bottom-right" className="absolute -bottom-1 -right-1 w-10 h-10 text-[#D4AF37]" />

        {/* Sacred Ongkara Header */}
        <div className="flex flex-col items-center gap-1.5 mb-3">
          <BalineseOmSymbol className="w-8 h-8 text-[#881337] drop-shadow-sm" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#881337]/90 font-balinese">
            Om Swastyastu
          </span>
        </div>

        {/* Title of Ceremony */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#78350F]">
            Undangan Upacara
          </p>
          <h1 className="text-xl sm:text-2xl font-bold font-balinese text-[#451A03] tracking-wide mt-1">
            Tigang Oton (Mepetik)
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-bold font-balinese text-[#881337]">
              Ryujin Satria
            </h2>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
        </div>

        {/* Gate Ornament above Portrait */}
        <BalineseGateOrnament className="w-48 h-6 text-[#D4AF37] mb-2 opacity-90" />

        {/* Ryujin's Authentic Portrait with Balinese Ceremonial Golden Border */}
        <div className="my-2">
          <RyujinPhotoFrame size="md" />
        </div>

        {/* Guest Name Greeting section (Dynamic from URL as requested in PRD 6.1 & 6.2) */}
        <div className="w-full my-4 px-4 py-3.5 bg-gradient-to-b from-[#FFFDF7] to-[#F5EFE0] rounded-xl border border-[#D4AF37]/40 shadow-inner">
          <p className="text-xs text-[#78350F]/85 font-medium tracking-wide">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p
            id="cover-guest-name"
            className="text-lg sm:text-xl font-bold font-balinese text-[#881337] mt-1 break-words leading-tight"
          >
            {guestName}
          </p>
          <p className="text-[11px] text-[#523829] mt-1.5 leading-relaxed italic">
            "Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara Tigang Oton (Mepetik) Putra Kami"
          </p>
        </div>

        {/* Interactive "Buka Undangan" Button (Triggers Audio & transitions) */}
        <button
          id="btn-buka-undangan"
          onClick={onOpenInvitation}
          className="group relative w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#881337] hover:from-[#9F1239] hover:to-[#701A1A] text-[#FAF7EE] font-semibold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl border border-[#D4AF37]/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
        >
          <MailOpen className="w-5 h-5 text-[#FDE047] group-hover:rotate-12 transition-transform duration-300" />
          <span className="tracking-wider uppercase font-balinese font-bold">
            Buka Undangan
          </span>
          <Sparkles className="w-4 h-4 text-[#FDE047] animate-pulse" />
        </button>

        {/* Audio notification note */}
        <div className="flex items-center gap-1.5 mt-3 text-[11px] text-[#78350F]/70">
          <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Disertai iringan musik Balinese Harmony</span>
        </div>

        {/* Family Admin generator link button */}
        <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 w-full flex items-center justify-center">
          <button
            onClick={onOpenAdminGenerator}
            className="text-[11px] text-[#881337] hover:text-[#500724] font-medium flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>🔗 Buat link undangan nama tamu lainnya</span>
          </button>
        </div>
      </div>
    </div>
  );
};
