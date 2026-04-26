import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import SubmitButton from '../../../components/ui/buttons/SubmitButton';

export default function Profile() {
  const [formData, setFormData] = useState({
    username: 'astargalaxy_user',
    email: 'user@astargalaxy.com',
    fullName: 'Alex Mercer',
    phone: '+1 555-019-2834',
    dob: '1995-08-24',
    gender: 'male'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">My Profile</h2>
      <p className="text-white/70 mb-8">Manage your personal information and account security.</p>

      <div className="flex flex-col-reverse md:flex-row gap-12 max-w-4xl">

        {/* Left Column: Form Info */}
        <div className="flex-1">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Username (Read-only) */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                />
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                />
              </div>

              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-white/70 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              {/* Gender */}
              <div className="sm:col-span-2">
                <label className="block text-white/70 text-sm mb-3">Gender</label>
                <div className="flex bg-black/40 border border-white/10 rounded-lg p-1 w-fit">
                  {['Male', 'Female', 'Other'].map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: option.toLowerCase() })}
                      className={`px-8 py-2 rounded-md text-sm transition-all duration-200 ${
                        formData.gender === option.toLowerCase() 
                          ? 'bg-white/10 text-[#00e5ff] font-medium shadow-sm' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6">
              <SubmitButton>Save Profile</SubmitButton>
            </div>
          </form>
        </div>

        {/* Right Column: Avatar */}
        <div className="w-full md:w-64 flex flex-col items-center md:items-start md:border-l md:border-white/10 md:pl-12 pt-2">
          <div className="relative group mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 bg-black/40 flex items-center justify-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=1b1b1b"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hover Camera Icon */}
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera size={24} className="text-white" />
            </div>
          </div>

          <button className="px-5 py-2 border border-white/20 hover:border-white/50 hover:bg-white/5 text-white text-sm rounded-lg transition-colors flex items-center gap-2">
            <Camera size={16} />
            Upload Image
          </button>

          <p className="text-white/40 text-xs mt-4 text-center md:text-left leading-relaxed">
            File size: maximum 1MB.<br />
            File extension: .JPEG, .PNG
          </p>
        </div>

      </div>
    </div>
  );
}
