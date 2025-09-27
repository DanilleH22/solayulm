// src/components/AiCompanion/api.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // make sure you set this in .env
  dangerouslyAllowBrowser: true, // ⚠ only for dev — for production use a backend!
});

export const getAIResponseWithVoice = async (msg) => {
  try {
    // 1. Text response
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: msg }],
    });

    const reply = completion.choices[0].message.content;

    // 2. Audio response
    const tts = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy", // options: alloy, verse, cosmo...
      input: reply,
    });

    // 3. Convert to playable audio
    const audioUrl = URL.createObjectURL(
      new Blob([await tts.arrayBuffer()], { type: "audio/mp3" })
    );

    return { reply, audioUrl };
  } catch (err) {
    console.error("❌ OpenAI API error:", err);
    return { reply: "⚠️ Something went wrong.", audioUrl: null };
  }
};
