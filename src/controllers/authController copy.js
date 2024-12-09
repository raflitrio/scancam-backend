// ini buat menyimpan data dari Firebase

import { db, auth } from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

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

    const userRef = db.collection("users").doc(userRecord.uid);
    await userRef.set({
      id: userRecord.uid,
      nama: nama,
      email: email,
      createdAt: new Date(),
    });

    res.json({
      message: "User registered successfully",
      userId: userRecord.uid,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to register user" });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return res.status(401).json({ message: "User not found" });
    }
    const userDoc = await db.collection("users").doc(userRecord.uid).get();

    if (!userDoc.exists) {
      return res.status(401).json({ message: "User not found in database" });
    }
    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password harus diisi",
      });
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
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(400).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
