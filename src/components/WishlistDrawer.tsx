import React from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  Calendar, 
  MessageCircle, 
  Footprints, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';
import { Room } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistRooms: Room[];
  onRemoveFromWishlist: (roomId: string) => void;
  onSelectRoom: (room: Room) => void;
  onScheduleVisit: (room: Room) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistRooms,
  onRemoveFromWishlist,
  onSelectRoom,
  onScheduleVisit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Shortlisted Rooms ({wishlistRooms.length})
              </h2>
              <p className="text-[11px] text-slate-500">
                Saved for quick comparison and booking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistRooms.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Heart className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700">No rooms shortlisted yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Tap the heart icon on any student accommodation card to save it here for quick reference.
              </p>
            </div>
          ) : (
            wishlistRooms.map((room) => (
              <div
                key={room.id}
                className="group bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 p-3 shadow-sm hover:shadow-md transition-all flex gap-3 relative"
              >
                <img
                  src={room.images[0]}
                  alt={room.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectRoom(room);
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectRoom(room);
                      }}
                      className="text-xs font-bold text-slate-900 hover:text-brand-600 truncate cursor-pointer"
                    >
                      {room.title}
                    </h4>

                    <button
                      onClick={() => onRemoveFromWishlist(room.id)}
                      className="text-slate-400 hover:text-rose-600 p-0.5"
                      title="Remove from shortlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-brand-600 font-semibold truncate mt-0.5">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{room.collegeName}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-0.5">
                    <Footprints className="w-3 h-3 text-amber-600" />
                    <span>{room.walkingTimeMin} min walk ({room.distanceKm} km)</span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/60">
                    <span className="text-sm font-black text-slate-900">
                      ₹{room.pricePerMonth.toLocaleString('en-IN')}
                      <span className="text-[10px] text-slate-400 font-normal">/mo</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onClose();
                          onScheduleVisit(room);
                        }}
                        className="bg-brand-600 hover:bg-brand-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Visit</span>
                      </button>

                      <a
                        href={`https://wa.me/${room.ownerWhatsApp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2 py-1 rounded-lg"
                      >
                        <MessageCircle className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {wishlistRooms.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
            >
              <span>Continue Browsing Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
