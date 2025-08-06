import { useState } from 'react';
import { Image, Link2, Send, Sparkles, Smile, Calendar, MapPin } from 'lucide-react';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({ onSubmit, loading = false }) {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const { authUser } = useAuth();
  
  const maxChars = 1000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    onSubmit(content);
    setContent('');
    setCharCount(0);
    navigate("/");
  };

  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setContent(text);
      setCharCount(text.length);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/40 overflow-hidden">


      {/* Form Section - Takes Full Height */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        
        {/* Content Input - Flexible Height */}
        <div className="flex-1 p-6">
          <div className="h-full relative">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="What's on your mind? Share your thoughts, experiences, or insights..."
              className="w-full h-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-blue-200 focus:border-blue-500 resize-none transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50 hover:bg-white focus:bg-white"
              style={{ minHeight: '200px' }}
            />
            
            {/* Character Counter */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                charCount > maxChars * 0.8 
                  ? charCount >= maxChars 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {charCount}/{maxChars}
              </div>
            </div>
          </div>

          
        </div>

        {/* Action Buttons Section */}
        <div className="px-6 py-4 border-t border-gray-100/50 bg-gray-50/50 flex-shrink-0">
          
          

          {/* Submit Section */}
          <div className="flex items-center justify-between">
           
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={!content.trim() || loading || charCount > maxChars}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform
                ${!content.trim() || loading || charCount > maxChars
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl'
                }
              `}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Share Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-16 translate-x-16 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full translate-y-12 -translate-x-12 pointer-events-none"></div>
    </div>
  );
}
