import React from 'react';
import { 
  Building2, 
  Heart, 
  GitCompare, 
  PlusCircle, 
  Calculator, 
  Users, 
  MapPin, 
  Menu, 
  X, 
  GraduationCap,
  LogIn,
  LogOut,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { College } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  colleges: College[];
  selectedCollegeId: string;
  onSelectCollege: (id: string) => void;
  activeTab: 'rooms' | 'roommates';
  setActiveTab: (tab: 'rooms' | 'roommates') => void;
  wishlistCount: number;
  compareCount: number;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenCalculator: () => void;
  onOpenPostRoom: () => void;
  onOpenAuth: () => void;
}


export const Navbar: React.FC<NavbarProps> = ({
  colleges,
  selectedCollegeId,
  onSelectCollege,
  activeTab,
  setActiveTab,
  wishlistCount,
  compareCount,
  onOpenWishlist,
  onOpenCompare,
  onOpenCalculator,
  onOpenPostRoom,
  onOpenAuth,
}) => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);


  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('rooms')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                    Apna<span className="text-brand-600">Room</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full border border-emerald-300">
                    Student
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Verified Rooms Near Your College • 0% Brokerage
                </p>
              </div>
            </button>
          </div>

          {/* College Quick Switcher */}
          <div className="hidden lg:flex items-center bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-full px-3 py-1.5 transition-colors">
            <MapPin className="w-4 h-4 text-brand-600 mr-2 flex-shrink-0" />
            <select
              value={selectedCollegeId}
              onChange={(e) => onSelectCollege(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer max-w-[260px] truncate"
            >
              <option value="all">📍 All Colleges & Universities</option>
              {colleges.map((col) => (
                <option key={col.id} value={col.id}>
                  🎓 {col.shortName} ({col.city})
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'rooms'
                  ? 'bg-brand-50 text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Rooms & PGs</span>
            </button>

            <button
              onClick={() => setActiveTab('roommates')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                activeTab === 'roommates'
                  ? 'bg-brand-50 text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>ApnaRoommate</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1 animate-pulse" />
            </button>

            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              title="Split rent & utilities among flatmates"
            >
              <Calculator className="w-4 h-4 text-slate-500" />
              <span>Rent Split</span>
            </button>
          </nav>

          {/* Action CTAs: Compare, Wishlist, Post Room */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            {/* Compare Button */}
            <button
              onClick={onOpenCompare}
              className={`relative p-2 rounded-xl border transition-all ${
                compareCount > 0 
                  ? 'bg-brand-50 border-brand-200 text-brand-700 shadow-sm hover:bg-brand-100' 
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Compare Rooms side by side"
            >
              <GitCompare className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className={`relative p-2 rounded-xl border transition-all ${
                wishlistCount > 0 
                  ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm hover:bg-rose-100' 
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Saved Shortlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Post Room Button */}
            <button
              onClick={onOpenPostRoom}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-brand-500/20 hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Your Room</span>
            </button>

            {/* Auth / Profile Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-[11px] font-black uppercase">
                    {user.displayName.charAt(0) || 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user.displayName.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="font-extrabold text-xs text-slate-900 truncate">
                        {user.displayName}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {user.email}
                      </div>
                      <div className="mt-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          user.role === 'owner' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {user.role === 'owner' ? '🔑 Room Owner' : '🎓 Student'}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          onOpenPostRoom();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <PlusCircle className="w-4 h-4 text-brand-600" />
                        <span>List a Room / PG</span>
                      </button>

                      <button
                        onClick={() => {
                          onOpenWishlist();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>Saved Shortlist ({wishlistCount})</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          signOut();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl transition-all"
              >
                <LogIn className="w-4 h-4 text-brand-600" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {!user ? (
              <button
                onClick={onOpenAuth}
                className="bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-black uppercase">
                {user.displayName.charAt(0) || 'U'}
              </div>
            )}

            <button
              onClick={onOpenWishlist}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="pb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Select Your College
            </label>
            <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
              <MapPin className="w-4 h-4 text-brand-600 mr-2 flex-shrink-0" />
              <select
                value={selectedCollegeId}
                onChange={(e) => {
                  onSelectCollege(e.target.value);
                  setMobileMenuOpen(false);
                }}
                className="bg-transparent text-sm font-semibold text-slate-800 w-full focus:outline-none"
              >
                <option value="all">📍 All Colleges & Universities</option>
                {colleges.map((col) => (
                  <option key={col.id} value={col.id}>
                    🎓 {col.shortName} ({col.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActiveTab('rooms');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-sm ${
                activeTab === 'rooms' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Rooms & PGs</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('roommates');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-sm ${
                activeTab === 'roommates' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>ApnaRoommate</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <Calculator className="w-4 h-4 text-brand-600" />
              <span>Rent Splitter</span>
            </button>

            <button
              onClick={() => {
                onOpenCompare();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <GitCompare className="w-4 h-4 text-brand-600" />
              <span>Compare ({compareCount})</span>
            </button>
          </div>

          <button
            onClick={() => {
              onOpenPostRoom();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white font-bold text-sm py-3 rounded-xl shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Room / Sublet (Free)</span>
          </button>

          {user ? (
            <button
              onClick={() => {
                signOut();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-700 font-bold text-xs py-2.5 rounded-xl border border-rose-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out ({user.displayName})</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-xs py-2.5 rounded-xl"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
