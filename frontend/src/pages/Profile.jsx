// filepath: frontend/src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/profile/ProfileCard';
import PostFeed from '../components/posts/PostFeed';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';


export default function Profile() {
  const { userId } = useParams();
  console.log(userId);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const { getUserProfile, getUserPosts } = useAuth();
  
  const loadProfile = async () => {
    try {
      const data = await getUserProfile(userId);
      setProfile(data);
    } catch (error) {
      toast.error('Failed to load profile');
    }
  };
  
  const loadUserPosts = async () => {
    
    try {
      const data = await getUserPosts(userId);
      
     
      
      setPosts(data);
      return ;
    }catch (error) {
      console.log(error);
      toast.error('Failed to load posts');
      return ;
    }
  };
  useEffect(() => {
    loadProfile();
    loadUserPosts();
  }, [userId, loadProfile, loadUserPosts]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {profile && <ProfileCard profile={profile} />}
      <div className="mt-8">
        <PostFeed posts={posts} />
      </div>
    </div>
  );
}