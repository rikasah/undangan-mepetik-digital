import React, { useState, useEffect, useRef } from 'react';
import { FrangipaniFlower } from './BalineseOrnaments';
import { getRyujinPhotoUrl, updateRyujinPhoto } from '../utils/photoManager';

interface RyujinPhotoFrameProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RyujinPhotoFrame: React.FC<RyujinPhotoFrameProps> = ({
  size = 'md',
  className = '',
}) => {
  const [photoSrc, setPhotoSrc] = useState<string>(getRyujinPhotoUrl());
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setPhotoSrc(getRyujinPhotoUrl());
    };
    window.addEventListener('ryujin_photo_updated', handleUpdate);
    // Initial check
    setPhotoSrc(getRyujinPhotoUrl());
    return () => window.removeEventListener('ryujin_photo_updated', handleUpdate);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateRyujinPhoto(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Support Drag & Drop directly onto frame for easy update by the host
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateRyujinPhoto(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Dimensions for responsive Balinese photo frame
  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28 border-[3px]',
    md: 'w-40 h-40 sm:w-48 sm:h-48 border-4',
    lg: 'w-48 h-48 sm:w-56 sm:h-56 border-4',
  }[size];

  return (
    <div
      className={`relative inline-block ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDoubleClick={() => hiddenInputRef.current?.click()}
      title="Foto Ryujin Satria"
    >
      {/* Hidden file input for host double-click shortcut */}
      <input
        ref={hiddenInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Pilih foto Ryujin"
      />

      {/* Warm Golden Glow behind the frame to blend with Balinese theme */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37] via-[#F59E0B]/50 to-[#E5C378] rounded-full blur-[3px] opacity-80" />

      {/* Main Circular Photo Container */}
      <div
        className={`${sizeClasses} relative rounded-full overflow-hidden border-[#D4AF37] shadow-2xl bg-[#FAF7EE] transition-transform duration-500 hover:scale-[1.02]`}
      >
        <img
          src={photoSrc}
          alt="Ryujin Satria"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle warm vignette overlay to blend edges seamlessly */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#D4AF37]/40 pointer-events-none" />
      </div>

      {/* Decorative Balinese Frangipani (Bunga Kamboja) Flower on bottom-right corner */}
      <div className="absolute -bottom-1 -right-1 drop-shadow-md pointer-events-none">
        <FrangipaniFlower className="w-8 h-8 sm:w-9 sm:h-9" />
      </div>
    </div>
  );
};
