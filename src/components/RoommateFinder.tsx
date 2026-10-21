import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  GraduationCap, 
  Coins, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  UserPlus, 
  X,
  CheckCircle2
} from 'lucide-react';
import { RoommateProfile } from '../types';

interface RoommateFinderProps {
  roommates: RoommateProfile[];
  onAddRoommate: (newProfile: RoommateProfile) => void;
}

export const RoommateFinder: React.FC<RoommateFinderProps> = ({
  roommates,
  onAddRoommate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [dietFilter, setDietFilter] = useState<string>('all');
  const [sleepFilter, setSleepFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for adding roommate profile
  const [name, setName] = useState('');
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('2nd Year');
  const [budget, setBudget] = useState(6000);
  const [targetArea, setTargetArea] = useState('');
  const [sleepSchedule, setSleepSchedule] = useState<'Night Owl 🦉' | 'Early Bird 🌅' | 'Flexible ⏰'>('Night Owl 🦉');
  const [diet, setDiet] = useState<'Vegetarian 🥦' | 'Non-Vegetarian 🍗' | 'Eggetarian 🥚'>('Vegetarian 🥦');
  const [aboutMe, setAboutMe] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [contactWhatsApp, setContactWhatsApp] = useState('');

  const filteredRoommates = roommates.filter((m) => {
    if (genderFilter !== 'all' && m.gender !== genderFilter) return false;
    if (dietFilter !== 'all' && !m.habits.diet.includes(dietFilter)) return false;
    if (sleepFilter !== 'all' && !m.habits.sleepSchedule.includes(sleepFilter)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        m.name.toLowerCase().includes(q) ||
        m.college.toLowerCase().includes(q) ||
        m.course.toLowerCase().includes(q) ||
        m.targetArea.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !college.trim() || !contactWhatsApp.trim()) {
      alert('Please fill all mandatory fields!');
      return;
    }

    const newProfile: RoommateProfile = {
      id: `mate-${Date.now()}`,
      name: name.trim(),
      age: Number(age),
      gender,
      college: college.trim(),
      course: course.trim() || 'Degree Student',
      year,
      budget: Number(budget),
      targetArea: targetArea.trim() || 'Near College',
      habits: {
        sleepSchedule,
        diet,
        smokingDrinking: 'Strictly No 🚭',
        cleanliness: 'Neat Freak ✨',
        studyVibe: 'Pin-drop Silent 🤫',
      },
      lookingFor: lookingFor.trim() || 'Looking for a flatmate or room partner to share rent.',
      aboutMe: aboutMe.trim() || 'College student looking for a friendly and clean roommate.',
      contactWhatsApp: contactWhatsApp.trim().replace(/\D/g, ''),
      avatar: gender === 'female' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      verifiedStudent: true,
    };

    onAddRoommate(newProfile);
    setShowAddModal(false);
    alert('🎉 Your roommate profile has been published! Students can now reach out.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-brand-900 to-purple-900 text-white rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-brand-200 mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ApnaRoommate • Split Rent & Cut Costs 50%</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Find Your Ideal College Flatmate & Room Partner
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-2 font-normal">
            Match with students from your campus based on study vibe, sleep cycles (Night Owl vs Early Bird), food habits, and budget.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Your Roommate Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by college, branch, course or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Gender Filter */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 w-full md:w-auto">
            {(['all', 'male', 'female'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  genderFilter === g
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {g === 'all' ? 'All' : g === 'male' ? 'Guys' : 'Girls'}
              </button>
            ))}
          </div>

          {/* Sleep Cycle */}
          <select
            value={sleepFilter}
            onChange={(e) => setSleepFilter(e.target.value)}
            className="w-full md:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="all">🦉 All Sleep Cycles</option>
            <option value="Night Owl">Night Owls (Study Late)</option>
            <option value="Early Bird">Early Birds (Morning)</option>
          </select>

          {/* Diet Filter */}
          <select
            value={dietFilter}
            onChange={(e) => setDietFilter(e.target.value)}
            className="w-full md:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="all">🥦 All Diets</option>
            <option value="Vegetarian">Pure Vegetarian</option>
            <option value="Eggetarian">Eggetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>

        </div>
      </div>

      {/* Roommate Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoommates.map((mate) => {
          const whatsappMsg = encodeURIComponent(
            `Hi ${mate.name}, I saw your roommate profile on ApnaRoom! I'm also looking for a flatmate near ${mate.college}. Can we connect?`
          );

          return (
            <div
              key={mate.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 shadow-sm hover:shadow-xl transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Top Avatar & Basic Info */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="relative">
                    <img
                      src={mate.avatar}
                      alt={mate.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-100 shadow"
                    />
                    {mate.verifiedStudent && (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow" title="Verified Student ID">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-base text-slate-900 truncate">
                        {mate.name}, <span className="text-slate-500 font-semibold">{mate.age}</span>
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        mate.gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {mate.gender === 'female' ? 'Female' : 'Male'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-brand-600 font-bold truncate mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{mate.college}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {mate.course} • {mate.year}
                    </p>
                  </div>
                </div>

                {/* Target Budget & Location */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 mb-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Budget</span>
                    <span className="font-extrabold text-slate-900">₹{mate.budget.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Preferred Area</span>
                    <span className="font-bold text-slate-700 truncate max-w-[140px] inline-block">{mate.targetArea}</span>
                  </div>
                </div>

                {/* Habit Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                  <span className="bg-purple-50 text-purple-800 font-semibold px-2 py-0.5 rounded-md border border-purple-200">
                    {mate.habits.sleepSchedule}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
                    {mate.habits.diet}
                  </span>
                  <span className="bg-sky-50 text-sky-800 font-semibold px-2 py-0.5 rounded-md border border-sky-200">
                    {mate.habits.studyVibe}
                  </span>
                  <span className="bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-md border border-amber-200">
                    {mate.habits.cleanliness}
                  </span>
                </div>

                {/* About me snippet */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-2">
                  "{mate.aboutMe}"
                </p>

                <div className="text-[11px] text-indigo-700 bg-indigo-50/70 p-2 rounded-lg font-medium border border-indigo-100 mb-4">
                  <strong>Looking for:</strong> {mate.lookingFor}
                </div>
              </div>

              {/* Connect CTA */}
              <a
                href={`https://wa.me/${mate.contactWhatsApp}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          );
        })}
      </div>

      {/* Add Profile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
              Create Your Roommate Profile
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Help fellow students from your college find and team up with you.
            </p>

            <form onSubmit={handleCreateProfile} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kartik Mehta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">College / University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DU Kirori Mal College"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Course & Stream</label>
                  <input
                    type="text"
                    placeholder="e.g. B.Com (Hons)"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Year of Study</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="1st Year Fresher">1st Year Fresher</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year / Final">4th Year / Final</option>
                    <option value="Postgraduate / Masters">Postgraduate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Budget (₹/month)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Preferred Locality</label>
                  <input
                    type="text"
                    placeholder="e.g. Hudson Lane / Kamla Nagar"
                    value={targetArea}
                    onChange={(e) => setTargetArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sleep Schedule</label>
                  <select
                    value={sleepSchedule}
                    onChange={(e) => setSleepSchedule(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="Night Owl 🦉">Night Owl 🦉 (Study Late)</option>
                    <option value="Early Bird 🌅">Early Bird 🌅 (Morning)</option>
                    <option value="Flexible ⏰">Flexible ⏰</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Diet Preference</label>
                  <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="Vegetarian 🥦">Vegetarian 🥦</option>
                    <option value="Eggetarian 🥚">Eggetarian 🥚</option>
                    <option value="Non-Vegetarian 🍗">Non-Vegetarian 🍗</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">About Yourself</label>
                <textarea
                  rows={2}
                  placeholder="Share your interests, hobbies, or routine..."
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 919876543210"
                  value={contactWhatsApp}
                  onChange={(e) => setContactWhatsApp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl mt-3 shadow-lg"
              >
                Publish Roommate Profile (Free)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
