import Groq from "groq-sdk";
import dotenv from "dotenv"
dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getData(product, description) {
  const chatCompletion = await getGroqChatCompletion(product, description);
  
  return chatCompletion.choices[0]?.message?.content || "";
}

export async function getGroqChatCompletion(product, description) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Provide four points about ${product} according to ${description} and nothing else. Give points in numbers and each point should be around 10 words.`,
      },
    ],
    model: "llama3-8b-8192",
  });
}
