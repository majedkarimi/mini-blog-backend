const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Register a new User
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //  Check if use already exist
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User Already exist." });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .json({ message: "User Created Successfully.", userId: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Somthing went wrong." });
  }
};
// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credemtials" });
    }
  } catch (err) {}
};
