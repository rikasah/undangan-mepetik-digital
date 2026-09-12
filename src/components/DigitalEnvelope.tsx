import React, { useState } from 'react';
import { Copy, Check, QrCode, Sparkles, ShieldCheck, Download, Maximize2, X, CheckCircle2 } from 'lucide-react';
import { PatraDivider, FrangipaniFlower } from './BalineseOrnaments';
import qrisImage from '../assets/images/qris_ryujin.jpg';

export const DigitalEnvelope: React.FC = () => {
  const [copiedNmid, setCopiedNmid] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const nmidCode = 'ID1026592404838';

  const handleCopyNmid = () => {
    navigator.clipboard.writeText(nmidCode).then(() => {
      setCopiedNmid(true);
      setTimeout(() => setCopiedNmid(false), 2500);
    });
  };

  return (
    <section className="w-full max-w-xl mx-auto px-4 py-8" id="amplop-digital">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#881337] font-balinese">
          Tanda Kasih & Doa Restu
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-balinese text-[#451A03] mt-1">
          Amplop Digital (QRIS)
        </h2>
        <PatraDivider className="my-3" />
        <p className="text-xs sm:text-sm text-[#523829] max-w-md mx-auto leading-relaxed italic px-2">
          "Doa restu Bapak/Ibu/Saudara/i sekalian merupakan anugerah yang paling utama bagi kami. Namun jika berkenan memberikan tanda kasih secara cashless, dapat melakukan scan kode QRIS resmi di bawah ini 🙏"
        </p>
      </div>

      <div className="bg-[#FAF7EE] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Decorative corner flowers */}
        <div className="absolute top-3 left-3 opacity-60 pointer-events-none">
          <FrangipaniFlower className="w-7 h-7" />
        </div>
        <div className="absolute top-3 right-3 opacity-60 pointer-events-none">
          <FrangipaniFlower className="w-7 h-7" />
        </div>

        {/* OFFICIAL QRIS CARD */}
        <div className="p-5 sm:p-7 rounded-2xl bg-[#FFFDF7] border-2 border-[#D4AF37] shadow-lg relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#881337]/10 text-[#881337]">
                <QrCode className="w-5 h-5 text-[#881337]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#881337] font-bold font-balinese">
                  QRIS Pembayaran Resmi
                </p>
                <p className="text-xs text-[#523829] font-medium">
                  Satu QRIS untuk Semua Bank & E-Wallet
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wide border border-emerald-300">
              Siap Scan
            </span>
          </div>

          {/* QR Image & Merchant Info */}
          <div className="flex flex-col items-center text-center">
            {/* Merchant Name & NMID */}
            <div className="mb-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#881337] font-balinese">
                Penerima
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-balinese text-[#451A03] mt-0.5">
                Ryujin
              </h3>
              <div className="inline-flex items-center gap-2 mt-1.5 px-3 py-1 rounded-lg bg-[#FAF7EE] border border-[#D4AF37]/50 text-xs text-[#78350F] font-mono">
                <span>NMID: <strong>{nmidCode}</strong></span>
                <button
                  onClick={handleCopyNmid}
                  className="p-1 hover:bg-[#881337]/10 rounded transition-colors text-[#881337] flex items-center gap-1 cursor-pointer"
                  title="Salin NMID"
                  aria-label="Salin NMID"
                >
                  {copiedNmid ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] text-emerald-700 font-sans font-semibold">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-sans font-semibold">Salin</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-[#78350F]/70 font-semibold mt-1">
                Terminal: A01 • Standar Nasional GPN
              </p>
            </div>

            {/* QRIS Image Frame with Zoom Overlay */}
            <div
              onClick={() => setIsQrModalOpen(true)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg bg-white p-3 max-w-[280px] w-full transition-all hover:scale-102 hover:shadow-2xl"
            >
              <img
                src={qrisImage}
                alt="QRIS Ryujin Standar Pembayaran Nasional"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 backdrop-blur-[1px]">
                <Maximize2 className="w-8 h-8 mb-1 text-[#FDE047]" />
                <span className="text-xs font-bold font-balinese tracking-wider">
                  Klik untuk Perbesar QRIS
                </span>
              </div>
            </div>

            {/* Action Buttons under QR */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5 w-full">
              <button
                id="btn-zoom-qris"
                onClick={() => setIsQrModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF7EE] hover:bg-[#F5EFE0] text-[#78350F] text-xs font-bold border border-[#D4AF37] shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#881337]" />
                <span>Perbesar QR Code</span>
              </button>

              <a
                id="btn-download-qris"
                href={qrisImage}
                download="QRIS_Ryujin.jpg"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#881337] to-[#9F1239] hover:from-[#9F1239] hover:to-[#701A1A] text-[#FAF7EE] text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-[#FDE047]" />
                <span>Simpan Gambar QRIS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Security & Gratitude Note */}
        <div className="mt-6 pt-3 border-t border-[#D4AF37]/30 flex items-center justify-center gap-2 text-xs text-[#78350F]/80 text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Doa restu tulus telah kami terima dengan penuh rasa syukur. Matur Suksma 🙏</span>
        </div>
      </div>

      {/* FULLSCREEN QRIS MODAL */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FAF7EE] border-2 border-[#D4AF37] rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-[#881337]/10 text-[#881337] hover:bg-[#881337]/20 transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="text-lg font-bold font-balinese text-[#881337] mb-1">
              QRIS Standar Nasional
            </h4>
            <p className="text-xs text-[#78350F] mb-3">
              Merchant: <strong>Ryujin</strong> • NMID: <strong>{nmidCode}</strong>
            </p>

            <div className="p-2 bg-white rounded-2xl border-2 border-[#D4AF37] shadow-inner inline-block mx-auto mb-4">
              <img
                src={qrisImage}
                alt="QRIS Ryujin Full"
                referrerPolicy="no-referrer"
                className="w-full max-w-[260px] h-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              <a
                href={qrisImage}
                download="QRIS_Ryujin.jpg"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#881337] hover:bg-[#701A1A] text-[#FAF7EE] text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-[#FDE047]" />
                <span>Simpan Gambar</span>
              </a>

              <button
                onClick={() => setIsQrModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#FAF7EE] hover:bg-amber-100 text-[#78350F] text-xs font-bold border border-[#D4AF37] transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
