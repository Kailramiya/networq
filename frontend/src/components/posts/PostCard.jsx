import { Mail, Briefcase, MapPin, Calendar, Users, Star, ExternalLink, MessageCircle, Share2, Heart, User, MoreHorizontal, Bookmark, Send } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post, viewMode = 'grid' }) {
  
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [commentsCount] = useState(post.comments || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const truncateContent = (text, limit = null) => {
    // Adjust limit based on view mode
    const defaultLimit = viewMode === 'grid' ? 50 : 200;
    const actualLimit = limit || defaultLimit;
    
    if (!text || text.length <= actualLimit) return text;
    return text.substring(0, actualLimit) + '...';
  };

  const truncateUserName = (name) => {
    const limit=(viewMode === 'grid' )? 23:30;
    if(viewMode !== 'grid' ) {
      return name;
    }
    // if(!name) return 'Anonymous';
    if(name.length <= limit) return name;
    return name.substring(0, limit) + '...';
  };
  

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInMins = Math.floor((now - postDate) / (1000 * 60 ));
    
    if (diffInMins < 1) return 'Just now';
    if(diffInMins < 60) return `${diffInMins}m ago`;
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  return (
    <div className={`
      group relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-lg border border-white/40 
      overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-white/60
      ${viewMode === 'grid' ? 'h-full ' : 'mb-6'}
    `}>
      
      {/* Post Header */}
      <div className="px-6 py-4 border-b border-gray-100/50 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {/* Author Avatar */}
            <div className="relative flex-shrink-0">
              <div className={`
                ${viewMode === 'grid' ? 'size-10' : 'w-12 h-12'} 
                rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center 
                shadow-lg ring-2 ring-white group-hover:ring-blue-100 transition-all duration-300
              `}>
                {post.author?.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.fullName}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <span className={`text-white font-bold ${viewMode === 'grid' ? 'text-sm' : 'text-lg'}`}>
                    {post.author?.fullName?.[0] || 'U'}
                  </span>
                )}
              </div>
              
              {/* Online indicator - smaller in grid view */}
              <div className={`
                absolute -bottom-1 -right-1 bg-green-500 rounded-full border-2 border-white shadow-sm
                ${viewMode === 'grid' ? 'w-3 h-3' : 'w-4 h-4'}
              `}>
                <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1 min-w-0">
              <Link
                to={`/profile/${post.author?._id}`}
                 className="flex items-center space-x-2">
                <h3 className={`
                  font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer truncate
                  ${viewMode === 'grid' ? 'text-base' : 'text-lg'}
                `}>
                  {truncateUserName(post.author?.fullName?.toUpperCase()) || 'Anonymous User'}
                </h3>
                {post.author?.isVerified && (
                  <div className={`
                    bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0
                    ${viewMode === 'grid' ? 'w-4 h-4' : 'w-5 h-5'}
                  `}>
                    <Star className={`text-white fill-current ${viewMode === 'grid' ? 'w-2 h-2' : 'w-3 h-3'}`} />
                  </div>
                )}
              </Link>
              
              <p className={`text-gray-600 font-medium ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`}>
                LinkedIn Member
              </p>
              
              <div className="flex items-center space-x-3 mt-1">
                <span className={`text-gray-500 ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`}>
                  {formatTimeAgo(post.createdAt)}
                </span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Users className={`${viewMode === 'grid' ? 'w-3 h-3' : 'w-3 h-3'}`} />
                  <span className={`${viewMode === 'grid' ? 'text-xs' : 'text-xs'}`}>Public</span>
                </div>
              </div>
            </div>
          </div>

          {/* More Options */}
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 group/more flex-shrink-0">
            <MoreHorizontal className={`text-gray-500 group-hover/more:text-gray-700 ${viewMode === 'grid' ? 'w-4 h-4' : 'w-5 h-5'}`} />
          </button>
        </div>
      </div>

      {/* Post Content - IMPROVED SECTION */}
      <div className={`px-6 py-5 ${viewMode === 'grid' ? 'flex-1 flex flex-col' : ''}`}>
        <div className="prose max-w-none flex-1">
          <div className={`
            text-gray-800 whitespace-pre-wrap break-words
            ${viewMode === 'grid' ? 'text-sm leading-6' : 'text-base leading-7'}
            ${!showFullContent && viewMode === 'grid' ? 'line-clamp-none' : ''}
          `}>
            {/* Display content with proper line breaks and spacing */}
            <p className="mb-0">
              {showFullContent ? post.content : truncateContent(post.content)}
            </p>
          </div>
          
          {/* Show More/Less Button */}
          {post.content && post.content.length > (viewMode === 'grid' ? 300 : 400) && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-600 hover:text-blue-700 font-medium mt-3 text-sm hover:underline transition-all duration-200 inline-block"
            >
              {showFullContent ? 'Show less' : 'See more'}
            </button>
          )}
        </div>

        {/* Post Tags/Topics (if any) */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, viewMode === 'grid' ? 3 : 5).map((tag, index) => (
              <span
                key={index}
                className={`
                  px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium 
                  hover:bg-blue-100 transition-colors duration-200 cursor-pointer text-xs
                `}
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > (viewMode === 'grid' ? 3 : 5) && (
              <span className="text-gray-500 text-xs">
                +{post.tags.length - (viewMode === 'grid' ? 3 : 5)} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Engagement Stats */}
      {(likesCount > 0 || commentsCount > 0) && (
        <div className="px-6 py-2 border-t border-gray-100/50 flex-shrink-0">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              {likesCount > 0 && (
                <div className="flex items-center space-x-1">
                  <div className="flex -space-x-1">
                    <div className={`bg-red-500 rounded-full border border-white flex items-center justify-center ${viewMode === 'grid' ? 'w-4 h-4' : 'w-5 h-5'}`}>
                      <Heart className={`text-white fill-current ${viewMode === 'grid' ? 'w-2 h-2' : 'w-3 h-3'}`} />
                    </div>
                    {likesCount > 1 && (
                      <div className={`bg-blue-500 rounded-full border border-white flex items-center justify-center ${viewMode === 'grid' ? 'w-4 h-4' : 'w-5 h-5'}`}>
                        <span className={`text-white ${viewMode === 'grid' ? 'text-xs' : 'text-xs'}`}>👍</span>
                      </div>
                    )}
                  </div>
                  <span className={`hover:underline cursor-pointer ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`}>
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                  </span>
                </div>
              )}
            </div>
            
            {commentsCount > 0 && (
              <span className={`hover:underline cursor-pointer ${viewMode === 'grid' ? 'text-xs' : 'text-sm'}`}>
                {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-6 py-3 border-t border-gray-100/50 bg-gray-50/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`
                flex items-center space-x-2 rounded-xl font-medium transition-all duration-300
                ${viewMode === 'grid' ? 'px-2 py-1.5' : 'px-4 py-2.5'}
                ${isLiked
                  ? 'text-red-600 bg-red-50 hover:bg-red-100'
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }
              `}
            >
              <Heart className={`
                ${isLiked ? 'fill-current' : ''} transition-transform duration-200 
                ${isLiked ? 'scale-110' : 'hover:scale-110'}
                ${viewMode === 'grid' ? 'w-4 h-4' : 'w-5 h-5'}
              `} />
              <span className={viewMode === 'grid' ? 'text-xs' : 'text-sm'}>Like</span>
            </button>

            {/* Comment Button */}
            <button className={`
              flex items-center space-x-2 rounded-xl text-gray-600 hover:text-blue-600 
              hover:bg-blue-50 font-medium transition-all duration-300
              ${viewMode === 'grid' ? 'px-2 py-1.5' : 'px-4 py-2.5'}
            `}>
              <MessageCircle className={`hover:scale-110 transition-transform duration-200 ${viewMode === 'grid' ? 'w-4 h-4' : 'w-5 h-5'}`} />
              <span className={viewMode === 'grid' ? 'text-xs' : 'text-sm'}>Comment</span>
            </button>

            {/* Share Button */}
            <button className={`
              flex items-center space-x-2 rounded-xl text-gray-600 hover:text-green-600 
              hover:bg-green-50 font-medium transition-all duration-300
              ${viewMode === 'grid' ? 'px-2 py-1.5' : 'px-4 py-2.5'}
            `}>
              <Send className={`hover:scale-110 transition-transform duration-200 ${viewMode === 'grid' ? 'w-4 h-4' : 'w-5 h-5'}`} />
              <span className={viewMode === 'grid' ? 'text-xs' : 'text-sm'}>Share</span>
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className={`
              rounded-xl transition-all duration-300
              ${viewMode === 'grid' ? 'p-1.5' : 'p-2.5'}
              ${isBookmarked
                ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
              }
            `}
          >
            <Bookmark className={`
              ${isBookmarked ? 'fill-current' : ''} hover:scale-110 transition-transform duration-200
              ${viewMode === 'grid' ? 'w-4 h-4' : 'w-5 h-5'}
            `} />
          </button>
        </div>
      </div>
    </div>
  );
}
