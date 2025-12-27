import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    // ✅ API key from Vercel environment variable
    const genAI = new GoogleGenerativeAI("AIzaSyBSsxbLC0Y1mQBThXToPQ53taPvxWUumtk");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `Summarize the following issue description into exactly one short professional sentence:\n"${description}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return res.status(200).json({
      summary: response.text(),
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: "AI API failed" });
  }
}
