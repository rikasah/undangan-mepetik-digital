import { GuestInfo } from '../types';

/**
 * Capitalizes the first letter of each word
 */
export function capitalizeWords(str: string): string {
  if (!str) return '';
  return str
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Convert real name to slug
 * e.g. "Ni Kadek Sri Wahyuni" -> "ni-kadek-sri-wahyuni"
 */
export function createSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Parses current URL to extract the guest's name based on PRD Section 6.1
 */
export function parseGuestFromUrl(): GuestInfo {
  if (typeof window === 'undefined') {
    return {
      slug: '',
      name: 'Bapak/Ibu/Saudara/i sekalian',
      isCustom: false,
    };
  }

  // Check URL Search Params first (e.g. ?to=i-made-arya or ?tamu=...)
  const params = new URLSearchParams(window.location.search);
  const queryGuest = params.get('to') || params.get('tamu') || params.get('nama') || params.get('guest');

  if (queryGuest && queryGuest.trim()) {
    const cleanQuery = decodeURIComponent(queryGuest).trim();
    // If it's a slug with hyphens
    const formattedName = cleanQuery.includes('-')
      ? cleanQuery.split('-').map(capitalizeWords).join(' ')
      : capitalizeWords(cleanQuery);

    return {
      slug: createSlug(formattedName),
      name: formattedName,
      isCustom: true,
    };
  }

  // Check Pathname (e.g. /i-made-arya or /made-ayu)
  const pathname = window.location.pathname;
  // Remove leading/trailing slashes and ignore index.html or root
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

  // Ignore static assets or system paths
  const ignoredSlugs = ['', 'index.html', 'index', 'dist', 'src', 'app', 'undangan'];

  if (cleanPath && !ignoredSlugs.includes(cleanPath.toLowerCase()) && !cleanPath.includes('.')) {
    const decodedSlug = decodeURIComponent(cleanPath);
    const words = decodedSlug.split('-').filter(Boolean);
    if (words.length > 0) {
      const formattedName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      return {
        slug: decodedSlug,
        name: formattedName,
        isCustom: true,
      };
    }
  }

  // Check Hash fallback (e.g. #/i-made-arya or #i-made-arya)
  if (window.location.hash) {
    const cleanHash = window.location.hash.replace(/^#[/]?/, '').trim();
    if (cleanHash && !ignoredSlugs.includes(cleanHash.toLowerCase()) && !cleanHash.includes('.')) {
      const decodedHash = decodeURIComponent(cleanHash);
      const words = decodedHash.split('-').filter(Boolean);
      if (words.length > 0) {
        const formattedName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        return {
          slug: decodedHash,
          name: formattedName,
          isCustom: true,
        };
      }
    }
  }

  // Default fallback according to PRD 6.1
  return {
    slug: '',
    name: 'Bapak/Ibu/Saudara/i sekalian',
    isCustom: false,
  };
}

/**
 * Generates WhatsApp message template for sharing
 */
export function generateWhatsAppMessage(guestName: string, inviteUrl: string): string {
  const isGeneral = !guestName || guestName === 'Bapak/Ibu/Saudara/i sekalian';
  const recipient = isGeneral ? 'Bapak/Ibu/Saudara/i sekalian' : guestName;

  return `Om Swastyastu 🙏\n\nKepada Yth. Bapak/Ibu/Saudara/i *${recipient}*,\n\nTanpa mengurangi rasa hormat, bersama pesan ini kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam Upacara Tigang Oton (Mepetik) putra kami:\n\n👶 *Ryujin Satria*\n🗓️ *Rabu, 16 September 2026*\n⏰ *10.00 WITA - Selesai*\n📍 *Balai Banjar Beng, Marga, Tabanan, Bali*\n\nBuka tautan undangan digital resmi untuk informasi lengkap, doa restu & petunjuk arah lokasi:\n👉 ${inviteUrl}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi putra kami tercinta.\n\nSuksma / Terima kasih 🙏\nKeluarga Ryujin Satria`;
}
