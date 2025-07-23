import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIDoctorAgents } from '@/shared/list';
import { db } from '@/config/db';
import { SessionchatTable } from '@/config/schema';
import { eq } from 'drizzle-orm';

// Ensure the API key is defined
const apiKey = process.env.OPEN_ROUTER_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a health-related conversation with a user. Please analyze the dialogue and generate a structured medical summary in JSON format depending upon AI medical agent information and conversation between AI medical agent and user Follow this format strictly:

1. agent: the name of the AI medical specialist (e.g., "General Physician AI").
2. user: the name of the patient or "Anonymous" if not provided.
3. timestamp: current date and time in ISO format.
4. chiefComplaint: one-sentence summary of the main health concern discussed.
5. summary: a 2–3 sentence summary of the conversation, symptoms, and any advice given.
6. symptoms: a list of symptoms mentioned by the user.
7. duration: how long the user has experienced the symptoms (e.g., "3 days", "2 weeks").
8. severity: indicate whether the condition is mild, moderate, or severe.
9. medicationsMentioned: list of any medicines the user mentioned.
10. recommendations: a list of AI health suggestions (e.g., rest, hydration, see a doctor).

Return only the result in this strict JSON format:

{
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "mild | moderate | severe",
  "medicationsMentioned": ["medicine1", "medicine2"],
  "recommendations": ["suggestion1", "suggestion2"]
}

Only include valied fields. Respond with nothing else.

`;

export async function POST(req: NextRequest) {
  const { sessionId, sessionDetails,messages } = await req.json();

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const result = await model.generateContent(REPORT_GEN_PROMPT);
    const text = result.response.text();
    const UserInput="AI Doctor Agent Information:"+JSON.stringify(sessionDetails)+"Conversation:"+JSON.stringify(messages)
    const cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsedJSON = JSON.parse(cleaned);

    const finalResult = await db.update(SessionchatTable).set({
        report:result,
        conversation:messages
    }).where(eq(SessionchatTable.sessionId, sessionId))
    return NextResponse.json(parsedJSON);
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
