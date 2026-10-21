import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Users, 
  Coins, 
  UtensilsCrossed, 
  Wifi, 
  Zap, 
  Sparkles, 
  Copy, 
  Check, 
  Share2 
} from 'lucide-react';

interface BudgetCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetCalculatorModal: React.FC<BudgetCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [rent, setRent] = useState(12000);
  const [roommates, setRoommates] = useState(2);
  const [food, setFood] = useState(6000);
  const [wifi, setWifi] = useState(800);
  const [electricity, setElectricity] = useState(1200);
  const [housekeeping, setHousekeeping] = useState(1000);
  const [copied, setCopied] = useState(false);

  const totalExpense = rent + food + wifi + electricity + housekeeping;
  const perPersonShare = Math.round(totalExpense / Math.max(1, roommates));
  const perPersonRent = Math.round(rent / Math.max(1, roommates));
  const perPersonFood = Math.round(food / Math.max(1, roommates));
  const perPersonUtilities = Math.round((wifi + electricity + housekeeping) / Math.max(1, roommates));

  const handleCopySummary = () => {
    const summary = `🏠 ApnaRoom Rent & Expense Split Summary
----------------------------------------
👥 Roommates Sharing: ${roommates} students
💰 Total Monthly Expenses: ₹${totalExpense.toLocaleString('en-IN')}
----------------------------------------
👉 Each Student's Share: ₹${perPersonShare.toLocaleString('en-IN')} / month
• Rent: ₹${perPersonRent.toLocaleString('en-IN')}
• Food / Mess: ₹${perPersonFood.toLocaleString('en-IN')}
• Utilities (Wi-Fi + Power + Maid): ₹${perPersonUtilities.toLocaleString('en-IN')}
----------------------------------------
Calculated via ApnaRoom (https://apnaroom.student)`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Calculator className="w-3.5 h-3.5 text-brand-600" />
            <span>Student Expense Splitter</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Monthly Rent & Utility Calculator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Calculate your exact per-student monthly budget before signing any lease or sharing a flat.
          </p>
        </div>

        {/* Big Per-Student Result Box */}
        <div className="bg-gradient-to-r from-brand-900 to-indigo-950 text-white rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Each Student Pays
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                ₹{perPersonShare.toLocaleString('en-IN')}
                <span className="text-xs text-slate-300 font-normal"> / month</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Flat Expense</span>
              <div className="text-lg font-bold text-slate-200">
                ₹{totalExpense.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center text-xs">
            <div>
              <div className="text-slate-400 text-[10px]">Rent Share</div>
              <div className="font-bold text-white">₹{perPersonRent.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Food Share</div>
              <div className="font-bold text-white">₹{perPersonFood.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Bills & Wi-Fi</div>
              <div className="font-bold text-white">₹{perPersonUtilities.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          
          {/* Roommates count */}
          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-600" />
                Number of Students Sharing
              </span>
              <span className="text-brand-600 font-extrabold text-sm">{roommates} Students</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRoommates(n)}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    roommates === n
                      ? 'bg-brand-600 text-white border-brand-600 shadow'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {n} {n === 1 ? 'Solo' : 'Beds'}
                </button>
              ))}
            </div>
          </div>

          {/* Base Rent Slider */}
          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-600" />
                Base Monthly Rent (Total Room / Flat)
              </span>
              <span className="font-extrabold text-slate-900">₹{rent.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={3000}
              max={40000}
              step={500}
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Other expense sliders */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <UtensilsCrossed className="w-3 h-3 text-amber-600" />
                Total Food / Mess (₹)
              </label>
              <input
                type="number"
                step={500}
                value={food}
                onChange={(e) => setFood(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <Wifi className="w-3 h-3 text-sky-600" />
                Wi-Fi Internet (₹)
              </label>
              <input
                type="number"
                step={100}
                value={wifi}
                onChange={(e) => setWifi(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-600" />
                Electricity Bill (₹)
              </label>
              <input
                type="number"
                step={200}
                value={electricity}
                onChange={(e) => setElectricity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                Maid / Cleaning (₹)
              </label>
              <input
                type="number"
                step={200}
                value={housekeeping}
                onChange={(e) => setHousekeeping(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Copy CTA */}
          <div className="pt-3">
            <button
              onClick={handleCopySummary}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Split Summary Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Split for Roommates WhatsApp Group</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
