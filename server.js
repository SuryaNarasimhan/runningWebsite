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

app.get("/", (req, res) => {
  res.send("RunFit backend is running!");
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are Surya's website chatbot. Answer briefly and helpfully."
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