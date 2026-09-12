export interface GuestInfo {
  slug: string;
  name: string;
  isCustom: boolean;
}

export interface EventSchedule {
  title: string;
  childName: string;
  dayDate: string;
  timeString: string;
  targetDateISO: string; // ISO format for countdown calculation
  locationName: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsUrl: string;
  mapsEmbedUrl: string;
  emergencyWaNumber: string;
  emergencyWaFormatted: string;
}

export interface DigitalEnvelopeData {
  walletName: string;
  accountNumber: string;
  accountHolder: string;
  instructions: string;
}
