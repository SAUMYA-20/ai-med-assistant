// import { NextRequest, NextResponse } from "next/server";
// import { openai } from "@/config/OpenAiModel";
// import { AIDoctorAgents } from "@/shared/list";

// export async function POST(req: NextRequest) {
//     const { notes } = await req.json();

//     try {
//         const completion = await openai.chat.completions.create({
//             model: "google/gemini-2.0-flash-exp:free",
//             messages: [
//                 {
//                     role: "system",
//                     content: `Available Doctors: ${JSON.stringify(AIDoctorAgents)}`,
//                 },
//                 {
//                     role: "user",
//                     content: `Suggest a doctor agent based on the following symptoms/notes: ${notes}. Return the result in pure JSON format without markdown or any explanation.`,
//                 },
//             ],
//         });

//         const rawMessage = completion.choices[0].message.content || '';

//         const cleaned = rawMessage
//             .replace(/```json/g, '')
//             .replace(/```/g, '')
//             .trim();

//         const parsedJSON = JSON.parse(cleaned);

//         return NextResponse.json(parsedJSON);
//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIDoctorAgents } from '@/shared/list';

// Ensure the API key is defined
const apiKey = process.env.OPEN_ROUTER_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  const prompt = `
    Available Doctors: ${JSON.stringify(AIDoctorAgents)}
    Suggest a doctor agent based on the following symptoms/notes: ${notes}
    Return the result in pure JSON format without markdown or any explanation.
  `;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsedJSON = JSON.parse(cleaned);

    return NextResponse.json(parsedJSON);
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
