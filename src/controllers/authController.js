import { db, auth } from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

// Fungsi untuk Register User
export const registerUser = async (req, res) => {
  const { nama, email, password } = req.body;

  if (!nama || !email || !password) {
    return res
      .status(400)
      .json({ error: "Nama, email, dan password harus diisi." });
  }

  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: nama,
    });

    const query = `
      INSERT INTO users (id,nama, email, createdAt) 
      VALUES (?, ?, ?, ?)
    `;

    const values = [userRecord.uid, nama, email, new Date()];
    db.execute(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting user into MySQL: ", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({
        message: "User registered successfully",
        userId: userRecord.uid,
      });
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to register user" });
  }
};

// Fungsi untuk Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return res.status(401).json({ message: "User not found" });
    }

    const query = "SELECT * FROM users WHERE email = ?";
    db.execute(query, [email], (err, results) => {
      if (err) {
        console.error("Error fetching user from MySQL: ", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "User not found in database" });
      }

      const token = jwt.sign(
        { id: userRecord.uid, email: userRecord.email },
        secretKey,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login successful",
        token: token,
      });
    });
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(400).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
