const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
} = require('../Controllers/postController');

// Routes
router.post('/', authMiddleware, createPost);       // create post
router.get('/', getAllPosts);                       // get all posts
router.get('/:id', getPost);                        // get single post
router.put('/:id', authMiddleware, updatePost);     // update post (owner only)
router.delete('/:id', authMiddleware, deletePost);  // delete post (owner only)

module.exports = router;
