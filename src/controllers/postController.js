const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create new post
const createpost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong with create post" });
  }
};

// Get all Post
const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wong fetcing posts" });
  }
};

// Update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "you are not allow to edit this post" });
    }
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong fetching posts" });
  }
};

// Delete post
const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post) return res.status(404).json({ message: "post not found" });
  if (post.userId !== userId) {
    return res
      .status(403)
      .json({ message: "you not allow to delete this post" });
  }
  await prisma.post.delete({ where: { id: Number(id) } });
  res.status(200).json({ message: "Post deleted successfully" });
};

module.exports = {
  createpost,
  getPosts,
  updatePost,
  deletePost,
};
