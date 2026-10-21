import React from 'react';
import { 
  X, 
  GitCompare, 
  Check, 
  Minus, 
  Footprints, 
  Calendar, 
  MessageCircle, 
  ShieldCheck, 
  Star 
} from 'lucide-react';
import { Room } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedRooms: Room[];
  onRemoveRoom: (roomId: string) => void;
  onScheduleVisit: (room: Room) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedRooms,
  onRemoveRoom,
  onScheduleVisit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <GitCompare className="w-3.5 h-3.5 text-brand-600" />
            <span>Side-by-Side Student Comparison</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Compare Shortlisted Rooms ({comparedRooms.length}/3)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate distance from college, rent, food, Wi-Fi speed, and curfew to make the best choice.
          </p>
        </div>

        {comparedRooms.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <GitCompare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No rooms selected to compare</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Click the compare icon on any 2 or 3 room cards to compare their rent and student amenities side by side.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider w-40 rounded-l-xl">
                    Criteria
                  </th>
                  {comparedRooms.map((room) => (
                    <th key={room.id} className="p-3 bg-slate-50 min-w-[220px] max-w-[280px]">
                      <div className="relative">
                        <button
                          onClick={() => onRemoveRoom(room.id)}
                          className="absolute -top-1 -right-1 p-1 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-full shadow border border-slate-200"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <img
                          src={room.images[0]}
                          alt={room.title}
                          className="w-full h-28 object-cover rounded-xl mb-2"
                        />
                        <div className="font-extrabold text-sm text-slate-900 line-clamp-1">
                          {room.title}
                        </div>
                        <div className="text-[11px] text-brand-600 font-bold mt-0.5 truncate">
                          {room.collegeName}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                
                {/* Distance to Campus */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    🚶 Distance & Walk
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3 font-extrabold text-slate-900">
                      <span className="text-amber-600">{r.walkingTimeMin} min walk</span> ({r.distanceKm} km)
                    </td>
                  ))}
                </tr>

                {/* Monthly Rent */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    💰 Monthly Rent
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3">
                      <span className="text-base font-black text-slate-900">
                        ₹{r.pricePerMonth.toLocaleString('en-IN')}
                      </span>
                      <span className="text-slate-400 text-[10px]"> / month</span>
                    </td>
                  ))}
                </tr>

                {/* Security Deposit */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    🔒 Security Deposit
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3 font-bold text-emerald-700">
                      ₹{r.securityDeposit.toLocaleString('en-IN')} (Only 1 month)
                    </td>
                  ))}
                </tr>

                {/* Room Sharing Type */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    🛏️ Sharing Type
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3 font-semibold text-slate-800 capitalize">
                      {r.roomType.replace('_', ' ')} ({r.sharingCount} {r.sharingCount === 1 ? 'Bed' : 'Beds'})
                    </td>
                  ))}
                </tr>

                {/* Food / Mess */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    🍲 Food & Meals
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3">
                      {r.foodOption === 'included' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                          <Check className="w-3.5 h-3.5" /> 3 Meals Included
                        </span>
                      ) : (
                        <span className="text-slate-600 font-medium capitalize">
                          {r.foodOption.replace('_', ' ')}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Wi-Fi Speed */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    🚀 Wi-Fi Speed
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3 font-bold text-sky-700">
                      {r.wifiSpeedMbps} Mbps Fiber
                    </td>
                  ))}
                </tr>

                {/* Dedicated Study Table */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    📚 Study Desk & Chair
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3">
                      {r.hasStudyTable ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1">
                          <Minus className="w-3.5 h-3.5" /> No
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Power Backup */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    ⚡ 24/7 Power Backup
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3">
                      {r.hasPowerBackup ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Inverter Backup
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1">
                          <Minus className="w-3.5 h-3.5" /> No
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* AC */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    ❄️ Air Conditioning
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3">
                      {r.hasAC ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> AC Room
                        </span>
                      ) : (
                        <span className="text-slate-500 font-medium">Air Cooler</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Curfew / Gate Timing */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    ⏰ Gate Policy
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3 font-bold text-purple-700">
                      {r.gateClosingTime}
                    </td>
                  ))}
                </tr>

                {/* Electricity Charge */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    🔌 Electricity
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3 text-slate-600 font-medium">
                      {r.electricityCharges}
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-3 font-bold text-slate-700 bg-slate-50/30">
                    Actions
                  </td>
                  {comparedRooms.map((r) => (
                    <td key={r.id} className="p-3">
                      <div className="space-y-1.5">
                        <button
                          onClick={() => {
                            onClose();
                            onScheduleVisit(r);
                          }}
                          className="w-full bg-slate-900 hover:bg-brand-600 text-white font-bold py-2 px-3 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Visit</span>
                        </button>
                        <a
                          href={`https://wa.me/${r.ownerWhatsApp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
