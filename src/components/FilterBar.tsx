import React from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Footprints, 
  Wifi, 
  UtensilsCrossed, 
  BookOpen, 
  Zap, 
  Wind, 
  Bath, 
  Clock, 
  ArrowUpDown
} from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  // Count active filters
  const activeCount = [
    filters.collegeId !== 'all',
    filters.maxBudget < 20000,
    filters.roomType !== 'all',
    filters.gender !== 'any',
    filters.maxDistanceKm < 5,
    filters.foodRequired,
    filters.wifiRequired,
    filters.studyTableRequired,
    filters.powerBackupRequired,
    filters.acRequired,
    filters.attachedBathroomRequired,
    filters.noCurfewOnly,
  ].filter(Boolean).length;

  return (
    <div className="bg-white border-y border-slate-200 sticky top-16 sm:top-20 z-30 shadow-sm py-3 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Quick Filter Strip */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Summary & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeCount > 0 ? `(${activeCount})` : ''}</span>
            </button>

            <span className="text-sm font-bold text-slate-800">
              <span className="text-brand-600 font-extrabold">{totalResults}</span> student rooms found
            </span>
          </div>

          {/* Center: Desktop Quick Toggle Pills */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto text-xs py-1">
            
            {/* Gender Toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              {(['any', 'boys', 'girls', 'co-ed'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => onFilterChange('gender', g)}
                  className={`px-2.5 py-1 rounded-md capitalize font-semibold transition-all ${
                    filters.gender === g
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {g === 'any' ? 'All' : g}
                </button>
              ))}
            </div>

            {/* Distance Filter */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <span className="text-slate-400 pl-2 pr-1 flex items-center gap-1 font-semibold">
                <Footprints className="w-3.5 h-3.5 text-slate-500" />
                Distance:
              </span>
              {[
                { label: 'Any', value: 5 },
                { label: '< 500m', value: 0.5 },
                { label: '< 1km', value: 1.0 },
                { label: '< 2km', value: 2.0 },
              ].map((d) => (
                <button
                  key={d.label}
                  onClick={() => onFilterChange('maxDistanceKm', d.value)}
                  className={`px-2 py-1 rounded-md font-semibold transition-all ${
                    filters.maxDistanceKm === d.value
                      ? 'bg-white text-brand-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Essential Amenities Buttons */}
            <button
              onClick={() => onFilterChange('foodRequired', !filters.foodRequired)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border font-semibold transition-all ${
                filters.foodRequired
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Meals Included</span>
            </button>

            <button
              onClick={() => onFilterChange('wifiRequired', !filters.wifiRequired)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border font-semibold transition-all ${
                filters.wifiRequired
                  ? 'bg-sky-50 border-sky-300 text-sky-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Wi-Fi</span>
            </button>

            <button
              onClick={() => onFilterChange('studyTableRequired', !filters.studyTableRequired)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border font-semibold transition-all ${
                filters.studyTableRequired
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study Desk</span>
            </button>

            <button
              onClick={() => onFilterChange('powerBackupRequired', !filters.powerBackupRequired)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border font-semibold transition-all ${
                filters.powerBackupRequired
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Power Backup</span>
            </button>

            <button
              onClick={() => onFilterChange('noCurfewOnly', !filters.noCurfewOnly)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border font-semibold transition-all ${
                filters.noCurfewOnly
                  ? 'bg-purple-50 border-purple-300 text-purple-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>No Curfew</span>
            </button>
          </div>

          {/* Right: Sort & Reset */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-200 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange('sortBy', e.target.value as any)}
                className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="distance_asc">Nearest to Campus</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rated</option>
                <option value="popular">Student Favorite</option>
              </select>
            </div>

            {activeCount > 0 && (
              <button
                onClick={onResetFilters}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Expandable Mobile / Full Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 space-y-4 pb-2 animate-fadeIn">
            
            {/* Budget Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Maximum Rent</span>
                <span className="text-brand-600 font-extrabold">₹{filters.maxBudget.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min={2000}
                max={20000}
                step={500}
                value={filters.maxBudget}
                onChange={(e) => onFilterChange('maxBudget', Number(e.target.value))}
                className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>₹2,000 (Hostel)</span>
                <span>₹10,000</span>
                <span>₹20,000+ (Luxury)</span>
              </div>
            </div>

            {/* Distance to Campus */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Max Distance from College Campus
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {[
                  { label: 'Any', value: 5 },
                  { label: '< 500m', value: 0.5 },
                  { label: '< 1km', value: 1.0 },
                  { label: '< 2km', value: 2.0 },
                ].map((d) => (
                  <button
                    key={d.label}
                    onClick={() => onFilterChange('maxDistanceKm', d.value)}
                    className={`py-1.5 rounded-lg font-semibold border ${
                      filters.maxDistanceKm === d.value
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Room Sharing Type
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Types' },
                  { id: 'single', label: 'Single' },
                  { id: 'double', label: 'Double (2)' },
                  { id: 'triple', label: 'Triple (3)' },
                  { id: '1bhk', label: '1BHK Studio' },
                  { id: '2bhk_flatshare', label: 'Flat Share' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onFilterChange('roomType', t.id)}
                    className={`py-1.5 px-2 rounded-lg font-semibold border truncate ${
                      filters.roomType === t.id
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Student Amenities Grid */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Student Amenities
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.foodRequired}
                    onChange={(e) => onFilterChange('foodRequired', e.target.checked)}
                    className="accent-brand-600 rounded"
                  />
                  <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-medium text-slate-700">3 Meals Included</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.wifiRequired}
                    onChange={(e) => onFilterChange('wifiRequired', e.target.checked)}
                    className="accent-brand-600 rounded"
                  />
                  <Wifi className="w-3.5 h-3.5 text-sky-600" />
                  <span className="font-medium text-slate-700">Fiber Wi-Fi</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.studyTableRequired}
                    onChange={(e) => onFilterChange('studyTableRequired', e.target.checked)}
                    className="accent-brand-600 rounded"
                  />
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-medium text-slate-700">Study Desk</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.powerBackupRequired}
                    onChange={(e) => onFilterChange('powerBackupRequired', e.target.checked)}
                    className="accent-brand-600 rounded"
                  />
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium text-slate-700">Power Backup</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.acRequired}
                    onChange={(e) => onFilterChange('acRequired', e.target.checked)}
                    className="accent-brand-600 rounded"
                  />
                  <Wind className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-medium text-slate-700">Air Conditioner</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.attachedBathroomRequired}
                    onChange={(e) => onFilterChange('attachedBathroomRequired', e.target.checked)}
                    className="accent-brand-600 rounded"
                  />
                  <Bath className="w-3.5 h-3.5 text-teal-600" />
                  <span className="font-medium text-slate-700">Attached Bath</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={onResetFilters}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="bg-brand-600 text-white font-bold text-xs px-4 py-2 rounded-lg"
              >
                Apply Filters
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
