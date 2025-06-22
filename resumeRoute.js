
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: String,
  education: String,
  experience: String,
});

const Resume = mongoose.model("Resume", resumeSchema);

router.post("/resume", async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json({ message: "Resume saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
