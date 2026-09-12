import defaultPortrait from '../assets/images/ryujin_portrait.jpg';

export const PHOTO_STORAGE_KEY = 'ryujin_authentic_portrait_v1';

export function getRyujinPhotoUrl(): string {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(PHOTO_STORAGE_KEY);
      if (stored && stored.startsWith('data:image/')) {
        return stored;
      }
    } catch {
      // Ignore storage errors
    }
  }
  return defaultPortrait;
}

export async function updateRyujinPhoto(dataUrl: string): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, dataUrl);
      window.dispatchEvent(new Event('ryujin_photo_updated'));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    // Persist to server disk so it is preserved across sessions and devices
    try {
      await fetch('/api/save-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl }),
      });
    } catch (e) {
      console.warn('Could not sync photo to server disk:', e);
    }
  }
}

// Auto-sync if localStorage has an uploaded image but server disk needs it
if (typeof window !== 'undefined') {
  try {
    const existing = localStorage.getItem(PHOTO_STORAGE_KEY);
    if (existing && existing.startsWith('data:image/')) {
      fetch('/api/save-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl: existing }),
      }).catch(() => {});
    }
  } catch {}
}
