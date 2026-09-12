import React, { useState, useRef, useEffect } from 'react';
import { X, Link as LinkIcon, Copy, Check, MessageSquare, ExternalLink, Sparkles, Camera, Image as ImageIcon } from 'lucide-react';
import { createSlug, generateWhatsAppMessage } from '../utils/urlHelper';
import { getRyujinPhotoUrl, updateRyujinPhoto } from '../utils/photoManager';

interface LinkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGuest: (name: string, slug: string) => void;
}

export const LinkGeneratorModal: React.FC<LinkGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSelectGuest,
}) => {
  const [inputName, setInputName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>(getRyujinPhotoUrl());
  const [photoUpdated, setPhotoUpdated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handlePhotoUpdate = () => {
      setCurrentPhoto(getRyujinPhotoUrl());
    };
    window.addEventListener('ryujin_photo_updated', handlePhotoUpdate);
    return () => window.removeEventListener('ryujin_photo_updated', handlePhotoUpdate);
  }, []);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateRyujinPhoto(result);
        setCurrentPhoto(result);
        setPhotoUpdated(true);
        setTimeout(() => setPhotoUpdated(false), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://undangan-ryujin.com';
  const slug = createSlug(inputName || 'Nama Tamu');
  // Both path based and query-param based for flexibility
  const fullPathUrl = `${currentOrigin}/${slug}`;
  const fullQueryUrl = `${currentOrigin}/?to=${slug}`;

  const sampleNames = [
    'I Made Arya',
    'Ni Kadek Sri Wahyuni',
    'Bapak Wayan Sudira',
    'I Gusti Ngurah Agung',
    'Keluarga Besar Tabanan',
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullPathUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleCopyWaMessage = () => {
    const waText = generateWhatsAppMessage(inputName, fullPathUrl);
    navigator.clipboard.writeText(waText).then(() => {
      setCopiedWa(true);
      setTimeout(() => setCopiedWa(false), 2000);
    });
  };

  const handleApplyPreview = () => {
    if (!inputName.trim()) return;
    onSelectGuest(inputName.trim(), slug);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-[#FAF7EE] border-2 border-[#D4AF37] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#881337]/10 text-[#881337] transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-[#881337]/10 text-[#881337] mb-2">
            <LinkIcon className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h3 className="text-xl font-bold font-balinese text-[#881337]">
            Generator Link Undangan Tamu
          </h3>
          <p className="text-xs text-[#523829] mt-1 max-w-sm mx-auto">
            Keluarga bisa membuat link khusus untuk setiap nama tamu tanpa perlu merubah kode sistem.
          </p>
        </div>

        {/* Input Field */}
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#78350F] mb-1.5">
            Nama Tamu yang Diundang
          </label>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Contoh: I Made Arya, Ni Kadek..."
            className="w-full px-4 py-3 rounded-xl border border-[#D4AF37] bg-white text-[#2A1E17] text-sm focus:outline-none focus:ring-2 focus:ring-[#881337] shadow-inner"
          />
        </div>

        {/* Quick Sample Suggestions */}
        <div className="mb-5">
          <p className="text-[11px] text-[#78350F]/70 font-medium mb-1.5">
            Contoh cepat (klik untuk pilih):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setInputName(name)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-[#D4AF37]/40 text-[#78350F] font-medium transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Generated URL Card */}
        {inputName.trim() && (
          <div className="mb-5 p-4 rounded-2xl bg-[#FFFDF7] border border-[#D4AF37]/60 shadow-sm space-y-2.5">
            <div>
              <p className="text-[11px] font-semibold text-[#78350F] uppercase tracking-wider">
                Tampilan Nama di Cover Undangan:
              </p>
              <p className="text-sm font-bold font-balinese text-[#881337]">
                Kepada Yth. Bapak/Ibu/Saudara/i {inputName}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#78350F] uppercase tracking-wider">
                URL Undangan Resmi:
              </p>
              <p className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 break-all">
                {fullPathUrl}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FAF7EE] hover:bg-amber-100 text-[#78350F] text-xs font-semibold rounded-xl border border-[#D4AF37] transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link'}</span>
              </button>

              <button
                onClick={handleCopyWaMessage}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
              >
                {copiedWa ? <Check className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
                <span>{copiedWa ? 'Pesan WA Tersalin!' : 'Salin Pesan WA Lengkap'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Photo Management Section for Host / Family */}
        <div className="mb-5 p-4 rounded-2xl bg-[#FFFDF7] border border-[#D4AF37]/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow bg-amber-50 relative flex-shrink-0">
                <img
                  src={currentPhoto}
                  alt="Ryujin Satria Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#881337] font-balinese">
                  Foto Utama Ryujin Satria
                </p>
                <p className="text-[11px] text-[#523829]">
                  {photoUpdated ? (
                    <span className="text-emerald-700 font-bold">✓ Foto berhasil diperbarui!</span>
                  ) : (
                    'Foto ini tampil di Cover & seluruh undangan'
                  )}
                </p>
              </div>
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                aria-label="Upload foto asli Ryujin"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#FAF7EE] hover:bg-amber-100 text-[#78350F] text-xs font-bold border border-[#D4AF37] shadow-sm transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#881337]" />
                <span>Ganti Foto</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2">
          {inputName.trim() && (
            <button
              onClick={handleApplyPreview}
              className="flex-1 py-3 bg-[#881337] hover:bg-[#701A1A] text-[#FAF7EE] text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FDE047]" />
              <span>Pratinjau Undangan Ini Sekarang</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
