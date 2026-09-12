import React from 'react';
import { Sparkles, Heart, ShieldCheck } from 'lucide-react';
import { BalineseOmSymbol, PatraDivider, FrangipaniFlower } from './BalineseOrnaments';
import { RyujinPhotoFrame } from './RyujinPhotoFrame';

export const AboutCeremony: React.FC = () => {
  return (
    <section className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="bg-[#FAF7EE] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden text-center">
        {/* Decorative corner flowers */}
        <div className="absolute -top-3 -left-3 opacity-60 pointer-events-none">
          <FrangipaniFlower className="w-8 h-8" />
        </div>
        <div className="absolute -bottom-3 -right-3 opacity-60 pointer-events-none">
          <FrangipaniFlower className="w-8 h-8" />
        </div>

        {/* Sacred Header */}
        <div className="flex justify-center mb-2">
          <BalineseOmSymbol className="w-7 h-7 text-[#881337]" />
        </div>
        <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#881337] font-balinese">
          Makna Filosofi
        </span>
        <h2 className="text-xl sm:text-2xl font-bold font-balinese text-[#451A03] mt-1">
          Upacara Tigang Oton (Mepetik)
        </h2>
        <PatraDivider className="my-2.5" />

        {/* Small photo & description */}
        <div className="flex items-center justify-center my-4">
          <RyujinPhotoFrame size="sm" />
        </div>

        <p className="text-sm sm:text-base text-[#451A03] font-bold font-balinese tracking-wide">
          Ryujin Satria
        </p>

        <p className="text-xs sm:text-sm text-[#523829] leading-relaxed mt-2 text-justify sm:text-center">
          Dalam tradisi Hindu Bali, <em>Otonan</em> diperingati setiap 210 hari (6 bulan Pawukon). 
          <strong> Upacara Tigang Oton (Mepetik)</strong> (630 hari / 3 kali otonan) merupakan upacara suci pemotongan rambut pertama (mepetik) sekaligus tonggak suci perjalanan tumbuh kembang sang buah hati menuju masa kanak-kanak, sebagai wujud syukur atas anugerah keselamatan, kesehatan, serta pembersihan lahiriah dan batiniah.
        </p>

        {/* 3 Core Blessings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 text-left">
          <div className="bg-[#FFFDF7] p-3 rounded-xl border border-[#E5C378]/50 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#881337]">Penyucian</p>
              <p className="text-[11px] text-[#78350F]/80">Membersihkan pengaruh negatif lahir & batin</p>
            </div>
          </div>

          <div className="bg-[#FFFDF7] p-3 rounded-xl border border-[#E5C378]/50 flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-[#881337] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#881337]">Keselamatan</p>
              <p className="text-[11px] text-[#78350F]/80">Doa memohon panjang umur & keteguhan budi pekerti</p>
            </div>
          </div>

          <div className="bg-[#FFFDF7] p-3 rounded-xl border border-[#E5C378]/50 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#881337]">Perlindungan</p>
              <p className="text-[11px] text-[#78350F]/80">Memohon perlindungan Sang Hyang Widhi Wasa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
