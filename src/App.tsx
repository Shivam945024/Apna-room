import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Footprints, 
  RotateCcw, 
  PlusCircle, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';

import { College, Room, RoommateProfile, FilterState, VisitBooking } from './types';
import { COLLEGES, INITIAL_ROOMS, INITIAL_ROOMMATES } from './data/mockData';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { RoomCard } from './components/RoomCard';
import { RoomDetailModal } from './components/RoomDetailModal';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { RoommateFinder } from './components/RoommateFinder';
import { BudgetCalculatorModal } from './components/BudgetCalculatorModal';
import { CompareModal } from './components/CompareModal';
import { PostRoomModal } from './components/PostRoomModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // --- Persistent Storage State ---
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('apnaroom_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [roommates, setRoommates] = useState<RoommateProfile[]>(() => {
    const saved = localStorage.getItem('apnaroom_roommates');
    return saved ? JSON.parse(saved) : INITIAL_ROOMMATES;
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('apnaroom_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookings, setBookings] = useState<VisitBooking[]>(() => {
    const saved = localStorage.getItem('apnaroom_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [comparedRoomIds, setComparedRoomIds] = useState<string[]>([]);

  // --- Navigation & Tab State ---
  const [activeTab, setActiveTab] = useState<'rooms' | 'roommates'>('rooms');

  // --- Filter State ---
  const [filters, setFilters] = useState<FilterState>({
    collegeId: 'all',
    maxBudget: 20000,
    roomType: 'all',
    gender: 'any',
    maxDistanceKm: 5,
    foodRequired: false,
    wifiRequired: false,
    studyTableRequired: false,
    powerBackupRequired: false,
    acRequired: false,
    attachedBathroomRequired: false,
    noCurfewOnly: false,
    sortBy: 'distance_asc',
  });

  // --- Modals State ---
  const [selectedRoomDetail, setSelectedRoomDetail] = useState<Room | null>(null);
  const [scheduleVisitRoom, setScheduleVisitRoom] = useState<Room | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isPostRoomOpen, setIsPostRoomOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('apnaroom_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('apnaroom_roommates', JSON.stringify(roommates));
  }, [roommates]);

  useEffect(() => {
    localStorage.setItem('apnaroom_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('apnaroom_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Handlers
  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      collegeId: 'all',
      maxBudget: 20000,
      roomType: 'all',
      gender: 'any',
      maxDistanceKm: 5,
      foodRequired: false,
      wifiRequired: false,
      studyTableRequired: false,
      powerBackupRequired: false,
      acRequired: false,
      attachedBathroomRequired: false,
      noCurfewOnly: false,
      sortBy: 'distance_asc',
    });
  };

  const handleToggleWishlist = (room: Room) => {
    setWishlistIds((prev) =>
      prev.includes(room.id) ? prev.filter((id) => id !== room.id) : [...prev, room.id]
    );
  };

  const handleToggleCompare = (room: Room) => {
    setComparedRoomIds((prev) => {
      if (prev.includes(room.id)) {
        return prev.filter((id) => id !== room.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 rooms at a time.');
        return prev;
      }
      return [...prev, room.id];
    });
  };

  const handleRemoveCompare = (roomId: string) => {
    setComparedRoomIds((prev) => prev.filter((id) => id !== roomId));
  };

  const handleAddRoom = (newRoom: Room) => {
    setRooms((prev) => [newRoom, ...prev]);
  };

  const handleAddRoommate = (newProfile: RoommateProfile) => {
    setRoommates((prev) => [newProfile, ...prev]);
  };

  const handleConfirmBooking = (booking: VisitBooking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  // Filtered & Sorted Rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // College Filter
      if (filters.collegeId !== 'all' && room.collegeId !== filters.collegeId) {
        return false;
      }
      // Budget
      if (room.pricePerMonth > filters.maxBudget) {
        return false;
      }
      // Room Type
      if (filters.roomType !== 'all' && room.roomType !== filters.roomType) {
        return false;
      }
      // Gender
      if (filters.gender !== 'any' && room.gender !== filters.gender && room.gender !== 'co-ed') {
        return false;
      }
      // Max Distance
      if (room.distanceKm > filters.maxDistanceKm) {
        return false;
      }
      // Essential Amenities
      if (filters.foodRequired && room.foodOption !== 'included') {
        return false;
      }
      if (filters.wifiRequired && room.wifiSpeedMbps < 100) {
        return false;
      }
      if (filters.studyTableRequired && !room.hasStudyTable) {
        return false;
      }
      if (filters.powerBackupRequired && !room.hasPowerBackup) {
        return false;
      }
      if (filters.acRequired && !room.hasAC) {
        return false;
      }
      if (filters.attachedBathroomRequired && !room.hasAttachedBathroom) {
        return false;
      }
      if (filters.noCurfewOnly && !room.gateClosingTime.toLowerCase().includes('no curfew')) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'distance_asc':
          return a.distanceKm - b.distanceKm;
        case 'price_asc':
          return a.pricePerMonth - b.pricePerMonth;
        case 'price_desc':
          return b.pricePerMonth - a.pricePerMonth;
        case 'rating_desc':
          return b.rating - a.rating;
        case 'popular':
          return (b.isStudentFavorite ? 1 : 0) - (a.isStudentFavorite ? 1 : 0) || b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });
  }, [rooms, filters]);

  const comparedRooms = useMemo(() => {
    return rooms.filter((r) => comparedRoomIds.includes(r.id));
  }, [rooms, comparedRoomIds]);

  const wishlistRooms = useMemo(() => {
    return rooms.filter((r) => wishlistIds.includes(r.id));
  }, [rooms, wishlistIds]);

  const activeCollege = COLLEGES.find((c) => c.id === filters.collegeId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Navbar */}
      <Navbar
        colleges={COLLEGES}
        selectedCollegeId={filters.collegeId}
        onSelectCollege={(id) => handleFilterChange('collegeId', id)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wishlistCount={wishlistIds.length}
        compareCount={comparedRoomIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenPostRoom={() => setIsPostRoomOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'rooms' ? (
          <div>
            {/* Hero Section */}
            <HeroSection
              colleges={COLLEGES}
              selectedCollegeId={filters.collegeId}
              onSelectCollege={(id) => handleFilterChange('collegeId', id)}
              maxBudget={filters.maxBudget}
              onBudgetChange={(val) => handleFilterChange('maxBudget', val)}
              roomType={filters.roomType}
              onRoomTypeChange={(val) => handleFilterChange('roomType', val)}
              onQuickFilter={handleFilterChange}
            />

            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredRooms.length}
            />

            {/* Listings Section */}
            <div id="room-listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
              
              {/* Active Campus Banner if specific college selected */}
              {activeCollege && (
                <div className="bg-white rounded-2xl border border-brand-200 p-4 sm:p-5 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Browsing Student Accommodation Near
                      </div>
                      <h2 className="text-base sm:text-lg font-black text-slate-900">
                        {activeCollege.name} ({activeCollege.city})
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                    <span className="font-semibold text-slate-400">Popular Hubs:</span>
                    {activeCollege.popularLocations.map((loc) => (
                      <span key={loc} className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Room Cards Grid */}
              {filteredRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      isWishlisted={wishlistIds.includes(room.id)}
                      onToggleWishlist={handleToggleWishlist}
                      isCompared={comparedRoomIds.includes(room.id)}
                      onToggleCompare={handleToggleCompare}
                      onSelectRoom={(r) => setSelectedRoomDetail(r)}
                      onScheduleVisit={(r) => setScheduleVisitRoom(r)}
                    />
                  ))}
                </div>
              ) : (
                /* Empty Results State */
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
                  <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
                    <SlidersHorizontal className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    No student rooms matched your exact filters
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
                    Try expanding your budget slider, increasing the distance limit, or clearing specific amenities.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}

              {/* Student Callout Banner: Looking for flatmate or have a room to sublet */}
              <div className="mt-12 bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="space-y-1.5 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-700 bg-brand-100/60 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>For Students & Graduating Seniors</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Vacating your college room or looking for a replacement flatmate?
                  </h3>
                  <p className="text-xs text-slate-600 max-w-xl">
                    Post your room or flat share in 2 minutes. Zero broker charges, 100% direct student connect.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsPostRoomOpen(true)}
                    className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-all"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>List Your Room Free</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('roommates')}
                    className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-sm transition-all"
                  >
                    <Users className="w-4 h-4 text-brand-600" />
                    <span>Find Roommates</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Roommate Matching Tab */
          <RoommateFinder
            roommates={roommates}
            onAddRoommate={handleAddRoommate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Compare Pill if rooms selected */}
      {comparedRoomIds.length > 0 && !isCompareOpen && (
        <div className="fixed bottom-5 right-5 z-40 animate-bounce">
          <button
            onClick={() => setIsCompareOpen(true)}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm py-3 px-5 rounded-full shadow-2xl shadow-brand-600/40 border-2 border-white transition-all"
          >
            <span>Compare {comparedRoomIds.length} Rooms Side-by-Side</span>
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <RoomDetailModal
        room={selectedRoomDetail}
        onClose={() => setSelectedRoomDetail(null)}
        isWishlisted={selectedRoomDetail ? wishlistIds.includes(selectedRoomDetail.id) : false}
        onToggleWishlist={handleToggleWishlist}
        isCompared={selectedRoomDetail ? comparedRoomIds.includes(selectedRoomDetail.id) : false}
        onToggleCompare={handleToggleCompare}
        onScheduleVisit={(r) => setScheduleVisitRoom(r)}
      />

      <ScheduleVisitModal
        room={scheduleVisitRoom}
        onClose={() => setScheduleVisitRoom(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedRooms={comparedRooms}
        onRemoveRoom={handleRemoveCompare}
        onScheduleVisit={(r) => setScheduleVisitRoom(r)}
      />

      <BudgetCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <PostRoomModal
        isOpen={isPostRoomOpen}
        onClose={() => setIsPostRoomOpen(false)}
        colleges={COLLEGES}
        onAddRoom={handleAddRoom}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistRooms={wishlistRooms}
        onRemoveFromWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onSelectRoom={(r) => setSelectedRoomDetail(r)}
        onScheduleVisit={(r) => setScheduleVisitRoom(r)}
      />

    </div>
  );
};

export default App;
