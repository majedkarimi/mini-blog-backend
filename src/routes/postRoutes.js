const express = require("express");
const router = express.Router();

const {
  createpost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const authenticateToken = require("../middlewares/authMiddleware");

// Create Post
router.post("/", authenticateToken, createpost);

// All Post
router.get("/", getPosts);

// Update Post
router.put("/:id", authenticateToken, updatePost);

// Delete Post
router.delete("/:id", authenticateToken, deletePost);

module.exports = router;
