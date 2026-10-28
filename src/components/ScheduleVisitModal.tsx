import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  GraduationCap, 
  CheckCircle, 
  MapPin, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Room, VisitBooking } from '../types';
import { useAuth } from '../context/AuthContext';

interface ScheduleVisitModalProps {
  room: Room | null;
  onClose: () => void;
  onConfirmBooking: (booking: VisitBooking) => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  room,
  onClose,
  onConfirmBooking,
}) => {
  if (!room) return null;

  const { user } = useAuth();
  const [dateOption, setDateOption] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Afternoon (2:00 PM - 5:00 PM)');
  const [studentName, setStudentName] = useState(user?.displayName || '');
  const [studentPhone, setStudentPhone] = useState(user?.phone || '');
  const [studentCollege, setStudentCollege] = useState(user?.college || room.collegeName);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  React.useEffect(() => {
    if (user) {
      if (!studentName) setStudentName(user.displayName);
      if (!studentPhone && user.phone) setStudentPhone(user.phone);
      if (!studentCollege && user.college) setStudentCollege(user.college);
    }
  }, [user]);


  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) {
      alert('Please enter your name and phone number so the landlord can contact you.');
      return;
    }

    const selectedVisitDate = 
      dateOption === 'today' ? todayStr : 
      dateOption === 'tomorrow' ? tomorrowStr : 
      customDate || todayStr;

    const ref = `APR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);

    const booking: VisitBooking = {
      id: ref,
      roomId: room.id,
      roomTitle: room.title,
      studentName: studentName.trim(),
      studentPhone: studentPhone.trim(),
      studentCollege: studentCollege.trim(),
      visitDate: selectedVisitDate,
      timeSlot,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      userId: user?.uid,
      userEmail: user?.email,
    };


    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setIsSuccess(true);
    onConfirmBooking(booking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>100% Free • No Brokerage Obligation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Schedule Room Inspection
              </h2>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {room.title} • {room.area}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Date selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  Select Visit Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDateOption('today')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      dateOption === 'today'
                        ? 'bg-brand-600 text-white border-brand-600 shadow'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateOption('tomorrow')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      dateOption === 'tomorrow'
                        ? 'bg-brand-600 text-white border-brand-600 shadow'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateOption('custom')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      dateOption === 'custom'
                        ? 'bg-brand-600 text-white border-brand-600 shadow'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Pick Date
                  </button>
                </div>

                {dateOption === 'custom' && (
                  <input
                    type="date"
                    min={todayStr}
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    required
                    className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                )}
              </div>

              {/* Time Slot */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-600" />
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                >
                  <option value="Morning (9:30 AM - 12:30 PM)">🌅 Morning (9:30 AM - 12:30 PM)</option>
                  <option value="Afternoon (2:00 PM - 5:00 PM)">☀️ Afternoon (2:00 PM - 5:00 PM)</option>
                  <option value="Evening (5:30 PM - 8:00 PM)">🌆 Evening (5:30 PM - 8:00 PM)</option>
                </select>
              </div>

              {/* Student Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Aryan Gupta"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    WhatsApp / Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    College / Course (Optional)
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. DU Hindu College (B.Sc 1st Year)"
                      value={studentCollege}
                      onChange={(e) => setStudentCollege(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-brand-500/25 transition-all mt-4"
              >
                Confirm Free Visit Now
              </button>

              <p className="text-[11px] text-center text-slate-400">
                🔒 Your phone number is only shared with the verified landlord to coordinate your visit.
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Booking ID: {bookingRef}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Visit Successfully Scheduled!
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                We've sent a WhatsApp notification to <strong>{room.ownerName}</strong>. They will keep the room ready for your inspection.
              </p>
            </div>

            {/* Visit Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Student Name:</span>
                <span className="font-bold text-slate-900">{studentName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Scheduled Date:</span>
                <span className="font-bold text-slate-900">
                  {dateOption === 'today' ? 'Today' : dateOption === 'tomorrow' ? 'Tomorrow' : customDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Time Slot:</span>
                <span className="font-bold text-slate-900">{timeSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Landlord Contact:</span>
                <span className="font-bold text-slate-900">{room.ownerPhone}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-start gap-1.5 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-brand-600 mt-0.5 flex-shrink-0" />
                <span>{room.address}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all"
              >
                Done / Back to Rooms
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
