/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { parseGuestFromUrl } from './utils/urlHelper';
import { gamelanAudio } from './utils/audioPlayer';
import { GuestInfo } from './types';
import { CoverPage } from './components/CoverPage';
import { AudioPlayerButton } from './components/AudioPlayerButton';
import { CountdownTimer } from './components/CountdownTimer';
import { EventDetails } from './components/EventDetails';
import { AboutCeremony } from './components/AboutCeremony';
import { DigitalEnvelope } from './components/DigitalEnvelope';
import { LinkGeneratorModal } from './components/LinkGeneratorModal';
import { FallingPetals } from './components/FallingPetals';
import {
  BalineseOmSymbol,
  PatraDivider,
  PolengBorder,
  BalineseGateOrnament,
  BalineseCorner,
  FrangipaniFlower
} from './components/BalineseOrnaments';
import { RyujinPhotoFrame } from './components/RyujinPhotoFrame';
import balineseGate from './assets/images/balinese_gate_1789187668632.jpg';
import { ChevronUp, Share2, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    slug: '',
    name: 'Bapak/Ibu/Saudara/i sekalian',
    isCustom: false,
  });
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Parse guest from URL on mount and when popstate changes
  useEffect(() => {
    const handleUrlChange = () => {
      const parsed = parseGuestFromUrl();
      setGuestInfo(parsed);
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleOpenInvitation = () => {
    // Start Gamelan audio via user gesture
    gamelanAudio.play();
    setIsOpened(true);
    // Smooth scroll down to main content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGuestFromGenerator = (name: string, slug: string) => {
    setGuestInfo({
      name,
      slug,
      isCustom: true,
    });
    // Update browser URL query/path cleanly without full reload
    const newUrl = `${window.location.origin}/?to=${slug}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#2A1E17] font-sans antialiased relative selection:bg-[#D4AF37]/30 selection:text-[#881337]">
      {/* Gentle falling Balinese kamboja petals in background */}
      <FallingPetals />

      {/* Floating Audio Player Button (Accessible throughout) */}
      {isOpened && <AudioPlayerButton />}

      {/* VIEW 1: COVER PAGE (If not opened yet) */}
      {!isOpened ? (
        <CoverPage
          guestName={guestInfo.name}
          onOpenInvitation={handleOpenInvitation}
          onOpenAdminGenerator={() => setIsAdminModalOpen(true)}
        />
      ) : (
        /* VIEW 2: MAIN INVITATION DETAIL PAGE */
        <main className="relative z-10 w-full overflow-hidden animate-in fade-in duration-700">
          {/* Top Quick Bar */}
          <div className="fixed top-4 left-4 z-40">
            <button
              onClick={() => setIsOpened(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F1610]/80 hover:bg-[#1F1610] text-[#FAF7EE] text-xs font-medium backdrop-blur-md border border-[#D4AF37]/50 shadow-md transition-all active:scale-95"
              aria-label="Kembali ke Cover"
            >
              <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
              <span>Cover</span>
            </button>
          </div>

          {/* Hero Banner Section */}
          <header className="relative w-full py-16 sm:py-24 px-4 text-center overflow-hidden bg-[#1A120B]">
            {/* Background image & gradient overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={balineseGate}
                alt="Candi Bentar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-30 filter blur-[1px]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/90 via-[#2A1510]/85 to-[#FAF7EE]" />
            </div>

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
              {/* Sacred Balinese Ongkara */}
              <BalineseOmSymbol className="w-10 h-10 text-[#FDE047] drop-shadow-md mb-2 animate-pulse" />
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#FDE047] font-balinese">
                Om Swastyastu
              </p>

              <BalineseGateOrnament className="w-56 h-8 text-[#D4AF37] my-3 opacity-90" />

              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E5C378] font-medium">
                Undangan Upacara
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-balinese text-[#FFFDF7] tracking-wider mt-1 drop-shadow-md">
                Tigang Oton (Mepetik)
              </h1>

              <div className="w-full my-4 flex items-center justify-center gap-3">
                <span className="h-[1px] w-12 bg-[#D4AF37]" />
                <span className="text-xl sm:text-2xl font-bold font-balinese text-[#FBBF24]">
                  Ryujin Satria
                </span>
                <span className="h-[1px] w-12 bg-[#D4AF37]" />
              </div>

              {/* Photo Frame */}
              <div className="my-3">
                <RyujinPhotoFrame size="md" />
              </div>

              {/* Personalized Guest Badge */}
              <div className="mt-4 px-5 py-2.5 rounded-full bg-[#1A120B]/80 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
                <span className="text-xs text-[#FAF7EE]">
                  Yth. <strong className="text-[#FDE047] font-balinese">{guestInfo.name}</strong>
                </span>
              </div>
            </div>
          </header>

          {/* Poleng Border Ribbon */}
          <PolengBorder />

          {/* SECTION 1: COUNTDOWN TIMER */}
          <CountdownTimer targetDateISO="2026-09-16T10:00:00+08:00" />

          {/* SECTION 2: EVENT DETAILS & MAP */}
          <EventDetails />

          {/* SECTION 3: MAKNA UPACARA 3 OTON */}
          <AboutCeremony />

          {/* SECTION 4: AMPLOP DIGITAL (E-ANGPAO QRIS DANA) */}
          <DigitalEnvelope />

          {/* SECTION 5: BALINESE CLOSING & PRAYER */}
          <footer className="w-full max-w-xl mx-auto px-4 py-12 text-center relative">
            <div className="bg-[#FAF7EE] border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <BalineseCorner position="top-left" className="absolute -top-1 -left-1 w-8 h-8 text-[#D4AF37]" />
              <BalineseCorner position="top-right" className="absolute -top-1 -right-1 w-8 h-8 text-[#D4AF37]" />
              <BalineseCorner position="bottom-left" className="absolute -bottom-1 -left-1 w-8 h-8 text-[#D4AF37]" />
              <BalineseCorner position="bottom-right" className="absolute -bottom-1 -right-1 w-8 h-8 text-[#D4AF37]" />

              <BalineseOmSymbol className="w-8 h-8 text-[#881337] mx-auto mb-2" />
              <h3 className="text-lg sm:text-xl font-bold font-balinese text-[#881337]">
                Om Shanti, Shanti, Shanti Om
              </h3>
              <PatraDivider className="my-3" />

              <p className="text-xs sm:text-sm text-[#523829] leading-relaxed max-w-md mx-auto">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada putra kami tercinta.
              </p>

              <div className="mt-6 pt-4 border-t border-[#D4AF37]/30">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#78350F]/90">
                  Kami yang berbahagia,
                </p>
                <p className="text-base sm:text-lg font-bold font-balinese text-[#451A03] mt-1">
                  Keluarga Besar Ryujin Satria
                </p>
                <p className="text-[11px] text-[#78350F]/70 mt-1">
                  Balai Banjar Beng, Marga, Tabanan, Bali
                </p>
              </div>

              {/* Family Admin Link Generator Button */}
              <div className="mt-6 pt-4 border-t border-dashed border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  id="btn-admin-link-generator"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-100/70 hover:bg-amber-100 text-[#881337] text-xs font-semibold border border-[#D4AF37] transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Fitur Keluarga: Buat Link Undangan Tamu Baru</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-[#78350F]/60 flex items-center justify-center gap-1">
              <span>Upacara Tigang Oton (Mepetik) Ryujin Satria</span>
              <span>•</span>
              <span>16 September 2026</span>
            </div>
          </footer>
        </main>
      )}

      {/* Guest Link Generator Modal for Family Admin */}
      <LinkGeneratorModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSelectGuest={handleSelectGuestFromGenerator}
      />
    </div>
  );
}
