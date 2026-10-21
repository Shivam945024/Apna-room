export type RoomType = 'single' | 'double' | 'triple' | '1bhk' | '2bhk_flatshare';

export type GenderType = 'boys' | 'girls' | 'co-ed' | 'any';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description?: string;
  isStudentEssential?: boolean;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  city: string;
  area: string;
  popularLocations: string[];
}

export interface Room {
  id: string;
  title: string;
  collegeId: string;
  collegeName: string;
  distanceKm: number; // e.g., 0.4 km
  walkingTimeMin: number; // e.g., 5 mins
  cyclingTimeMin: number;
  area: string;
  city: string;
  address: string;
  pricePerMonth: number;
  originalPrice?: number;
  securityDeposit: number;
  roomType: RoomType;
  gender: GenderType;
  sharingCount: number; // 1, 2, 3, etc.
  images: string[];
  foodOption: 'included' | 'tiffin_available' | 'self_cooking' | 'none';
  foodDetails: string;
  wifiSpeedMbps: number;
  hasStudyTable: boolean;
  hasPowerBackup: boolean;
  hasAC: boolean;
  hasAttachedBathroom: boolean;
  hasWashingMachine: boolean;
  hasROWater: boolean;
  gateClosingTime: string; // e.g., "10:30 PM" or "No Curfew"
  electricityCharges: string; // e.g., "₹8/unit as per sub-meter" or "Included in Rent"
  ownerName: string;
  ownerPhone: string;
  ownerWhatsApp: string;
  isVerified: boolean;
  isStudentFavorite?: boolean;
  zeroBrokerage: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  nearbySpots: {
    libraryDistanceMin: number;
    metroOrBusMin: number;
    messOrCafeMin: number;
  };
  rules: string[];
  createdAt: string;
}

export interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  college: string;
  course: string;
  year: string;
  budget: number;
  targetArea: string;
  habits: {
    sleepSchedule: 'Night Owl 🦉' | 'Early Bird 🌅' | 'Flexible ⏰';
    diet: 'Vegetarian 🥦' | 'Non-Vegetarian 🍗' | 'Eggetarian 🥚';
    smokingDrinking: 'Strictly No 🚭' | 'Occasional 🥂' | 'Smoking OK';
    cleanliness: 'Neat Freak ✨' | 'Moderately Clean 🧹' | 'Chill/Casual 🛋️';
    studyVibe: 'Pin-drop Silent 🤫' | 'Soft Music / Group Study 🎧';
  };
  lookingFor: string;
  aboutMe: string;
  contactWhatsApp: string;
  avatar: string;
  verifiedStudent: boolean;
}

export interface FilterState {
  collegeId: string;
  maxBudget: number;
  roomType: string;
  gender: string;
  maxDistanceKm: number;
  foodRequired: boolean;
  wifiRequired: boolean;
  studyTableRequired: boolean;
  powerBackupRequired: boolean;
  acRequired: boolean;
  attachedBathroomRequired: boolean;
  noCurfewOnly: boolean;
  sortBy: 'price_asc' | 'price_desc' | 'distance_asc' | 'rating_desc' | 'popular';
}

export interface VisitBooking {
  id: string;
  roomId: string;
  roomTitle: string;
  studentName: string;
  studentPhone: string;
  studentCollege: string;
  visitDate: string;
  timeSlot: string;
  status: 'confirmed' | 'pending';
  bookedAt: string;
}
