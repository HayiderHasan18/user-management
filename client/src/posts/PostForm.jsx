import React, { useState, useEffect } from "react";
import axiosInstance from "../services/api";
import "../posts/post.css";
import { toast } from "react-toastify";

export default function PostForm({ editingPost, onPostSaved }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Both title and content are required.");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (editingPost) {
        res = await axiosInstance.put(`/posts/${editingPost.id}`, { title, content });
        toast.success("Post updated successfully!");
      } else {
        res = await axiosInstance.post("/posts", { title, content });
        toast.success("Post created successfully!");
      }

      onPostSaved(); // trigger parent refresh
      setTitle("");
      setContent("");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form">
      <h2>{editingPost ? "Edit Post" : "Create Post"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}
