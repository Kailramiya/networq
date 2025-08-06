import { useState, useEffect } from 'react';
import CreatePost from '../components/posts/CreatePost';
import PostFeed from '../components/posts/PostFeed';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { RefreshCw, Sparkles, MessageCircle, TrendingUp, Plus } from 'lucide-react';
import React from 'react';
import Navbar from '../components/Navbar';


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { createPost, getPosts } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const data = await getPosts();
      setPosts(data);
      if (isRefresh) {
        toast.success('Posts refreshed!');
      }
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCreatePost = async (content) => {
    try {
      setCreating(true);
      const newPost = await createPost(content);
      setPosts([newPost, ...posts]);
     
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setCreating(false);
    }
  };
  const { authUser } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Full Width Main Content Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
       

        {/* Main Content Grid - Updated Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Create Post Section - Full Height Sticky */}
            <div className="xl:col-span-1">
              <div className="group sticky top-8 h-screen">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 h-full flex flex-col hover:shadow-2xl transition-all duration-500 hover:bg-white/90 hover:border-white/60">
                  <div className="flex items-center mb-6 flex-shrink-0">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-lg">
                          {authUser?.fullName?.[0]?.toUpperCase() || '?'}
                        </span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-bounce"></div>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-bold text-slate-800">Share Your Story</h2>
                      <p className="text-slate-500 text-sm">What's inspiring you today?</p>
                    </div>
                  </div>
                  
                  {/* Create Post Component - Takes Full Height */}
                  <div className="flex-1 flex flex-col">
                    <CreatePost onSubmit={handleCreatePost} loading={creating} />
                  </div>

                  
                </div>
              </div>
            </div>

            {/* Main Feed Column - Takes 3/4 of the width */}
            <div className="xl:col-span-3 space-y-8">
              {loading ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="h-8 bg-slate-200 rounded-lg w-32 animate-pulse"></div>
                    <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse"></div>
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white/70 rounded-3xl p-8 animate-pulse border border-white/40">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-2xl flex-shrink-0"></div>
                        <div className="flex-1 space-y-4">
                          <div className="space-y-2">
                            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                            <div className="h-3 bg-slate-200 rounded w-1/6"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-slate-200 rounded"></div>
                            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                          </div>
                          <div className="flex items-center space-x-4 pt-4">
                            <div className="h-8 bg-slate-200 rounded-full w-16"></div>
                            <div className="h-8 bg-slate-200 rounded-full w-20"></div>
                            <div className="h-8 bg-slate-200 rounded-full w-14"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length > 0 ? (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                      <span>Recent Posts</span>
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </h3>
                    <div className="flex items-center space-x-3 bg-white/60 rounded-full px-4 py-2 backdrop-blur-sm border border-white/40">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-slate-600">Live Feed</span>
                    </div>
                  </div>
                  <PostFeed posts={posts} />
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-16 h-16 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 mb-3">Start the Conversation</h3>
                  <p className="text-slate-500 text-lg mb-6 max-w-md mx-auto">
                    Be the first to share your thoughts and connect with the community!
                  </p>
                 
                </div>
              )}
            </div>
          </div>

          
        </div>
      </div>

      {/* Enhanced Floating Refresh Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => loadPosts(true)}
          disabled={loading || refreshing}
          className="group relative w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          title="Refresh posts"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
          
          {/* Icon */}
          <div className="relative z-10">
            <RefreshCw 
              className={`w-7 h-7 mx-auto transition-transform duration-500 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180'}`}
            />
          </div>
          
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-2xl animate-ping bg-white opacity-10"></div>
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {refreshing ? 'Refreshing...' : 'Refresh Posts'}
        </div>
      </div>
    </div>
  );
}
