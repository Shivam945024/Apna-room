import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Footprints, 
  Bike, 
  ShieldCheck, 
  Heart, 
  GitCompare, 
  Wifi, 
  UtensilsCrossed, 
  BookOpen, 
  Zap, 
  Wind, 
  Bath, 
  Clock, 
  Calendar, 
  Phone, 
  MessageCircle, 
  Star, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import { Room } from '../types';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (room: Room) => void;
  isCompared: boolean;
  onToggleCompare: (room: Room) => void;
  onScheduleVisit: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  onScheduleVisit,
}) => {
  if (!room) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const whatsappMessage = encodeURIComponent(
    `Hello ${room.ownerName}, I saw your student room "${room.title}" near ${room.collegeName} on ApnaRoom. I would like to know if it's available and schedule a visit.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Gallery */}
        <div className="relative bg-slate-900 rounded-t-3xl overflow-hidden">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full">
            <img
              src={room.images[activeImgIndex]}
              alt={room.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {room.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === activeImgIndex ? 'border-amber-400 scale-105 shadow-md' : 'border-white/50 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Image Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              {room.gender === 'boys' ? '👦 Boys PG' : room.gender === 'girls' ? '👧 Girls PG' : '👫 Co-Living'}
            </span>
            {room.zeroBrokerage && (
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Zero Brokerage
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-8 space-y-6">
          
          {/* Header Row: Title, College, Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>{room.collegeName}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {room.title}
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-1">
                {room.address}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onToggleCompare(room)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isCompared
                    ? 'bg-brand-50 border-brand-300 text-brand-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <GitCompare className="w-4 h-4" />
                <span>{isCompared ? 'Compared' : 'Compare'}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(room)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Student Campus Proximity Bar */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center justify-around gap-4 text-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-amber-900 font-bold">Walking to Campus</div>
                <div className="text-base font-black text-slate-900">{room.walkingTimeMin} mins ({room.distanceKm} km)</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-700 flex items-center justify-center">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-sky-900 font-bold">Bicycle / Cycle Time</div>
                <div className="text-base font-black text-slate-900">{room.cyclingTimeMin} mins</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-purple-900 font-bold">Gate Policy</div>
                <div className="text-base font-black text-slate-900">{room.gateClosingTime}</div>
              </div>
            </div>
          </div>

          {/* Pricing & Deposit Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Monthly Rent</span>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                ₹{room.pricePerMonth.toLocaleString('en-IN')}
                <span className="text-xs text-slate-500 font-medium"> / bed</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Zero brokerage applied</div>
            </div>

            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Security Deposit</span>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                ₹{room.securityDeposit.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-slate-500 font-semibold mt-0.5">100% Refundable on move-out</div>
            </div>

            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Electricity Charges</span>
              <div className="text-sm font-bold text-slate-800 mt-1">
                {room.electricityCharges}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Sub-metered or flat inclusion</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-brand-600" />
              About this Student Room
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Student Amenities Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Student Amenities & Features
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Wifi className="w-4 h-4 text-sky-600" />
                <div>
                  <div className="font-bold text-slate-800">{room.wifiSpeedMbps} Mbps Wi-Fi</div>
                  <div className="text-[10px] text-slate-500">Dual-band fiber</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                <div>
                  <div className="font-bold text-slate-800 capitalize">{room.foodOption.replace('_', ' ')}</div>
                  <div className="text-[10px] text-slate-500">Student mess</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <div>
                  <div className="font-bold text-slate-800">{room.hasStudyTable ? 'Dedicated Desk' : 'Shared Desk'}</div>
                  <div className="text-[10px] text-slate-500">Ergonomic chair</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Zap className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="font-bold text-slate-800">{room.hasPowerBackup ? '24/7 Power' : 'Standard'}</div>
                  <div className="text-[10px] text-slate-500">Inverter backup</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Wind className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="font-bold text-slate-800">{room.hasAC ? 'Air Conditioned' : 'Air Cooler'}</div>
                  <div className="text-[10px] text-slate-500">Summer ready</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Bath className="w-4 h-4 text-teal-600" />
                <div>
                  <div className="font-bold text-slate-800">{room.hasAttachedBathroom ? 'Attached Bath' : 'Common Bath'}</div>
                  <div className="text-[10px] text-slate-500">Geyser hot water</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <div>
                  <div className="font-bold text-slate-800">{room.hasWashingMachine ? 'Washing Machine' : 'Laundry Tie-up'}</div>
                  <div className="text-[10px] text-slate-500">Cloth drying area</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="font-bold text-slate-800">{room.hasROWater ? 'RO Drinking Water' : 'Filtered'}</div>
                  <div className="text-[10px] text-slate-500">24/7 cold/normal</div>
                </div>
              </div>
            </div>

            {/* Food Details Banner */}
            {room.foodDetails && (
              <div className="mt-3 p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <UtensilsCrossed className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Meal Plan Details: </strong> {room.foodDetails}
                </div>
              </div>
            )}
          </div>

          {/* Neighborhood & Commute Guide */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              Student Commute & Neighborhood Spots
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-extrabold text-base text-slate-900">{room.nearbySpots.libraryDistanceMin} mins</div>
                <div className="text-slate-500 mt-0.5">To Reading Hall / Library</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-extrabold text-base text-slate-900">{room.nearbySpots.metroOrBusMin} mins</div>
                <div className="text-slate-500 mt-0.5">To Metro / Bus Station</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-extrabold text-base text-slate-900">{room.nearbySpots.messOrCafeMin} mins</div>
                <div className="text-slate-500 mt-0.5">To Student Cafes / Xerox</div>
              </div>
            </div>
          </div>

          {/* House Rules */}
          {room.rules && room.rules.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                PG / Hostel Guidelines
              </h3>
              <ul className="space-y-1 text-xs text-slate-600">
                {room.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verified Landlord Contact & Booking CTA */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Direct Landlord / Flatmate</span>
              </div>
              <div className="text-lg font-black">{room.ownerName}</div>
              <div className="text-xs text-slate-300">0% Brokerage Guarantee • Contact directly</div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onScheduleVisit(room);
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Visit</span>
              </button>

              <a
                href={`https://wa.me/${room.ownerWhatsApp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${room.ownerPhone}`}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                title="Call Landlord"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
