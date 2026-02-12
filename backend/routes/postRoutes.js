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


router.post('/', authMiddleware, createPost);       
router.get('/', getAllPosts);                       
router.get('/:id', getPost);                        
router.put('/:id', authMiddleware, updatePost);     
router.delete('/:id', authMiddleware, deletePost); 

module.exports = router;
