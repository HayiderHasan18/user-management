const dbConnection = require('../Db/db');
const { StatusCodes } = require('http-status-codes');

// CREATE POST
async function createPost(req, res) {
    const { title, content } = req.body;
    const userid = req.user.userid; // authenticated user

    if (!title || !content) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Title and content are required" });
    }

    try {
        await dbConnection.query(
            "INSERT INTO posts (userid, title, content) VALUES (?, ?, ?)",
            [userid, title, content]
        );
        res.status(StatusCodes.CREATED).json({ msg: "Post created successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}

// GET ALL POSTS
async function getAllPosts(req, res) {
    try {
        const [posts] = await dbConnection.query(
            `SELECT p.id, p.title, p.content, p.created_at, u.username, u.userid
             FROM posts p
             JOIN users u ON p.userid = u.userid
             ORDER BY p.created_at DESC`
        );
        res.status(StatusCodes.OK).json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}

// GET SINGLE POST
async function getPost(req, res) {
    const { id } = req.params;

    try {
        const [posts] = await dbConnection.query(
            `SELECT p.id, p.title, p.content, p.created_at, u.username, u.userid
             FROM posts p
             JOIN users u ON p.userid = u.userid
             WHERE p.id = ?`,
            [id]
        );

        if (posts.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Post not found" });
        }

        res.status(StatusCodes.OK).json(posts[0]);
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}

// UPDATE POST
async function updatePost(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    const userid = req.user.userid;

    try {
        const [posts] = await dbConnection.query("SELECT * FROM posts WHERE id = ?", [id]);

        if (posts.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Post not found" });
        }

        if (posts[0].userid !== userid) {
            return res.status(StatusCodes.FORBIDDEN).json({ msg: "You can only update your own post" });
        }

        await dbConnection.query(
            "UPDATE posts SET title = ?, content = ? WHERE id = ?",
            [title, content, id]
        );

        res.status(StatusCodes.OK).json({ msg: "Post updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}

// DELETE POST
async function deletePost(req, res) {
    const { id } = req.params;
    const userid = req.user.userid;

    try {
        const [posts] = await dbConnection.query("SELECT * FROM posts WHERE id = ?", [id]);

        if (posts.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Post not found" });
        }

        if (posts[0].userid !== userid) {
            return res.status(StatusCodes.FORBIDDEN).json({ msg: "You can only delete your own post" });
        }

        await dbConnection.query("DELETE FROM posts WHERE id = ?", [id]);
        res.status(StatusCodes.OK).json({ msg: "Post deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    }
}

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost };
