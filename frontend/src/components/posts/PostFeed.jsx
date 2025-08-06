import PostCard from './PostCard';
import React, { useState, useEffect } from 'react';
import { Grid, List, Filter, Search, TrendingUp, Clock, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PostFeed({ posts }) {
 
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'popular', 'trending'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts || []);

  // Filter and sort posts
  useEffect(() => {
    if (!posts?.length) {
      setFilteredPosts([]);
      return;
    }

    let filtered = posts.filter(post => 
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort posts
    switch (sortBy) {
      case 'popular':
        filtered = filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'trending':
        filtered = filtered.sort((a, b) => (b.comments || 0) - (a.comments || 0));
        break;
      default: // recent
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, sortBy]);

  if (!posts?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        {/* Enhanced Empty State */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center shadow-2xl">
            <MessageCircle className="w-16 h-16 text-gray-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-white text-2xl">✨</span>
          </div>
        </div>
        
        <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Start the Conversation
        </h3>
        <p className="text-gray-600 text-lg text-center max-w-md mb-8 leading-relaxed">
          Be the first to share your thoughts and connect with the community. Your voice matters!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2" 
            
          >
            <span>Create First Post</span>
            <TrendingUp className="w-5 h-5" />
      </Link>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50">
            Explore Topics
          </button>
        </div>
      </div>
    );
  }

  const stats = {
    total: posts.length,
    recent: posts.filter(post => {
      
      const postDate = new Date(post.createdAt);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return postDate > oneDayAgo;
    }).length,
    popular: posts.filter(post => (post.likes || 0) > 5).length
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Stats and Controls */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-6">
        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-500">Total Posts</p>
              </div>
            </div>
            
            <div className="h-12 w-px bg-gray-200"></div>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.recent}</p>
                <p className="text-sm text-gray-500">Recent</p>
              </div>
            </div>
            
            <div className="h-12 w-px bg-gray-200"></div>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.popular}</p>
                <p className="text-sm text-gray-500">Popular</p>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts, authors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-2xl px-6 py-3 pr-12 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 cursor-pointer font-medium"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Liked</option>
              <option value="trending">Most Commented</option>
            </select>
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || sortBy !== 'recent') && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600 font-medium">Active filters:</span>
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <span>Search: "{searchTerm}"</span>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-blue-600 hover:text-blue-800 ml-1"
                >
                  ×
                </button>
              </span>
            )}
            {sortBy !== 'recent' && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <span>Sort: {sortBy === 'popular' ? 'Most Liked' : 'Most Commented'}</span>
                <button 
                  onClick={() => setSortBy('recent')}
                  className="text-green-600 hover:text-green-800 ml-1"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      {filteredPosts.length !== posts.length && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-blue-800 font-medium">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
        </div>
      )}

      {/* Posts Grid/List */}
      {filteredPosts.length > 0 ? (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid gap-6 grid-cols-1 lg:grid-cols-2 ' 
            : 'space-y-6'
          }
        `}>
          {filteredPosts.map((post, index) => (
            <div
              key={post._id}
              className={`
                transform transition-all duration-300 hover:scale-[1.02]
                ${viewMode === 'grid' ? 'h-fit' : 'w-full'}
              `}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <PostCard post={post} viewMode={viewMode} />
            </div>
          ))}
        </div>
      ) : (
        /* No Results State */
        <div className="text-center py-16 bg-white/60 rounded-3xl border border-gray-100">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSortBy('recent');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Load More Button (for pagination if needed) */}
      {filteredPosts.length >= 10 && (
        <div className="text-center pt-8">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
}
