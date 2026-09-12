import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  targetDateISO: string; // e.g. '2026-09-16T10:00:00+08:00'
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDateISO }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDateISO).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateISO]);

  return (
    <div className="w-full max-w-md mx-auto my-6 px-4">
      <div className="bg-[#FAF7EE] border border-[#D4AF37]/50 rounded-2xl p-5 shadow-md relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#D4AF37]/15 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-center gap-2 mb-3 text-[#881337]">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] font-balinese">
            Hitung Mundur Tigang Oton (Mepetik)
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>

        {timeLeft.isPast ? (
          <div className="text-center py-2 text-[#881337] font-semibold text-sm">
            Upacara Sedang / Telah Berlangsung. Suksma atas doa dan kehadirannya! 🙏
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Hari */}
            <div className="bg-[#FFFDF7] border border-[#E5C378]/60 rounded-xl p-2.5 shadow-sm">
              <span className="block text-xl sm:text-2xl font-bold font-balinese text-[#881337]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#78350F]/80">
                Hari
              </span>
            </div>

            {/* Jam */}
            <div className="bg-[#FFFDF7] border border-[#E5C378]/60 rounded-xl p-2.5 shadow-sm">
              <span className="block text-xl sm:text-2xl font-bold font-balinese text-[#881337]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#78350F]/80">
                Jam
              </span>
            </div>

            {/* Menit */}
            <div className="bg-[#FFFDF7] border border-[#E5C378]/60 rounded-xl p-2.5 shadow-sm">
              <span className="block text-xl sm:text-2xl font-bold font-balinese text-[#881337]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#78350F]/80">
                Menit
              </span>
            </div>

            {/* Detik */}
            <div className="bg-[#FFFDF7] border border-[#E5C378]/60 rounded-xl p-2.5 shadow-sm">
              <span className="block text-xl sm:text-2xl font-bold font-balinese text-[#D97706] animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#78350F]/80">
                Detik
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-[#78350F]/80 font-medium">
          <Calendar className="w-3 h-3 text-[#881337]" />
          <span>Rabu, 16 September 2026 • 10.00 WITA</span>
        </div>
      </div>
    </div>
  );
};
