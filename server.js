import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(express.static("."));

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});



app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
  "You are RunFit AI, a running route and shoe advisor. Analyze the user's running route description. Give advice in these sections: Route Summary, Shoe Features to Look For, Training Tips, Injury Risk Notes, and Final Recommendation. Do not claim to diagnose medical issues."
      },
      {
        role: "user",
        content: userMessage
      }
    ]
  });

  res.json({
    reply: completion.choices[0].message.content
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});