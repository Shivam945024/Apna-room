import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Building2, 
  MapPin, 
  Coins, 
  Wifi, 
  UtensilsCrossed, 
  BookOpen, 
  Zap, 
  Wind, 
  ShieldCheck, 
  Sparkles,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { College, Room, RoomType, GenderType } from '../types';
import { useAuth } from '../context/AuthContext';

interface PostRoomModalProps {

  isOpen: boolean;
  onClose: () => void;
  colleges: College[];
  onAddRoom: (room: Room) => void;
}

export const PostRoomModal: React.FC<PostRoomModalProps> = ({
  isOpen,
  onClose,
  colleges,
  onAddRoom,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [collegeId, setCollegeId] = useState(colleges[0]?.id || 'du-north');
  const [distanceKm, setDistanceKm] = useState(0.4);
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState(6000);
  const [securityDeposit, setSecurityDeposit] = useState(6000);
  const [roomType, setRoomType] = useState<RoomType>('double');
  const [gender, setGender] = useState<GenderType>('boys');
  const [foodOption, setFoodOption] = useState<'included' | 'tiffin_available' | 'self_cooking' | 'none'>('included');
  const [foodDetails, setFoodDetails] = useState('3 nutritious home-style meals (Breakfast, Lunch & Dinner) included.');
  const [wifiSpeedMbps, setWifiSpeedMbps] = useState(200);
  const [hasStudyTable, setHasStudyTable] = useState(true);
  const [hasPowerBackup, setHasPowerBackup] = useState(true);
  const [hasAC, setHasAC] = useState(false);
  const [hasAttachedBathroom, setHasAttachedBathroom] = useState(true);
  const [hasWashingMachine, setHasWashingMachine] = useState(true);
  const [hasROWater, setHasROWater] = useState(true);
  const { user } = useAuth();
  const [gateClosingTime, setGateClosingTime] = useState('11:00 PM');
  const [electricityCharges, setElectricityCharges] = useState('Included in rent');
  const [ownerName, setOwnerName] = useState(user?.displayName || '');
  const [ownerPhone, setOwnerPhone] = useState(user?.phone || '');
  const [ownerWhatsApp, setOwnerWhatsApp] = useState(user?.phone?.replace(/\D/g, '') || '');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  React.useEffect(() => {
    if (user) {
      if (!ownerName) setOwnerName(user.displayName);
      if (!ownerPhone && user.phone) {
        setOwnerPhone(user.phone);
        setOwnerWhatsApp(user.phone.replace(/\D/g, ''));
      }
    }
  }, [user]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !area.trim() || !ownerName.trim() || !ownerPhone.trim()) {
      alert('Please fill all required fields!');
      return;
    }

    const selectedCol = colleges.find((c) => c.id === collegeId) || colleges[0];
    const walkMins = Math.max(2, Math.round(distanceKm * 11));
    const cycleMins = Math.max(1, Math.round(distanceKm * 4));

    const defaultImages = [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ];

    const newRoom: Room = {
      id: `room-custom-${Date.now()}`,
      title: title.trim(),
      collegeId: selectedCol.id,
      collegeName: selectedCol.shortName,
      distanceKm: Number(distanceKm),
      walkingTimeMin: walkMins,
      cyclingTimeMin: cycleMins,
      area: area.trim(),
      city: selectedCol.city,
      address: address.trim() || `${area}, near ${selectedCol.shortName}`,
      pricePerMonth: Number(pricePerMonth),
      securityDeposit: Number(securityDeposit),
      roomType,
      gender,
      sharingCount: roomType === 'single' ? 1 : roomType === 'double' ? 2 : 3,
      images: imageUrl.trim() ? [imageUrl.trim(), ...defaultImages] : defaultImages,
      foodOption,
      foodDetails,
      wifiSpeedMbps: Number(wifiSpeedMbps),
      hasStudyTable,
      hasPowerBackup,
      hasAC,
      hasAttachedBathroom,
      hasWashingMachine,
      hasROWater,
      gateClosingTime,
      electricityCharges,
      ownerName: ownerName.trim(),
      ownerPhone: ownerPhone.trim(),
      ownerWhatsApp: ownerWhatsApp.trim().replace(/\D/g, '') || ownerPhone.trim().replace(/\D/g, ''),
      isVerified: true,
      isStudentFavorite: true,
      zeroBrokerage: true,
      rating: 4.9,
      reviewCount: 1,
      description: description.trim() || 'Spacious student accommodation with study environment and high-speed Wi-Fi.',
      nearbySpots: {
        libraryDistanceMin: Math.max(3, walkMins - 1),
        metroOrBusMin: Math.max(4, walkMins + 2),
        messOrCafeMin: 2,
      },
      rules: ['Student friendly environment', 'Quiet hours after 11 PM'],
      createdAt: new Date().toISOString(),
    };

    onAddRoom(newRoom);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    alert('🎉 Your room listing has been published! Students can now discover and book visits.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>0% Commission • Connect Directly With Students</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            List Your Room, PG or Flat Sublet
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Post in 2 minutes. Thousands of college students look for verified rooms every week.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-100 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-brand-600" />
              Property & College Location
            </h3>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Listing Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Modern Double AC Room with Mess near DU North Campus"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nearest College *</label>
                <select
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  {colleges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Distance to College Gate (km)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Locality / Sector *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kamla Nagar or SG Palya"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Street Address</label>
                <input
                  type="text"
                  placeholder="House number, landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Room Type & Pricing */}
          <div className="space-y-3 pt-2">
            <h3 className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-100 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              Room Type & Affordable Rent
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Room Sharing</label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="single">Single Private</option>
                  <option value="double">Double Sharing</option>
                  <option value="triple">Triple Sharing</option>
                  <option value="1bhk">1BHK Studio</option>
                  <option value="2bhk_flatshare">2BHK Flat Share</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="boys">Boys Only</option>
                  <option value="girls">Girls Only</option>
                  <option value="co-ed">Co-Living / Any</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Rent (₹/month) *</label>
                <input
                  type="number"
                  required
                  step="500"
                  value={pricePerMonth}
                  onChange={(e) => setPricePerMonth(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deposit (₹)</label>
                <input
                  type="number"
                  step="500"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Food / Mess Plan</label>
                <select
                  value={foodOption}
                  onChange={(e) => setFoodOption(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="included">3 Meals Included in Rent</option>
                  <option value="tiffin_available">Tiffin Service Available</option>
                  <option value="self_cooking">Self-Cooking Kitchen Allowed</option>
                  <option value="none">No Food Facility</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Gate Curfew / Timings</label>
                <input
                  type="text"
                  placeholder="e.g. 11:00 PM or No Curfew"
                  value={gateClosingTime}
                  onChange={(e) => setGateClosingTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Student Amenities Checklist */}
          <div className="space-y-2 pt-2">
            <h3 className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Student Amenities Available
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasStudyTable}
                  onChange={(e) => setHasStudyTable(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>Dedicated Study Table</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPowerBackup}
                  onChange={(e) => setHasPowerBackup(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>24/7 Power Backup</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAC}
                  onChange={(e) => setHasAC(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>Air Conditioner</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAttachedBathroom}
                  onChange={(e) => setHasAttachedBathroom(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>Attached Bathroom</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasWashingMachine}
                  onChange={(e) => setHasWashingMachine(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>Washing Machine</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasROWater}
                  onChange={(e) => setHasROWater(e.target.checked)}
                  className="accent-brand-600 rounded"
                />
                <span>RO Drinking Water</span>
              </label>
            </div>
          </div>

          {/* Section 4: Owner / Contact Details */}
          <div className="space-y-3 pt-2">
            <h3 className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-100 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Owner / Flatmate Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Kumar"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="919876543210"
                  value={ownerWhatsApp}
                  onChange={(e) => setOwnerWhatsApp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-slate-400" />
                Room Photo URL (Optional - default student room photo applied if empty)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all mt-4"
          >
            Publish Student Room Listing (Free)
          </button>
        </form>

      </div>
    </div>
  );
};
