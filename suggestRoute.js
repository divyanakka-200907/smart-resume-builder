const express = require("express");
const router = express.Router();
require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/suggest", async (req, res) => {
  try {
    const { skills, experience } = req.body;

    const prompt = `Based on the following skills and experience, write 3 professional resume bullet points:\n\nSkills: ${skills}\nExperience: ${experience}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const suggestions = completion.choices[0].message.content
      .trim()
      .split("\n")
      .filter(line => line.trim() !== "");

    res.json({ suggestions });
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    res.status(500).json({ message: "Failed to fetch suggestions", error: err.message });
  }
});

module.exports = router;
