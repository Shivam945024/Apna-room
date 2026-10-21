import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  PhoneCall, 
  AlertCircle 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Student Safety Banner */}
        <div className="bg-gradient-to-r from-brand-950 via-indigo-950 to-slate-800 border border-brand-800/40 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <ShieldCheck className="w-4 h-4" />
                <span>ApnaRoom Student Safety & Fair Rent Pledge</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                5 Golden Rules Before Finalizing Any Student Room
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                Protect yourself from local broker scams, unexpected bill surprises, and unfair deposit forfeits.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs w-full md:w-auto">
              <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>0% Brokerage:</strong> Never pay 15-day/1-month broker fees</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Test Wi-Fi:</strong> Run a speed test during room visit</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>1 Month Deposit:</strong> Max 1 month refundable deposit</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Sub-meter Rate:</strong> Confirm ₹7-₹9/unit in written receipt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Apna<span className="text-brand-500">Room</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              India's dedicated student accommodation platform. Designed to eliminate broker hassles, reduce commute times, and connect verified landlords and like-minded flatmates.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free for Students Forever</span>
            </div>
          </div>

          {/* Student Hubs */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Popular College Hubs
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">DU North Campus (Hansraj, Hindu, SRCC)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IIT Delhi & JNU (Ber Sarai, Hauz Khas)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Christ & St. Joseph's (Koramangala, BLR)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pune University & Fergusson (FC Road)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kota Student Coaching Hub (Allen, Motion)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Amity & Knowledge Park (Noida)</a></li>
            </ul>
          </div>

          {/* Student Features */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Student Tools
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">ApnaRoommate Finder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rent & Expense Split Calculator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compare Shortlisted PGs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Schedule Free In-Person Visit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">List Your Vacant Room / Sublet</a></li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              Student Support & Helplines
            </h4>
            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80 space-y-2 text-[11px]">
              <div>
                <span className="text-slate-400 block">National Anti-Ragging Helpline:</span>
                <span className="font-bold text-amber-400">1800-180-5522 (Toll Free)</span>
              </div>
              <div>
                <span className="text-slate-400 block">National Women Helpline:</span>
                <span className="font-bold text-rose-400">1091</span>
              </div>
              <div>
                <span className="text-slate-400 block">ApnaRoom Student Support:</span>
                <span className="font-bold text-slate-200">support@apnaroom.student</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ApnaRoom Technologies. Built specifically for college students across India.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for hassle-free campus living</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
