import React from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Coins, 
  Footprints, 
  Sparkles,
  Wifi,
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';
import type { College, FilterState } from '../types';

interface HeroSectionProps {
  colleges: College[];
  selectedCollegeId: string;
  onSelectCollege: (id: string) => void;
  maxBudget: number;
  onBudgetChange: (val: number) => void;
  roomType: string;
  onRoomTypeChange: (val: string) => void;
  onQuickFilter: <K extends keyof FilterState>(key: K, val: FilterState[K]) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  colleges,
  selectedCollegeId,
  onSelectCollege,
  maxBudget,
  onBudgetChange,
  roomType,
  onRoomTypeChange,
  onQuickFilter,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-indigo-900 to-slate-900 text-white pt-8 pb-14 sm:pt-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none translate-y-1/3" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Student Pill */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-200 transition-all shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Over 12,000+ Students Found Their Room This Semester</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Catchy Student Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Find Affordable Rooms <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300">
              Within Walking Distance
            </span> of College
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            100% Zero Brokerage, high-speed Wi-Fi, home-cooked mess food, and verified landlords tailored for student budgets.
          </p>
        </div>

        {/* Central Search Box */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/30 text-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Campus Selector */}
            <div className="md:col-span-5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl p-2.5 transition-colors">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                Select College / University
              </label>
              <select
                value={selectedCollegeId}
                onChange={(e) => onSelectCollege(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 text-sm mt-0.5 focus:outline-none cursor-pointer"
              >
                <option value="all">📍 All Campuses & Cities</option>
                {colleges.map((c) => (
                  <option key={c.id} value={c.id}>
                    🎓 {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sharing / Room Type */}
            <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl p-2.5 transition-colors">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Sharing / Room Type
              </label>
              <select
                value={roomType}
                onChange={(e) => onRoomTypeChange(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-800 text-sm mt-0.5 focus:outline-none cursor-pointer"
              >
                <option value="all">All Room Types</option>
                <option value="single">Private Single Room</option>
                <option value="double">Double Sharing (2 Beds)</option>
                <option value="triple">Triple Sharing (Budget)</option>
                <option value="1bhk">1BHK / Studio</option>
                <option value="2bhk_flatshare">2BHK Flat Share</option>
              </select>
            </div>

            {/* Max Budget */}
            <div className="md:col-span-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl p-2.5 transition-colors">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Max Monthly Rent
              </label>
              <select
                value={maxBudget}
                onChange={(e) => onBudgetChange(Number(e.target.value))}
                className="w-full bg-transparent font-bold text-slate-800 text-sm mt-0.5 focus:outline-none cursor-pointer"
              >
                <option value={5000}>Under ₹5,000</option>
                <option value={7000}>Under ₹7,000</option>
                <option value={9000}>Under ₹9,000</option>
                <option value={12000}>Under ₹12,000</option>
                <option value={20000}>Any Budget (₹20k+)</option>
              </select>
            </div>

            {/* Search Trigger Button */}
            <div className="md:col-span-2">
              <a
                href="#room-listings"
                className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-brand-600/30 transition-all text-sm group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Search</span>
              </a>
            </div>

          </div>

          {/* Quick Filter Shortcuts */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs pb-1 scrollbar-none">
            <span className="text-slate-400 font-semibold flex-shrink-0 flex items-center gap-1">
              Popular Tags:
            </span>
            <button
              onClick={() => onQuickFilter('maxDistanceKm', 0.5)}
              className="flex-shrink-0 inline-flex items-center gap-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 px-3 py-1 rounded-full text-slate-700 font-medium transition-colors"
            >
              <Footprints className="w-3.5 h-3.5 text-brand-600" />
              &lt; 500m (5 Min Walk)
            </button>
            <button
              onClick={() => onQuickFilter('foodRequired', true)}
              className="flex-shrink-0 inline-flex items-center gap-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 px-3 py-1 rounded-full text-slate-700 font-medium transition-colors"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
              3 Meals Included
            </button>
            <button
              onClick={() => onQuickFilter('wifiRequired', true)}
              className="flex-shrink-0 inline-flex items-center gap-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-800 px-3 py-1 rounded-full text-slate-700 font-medium transition-colors"
            >
              <Wifi className="w-3.5 h-3.5 text-sky-600" />
              200+ Mbps Fiber Wi-Fi
            </button>
            <button
              onClick={() => onQuickFilter('gender', 'girls')}
              className="flex-shrink-0 inline-flex items-center gap-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 px-3 py-1 rounded-full text-slate-700 font-medium transition-colors"
            >
              👧 Girls PGs
            </button>
            <button
              onClick={() => onQuickFilter('gender', 'boys')}
              className="flex-shrink-0 inline-flex items-center gap-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 px-3 py-1 rounded-full text-slate-700 font-medium transition-colors"
            >
              👦 Boys PGs
            </button>
            <button
              onClick={() => onQuickFilter('noCurfewOnly', true)}
              className="flex-shrink-0 inline-flex items-center gap-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 px-3 py-1 rounded-full text-slate-700 font-medium transition-colors"
            >
              ⏰ No Curfew
            </button>
          </div>
        </div>

        {/* 3 Student Trust Value Props */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
            <Coins className="w-6 h-6 text-amber-300 mx-auto mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">0% Brokerage</div>
            <div className="text-xs text-slate-400">Save ₹5,000 - ₹10,000 upfront</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
            <Footprints className="w-6 h-6 text-emerald-300 mx-auto mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">Walking Distance</div>
            <div className="text-xs text-slate-400">Save commute money & time</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
            <ShieldCheck className="w-6 h-6 text-sky-300 mx-auto mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">100% Verified</div>
            <div className="text-xs text-slate-400">Real photos, checked by team</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-indigo-300 mx-auto mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">1 Month Deposit</div>
            <div className="text-xs text-slate-400">No huge lock-ins for students</div>
          </div>
        </div>

      </div>
    </div>
  );
};
