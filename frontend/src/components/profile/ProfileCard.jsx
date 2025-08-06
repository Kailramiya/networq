import { Mail, Briefcase, MapPin, Link2, Calendar } from 'lucide-react';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProfileCard({ profile }) {
  const { authUser } = useAuth();
  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-linkedin-light to-linkedin-primary rounded-t-lg" />
      
      {/* Profile Info */}
      <div className="px-6 py-4 relative">
        {/* Profile Picture */}
        <div className="absolute -top-16">
          <div className="h-32 w-32 rounded-full ring-4 ring-white bg-white overflow-hidden">
            
              <div className="h-full w-full bg-linkedin-primary flex items-center justify-center text-white text-4xl font-bold">
                {profile?.fullName?.[0].toUpperCase() || 'U'}
              </div>
            
          </div>
        </div>

        {/* User Info */}
        <div className="mt-16">
          <h1 className="text-2xl font-bold text-gray-900">{profile?.fullName?.toUpperCase()}</h1>
          
          
          <div>
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-2" />
              <span>{profile?.email}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Joined {new Date(profile?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Bio */}
          {profile?.bio && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">About</h3>
              <p className="mt-2 text-gray-600 whitespace-pre-line">{profile.bio}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
          
        {(authUser.id !== profile._id)&& (
          <div className="mt-6 flex space-x-3">
          <button className="flex-1 bg-linkedin-primary text-white px-4 py-2 rounded-full hover:bg-linkedin-dark transition-colors">
            Connect
          </button>
          <button className="flex-1 border border-linkedin-primary text-linkedin-primary px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
            Message
          </button>
        </div>
      )}
      </div>
    </div>
  );
}