// src/components/Posts/PostsPage.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../services/api";
import PostForm from "./PostForm";
import "../posts/post.css";
import { toast } from "react-toastify";
const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  // Get logged-in user ID from token
  const token = sessionStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).userid : null;

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSaved = () => {
    setEditingPost(null);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosInstance.delete(`/posts/${id}`);
      toast.success("Post deleted successfully!");
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="posts-container">
      <PostForm editingPost={editingPost} onPostSaved={handlePostSaved} />

      <h2 className="text-2xl text-center"> Enjoy All Wabi Skills Members Posts and others</h2>
      <div className="posts-list">
        {posts.length === 0 && <p>No posts available.</p>}
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="font-bold text-xl mb-2 text-center">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <small>By: {post.username}</small>
            <div className="post-actions">
              {post.userid === userId && (
                <>
                  <button className="edit-btn" onClick={() => handleEdit(post)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
