import { db } from "@/config/db";
import { SessionchatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { desc, eq } from "drizzle-orm";

// POST /api/session-chat
export async function POST(req: NextRequest) {
  let notes, selectedDoctor;

  try {
    const body = await req.text();
    if (!body) {
      return NextResponse.json({ error: "Missing request body" }, { status: 400 });
    }
    ({ notes, selectedDoctor } = JSON.parse(body));
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const sessionId = uuidv4();
    const user = await currentUser();
    const now = new Date().toISOString();

    const result = await db.insert(SessionchatTable).values({
      sessionId,
      notes,
      selectedDoctor,
      conversation: [],
      report: {},
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: now,
      updatedAt: now
      // @ts-ignore
    }).returning({ SessionchatTable });

    return NextResponse.json(result[0].SessionchatTable);
  } catch (e) {
    return NextResponse.json({ error: e?.toString() || "Unknown error" }, { status: 500 });
  }
}

// GET /api/session-chat?sessionId=xyz or ?sessionId=all
export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("sessionId");
    const user = await currentUser();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    if (sessionId === "all") {
      const sessions = await db
        .select()
        .from(SessionchatTable)
        .where(eq(SessionchatTable.createdBy, user?.primaryEmailAddress?.emailAddress || ""))
        .orderBy(desc(SessionchatTable.id));

      return NextResponse.json(sessions); // Return all sessions
    }

    const result = await db
      .select()
      .from(SessionchatTable)
      .where(eq(SessionchatTable.sessionId, sessionId));

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]); // Return single session
  } catch (e) {
    return NextResponse.json({ error: e?.toString() || "Unknown error" }, { status: 500 });
  }
}
