import express from 'express';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
export const getProfilebyUserId = async (req, res) => {
    const { userId } = req.params;
    
    try {
        const userProfile = await User.findById(userId).select('-password -__v');
        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }
        return res.status(200).json(userProfile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getPostsByUserId= async (req, res) => {
    const { userId } = req.params;
    
    try {
        const posts = await Post.find({ author: userId }).populate('author', 'fullName email').sort({ createdAt: -1 });

        if (!posts || posts.length === 0) {
            return res.status(200).json({ message: "No posts found for this user" });
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts by user ID:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}