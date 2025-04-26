const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes"); // 👈🏻 اضافه کردن روت‌های لاگین و ثبت نام

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // 👈🏻 فعال کردن cors که فرانت بتونه به بک وصل بشه
app.use(express.json()); // 👈🏻 بتونیم دیتا رو به صورت JSON از کاربر دریافت کنیم

// Routes
app.use("/api", authRoutes); // 👈🏻 مسیر اصلی API ها (ثبت نام و لاگین و غیره)

// Home Route (اختیاری، تستی)
app.get("/", (req, res) => {
  res.send("Welcome to Mini Blog Backend 🚀");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
