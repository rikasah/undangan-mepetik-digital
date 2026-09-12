import React from 'react';
import { Calendar, Clock, MapPin, Navigation, MessageCircle, ExternalLink, CalendarPlus } from 'lucide-react';
import { PatraDivider, FrangipaniFlower } from './BalineseOrnaments';

export const EventDetails: React.FC = () => {
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Upacara+Tigang+Oton+(Mepetik)+Ryujin+Satria&dates=20260916T020000Z/20260916T080000Z&details=Upacara+Tigang+Oton+(Mepetik)+Putra+Kami+Ryujin+Satria.+Matur+Suksma+atas+kehadiran+dan+doa+restu+Bapak/Ibu/Saudara/i.&location=Balai+Banjar+Beng,+Marga,+Tabanan,+Bali`;

  return (
    <section className="w-full max-w-xl mx-auto px-4 py-8">
      {/* Title & Divider */}
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#881337] font-balinese">
          Waktu & Tempat Pelaksanaan
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-balinese text-[#451A03] mt-1">
          Rangkaian Acara
        </h2>
        <PatraDivider className="my-3" />
        <p className="text-xs sm:text-sm text-[#523829] max-w-md mx-auto leading-relaxed">
          Dengan memohon asung kertha wara nugraha Ida Sang Hyang Widhi Wasa, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada:
        </p>
      </div>

      {/* Main Schedule Card */}
      <div className="bg-[#FAF7EE] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Flower accents */}
        <div className="absolute top-3 right-3 opacity-80 pointer-events-none">
          <FrangipaniFlower className="w-7 h-7" />
        </div>
        <div className="absolute bottom-3 left-3 opacity-80 pointer-events-none rotate-45">
          <FrangipaniFlower className="w-6 h-6" />
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-[#D4AF37]/30">
          {/* Hari / Tanggal */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFDF7] border border-[#E5C378]/50 shadow-sm">
            <div className="p-2.5 rounded-xl bg-[#881337]/10 text-[#881337]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#78350F]/80">
                Hari & Tanggal
              </p>
              <p className="text-base sm:text-lg font-bold font-balinese text-[#881337] mt-0.5">
                Rabu, 16 September 2026
              </p>
            </div>
          </div>

          {/* Waktu */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFDF7] border border-[#E5C378]/50 shadow-sm">
            <div className="p-2.5 rounded-xl bg-[#881337]/10 text-[#881337]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#78350F]/80">
                Waktu Pelaksanaan
              </p>
              <p className="text-base sm:text-lg font-bold font-balinese text-[#881337] mt-0.5">
                10.00 WITA – Selesai
              </p>
              <p className="text-[11px] text-[#78350F]/90 mt-0.5">
                Waktu Indonesia Tengah
              </p>
            </div>
          </div>
        </div>

        {/* Lokasi Acara */}
        <div className="pt-6 pb-4">
          <div className="flex items-start gap-3.5 mb-4">
            <div className="p-2.5 rounded-xl bg-[#881337]/10 text-[#881337] flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#78350F]/80">
                Tempat Acara
              </p>
              <h3 className="text-lg sm:text-xl font-bold font-balinese text-[#451A03] mt-0.5">
                Balai Banjar Beng
              </h3>
              <p className="text-xs sm:text-sm text-[#523829] mt-1 leading-relaxed">
                Desa Beng, Kecamatan Marga, Kabupaten Tabanan, Bali
              </p>
              <p className="text-[11px] text-[#78350F]/70 mt-0.5">
                Titik Koordinat: -8.4706512, 115.1712002
              </p>
            </div>
          </div>

          {/* Buttons: Petunjuk Arah & Google Calendar */}
          <div className="flex flex-col sm:flex-row gap-2.5 my-4">
            <a
              id="btn-google-maps"
              href="https://maps.app.goo.gl/UhpCx4mxsMn74Drs8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#881337] hover:bg-[#701A1A] text-[#FAF7EE] font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#FDE047]" />
              <span>Petunjuk Arah (Google Maps)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              id="btn-save-calendar"
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#FFFDF7] hover:bg-amber-50 text-[#78350F] font-semibold text-xs sm:text-sm rounded-xl border border-[#D4AF37]/60 shadow-sm transition-colors"
            >
              <CalendarPlus className="w-4 h-4 text-[#881337]" />
              <span>Ingatkan di Kalender</span>
            </a>
          </div>

          {/* Interactive Google Maps Embed (PRD 6.3) */}
          <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-md relative mt-4 bg-amber-50">
            <iframe
              title="Peta Lokasi Balai Banjar Beng Marga Tabanan"
              src="https://www.google.com/maps?q=-8.4706512,115.1712002&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Emergency WhatsApp Contact (PRD 6.3) */}
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7]/40 to-[#FFFBEB] border border-[#F59E0B]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-600 text-white flex-shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#78350F]">
                  Butuh Bantuan Rute / Tersesat di Jalan?
                </p>
                <p className="text-[11px] text-[#523829]">
                  Hubungi kontak keluarga via WhatsApp: <strong className="text-emerald-700">0878-7336-5999</strong>
                </p>
              </div>
            </div>

            <a
              id="btn-whatsapp-emergency"
              href="https://wa.me/6287873365999?text=Om%20Swastyastu,%20saya%20tamu%20undangan%20Tigang%20Oton%20(Mepetik)%20Ryujin%20Satria,%20mohon%20petunjuk%20arah%20ke%20Balai%20Banjar%20Beng%20Marga."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl shadow-sm transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Hubungi via WA</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
