import express from 'express';
import Post from '../models/post.model.js';
export const createPost= async (req, res) => {
    
    const { content } = req.body;
    if (!content.trim()) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const post = new Post({
            content,
            author: req.user._id
        });
        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'fullName email').sort({ createdAt: -1 });
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


