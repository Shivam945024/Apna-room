import React, { useState } from 'react';
import { 
  Heart, 
  GitCompare, 
  Footprints, 
  MapPin, 
  Wifi, 
  UtensilsCrossed, 
  BookOpen, 
  Zap, 
  Wind, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Star
} from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  isWishlisted: boolean;
  onToggleWishlist: (room: Room) => void;
  isCompared: boolean;
  onToggleCompare: (room: Room) => void;
  onSelectRoom: (room: Room) => void;
  onScheduleVisit: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  onSelectRoom,
  onScheduleVisit,
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const getGenderBadge = () => {
    switch (room.gender) {
      case 'boys':
        return <span className="bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">👦 Boys PG</span>;
      case 'girls':
        return <span className="bg-pink-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">👧 Girls PG</span>;
      case 'co-ed':
        return <span className="bg-purple-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">👫 Co-Living</span>;
      default:
        return null;
    }
  };

  const getRoomTypeLabel = () => {
    switch (room.roomType) {
      case 'single': return 'Private Single';
      case 'double': return 'Double Sharing (2 Beds)';
      case 'triple': return 'Triple Sharing (Budget)';
      case '1bhk': return '1BHK Studio';
      case '2bhk_flatshare': return '2BHK Flat Share';
      default: return room.roomType;
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi ${room.ownerName}, I found your student accommodation "${room.title}" near ${room.collegeName} on ApnaRoom. Is a bed/room currently available for visit?`
  );

  return (
    <div 
      onClick={() => onSelectRoom(room)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Box */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        <img
          src={room.images[currentImgIndex]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-1.5 flex-wrap">
            {getGenderBadge()}
            {room.zeroBrokerage && (
              <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                0% Brokerage
              </span>
            )}
            {room.isStudentFavorite && (
              <span className="bg-amber-500/95 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                ★ Student Choice
              </span>
            )}
          </div>

          {/* Action Icons: Wishlist & Compare */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(room);
              }}
              className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow ${
                isCompared
                  ? 'bg-brand-600 text-white ring-2 ring-white'
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
              title={isCompared ? 'Remove from compare' : 'Compare room'}
            >
              <GitCompare className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(room);
              }}
              className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow ${
                isWishlisted
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
              title={isWishlisted ? 'Saved' : 'Save room'}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Image Carousel Controls */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
              {room.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImgIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Distance Banner over bottom of image */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <Footprints className="w-3.5 h-3.5 text-amber-300" />
            <span>
              <strong className="text-amber-300">{room.walkingTimeMin} min walk</strong> ({room.distanceKm} km)
            </span>
          </div>

          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[11px]">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{room.rating}</span>
            <span className="text-slate-300">({room.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title & College */}
        <div>
          <div className="text-[11px] font-bold text-brand-600 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{room.collegeName}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1 mt-0.5">
            {room.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
            {room.area}, {room.city} • <span className="text-slate-700 font-semibold">{getRoomTypeLabel()}</span>
          </p>
        </div>

        {/* Key Student Amenities Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          {room.foodOption === 'included' && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-md border border-amber-200">
              <UtensilsCrossed className="w-3 h-3 text-amber-600" />
              Meals Included
            </span>
          )}
          {room.wifiSpeedMbps > 0 && (
            <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-800 font-semibold px-2 py-0.5 rounded-md border border-sky-200">
              <Wifi className="w-3 h-3 text-sky-600" />
              {room.wifiSpeedMbps} Mbps
            </span>
          )}
          {room.hasStudyTable && (
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-800 font-semibold px-2 py-0.5 rounded-md border border-indigo-200">
              <BookOpen className="w-3 h-3 text-indigo-600" />
              Study Desk
            </span>
          )}
          {room.hasPowerBackup && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
              <Zap className="w-3 h-3 text-emerald-600" />
              Power Backup
            </span>
          )}
          {room.hasAC && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded-md border border-blue-200">
              <Wind className="w-3 h-3 text-blue-600" />
              AC
            </span>
          )}
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-800 font-semibold px-2 py-0.5 rounded-md border border-purple-200">
            <Clock className="w-3 h-3 text-purple-600" />
            {room.gateClosingTime}
          </span>
        </div>

        {/* Price & Deposit Strip */}
        <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">
                ₹{room.pricePerMonth.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ month</span>
              {room.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{room.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold">
              Deposit: ₹{room.securityDeposit.toLocaleString('en-IN')} (Only 1 month)
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Owner
            </span>
          </div>
        </div>

        {/* Action Buttons: Schedule Visit & WhatsApp */}
        <div className="grid grid-cols-2 gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onScheduleVisit(room)}
            className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-colors shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </button>

          <a
            href={`https://wa.me/${room.ownerWhatsApp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
