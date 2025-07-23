import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const clerkUser = await currentUser();

  // Ensure user is authenticated and has an email
  if (!clerkUser || !clerkUser.emailAddresses || clerkUser.emailAddresses.length === 0) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = clerkUser.emailAddresses[0].emailAddress;

  try {
    // Query for existing user by email
    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (existingUsers.length > 0) {
      // Return existing user
      return NextResponse.json(existingUsers[0], { status: 200 });
    }

    // If user doesn't exist, create one
    const [newUser] = await db
      .insert(usersTable)
      .values({
        name: clerkUser.fullName || "Anonymous",
        email: userEmail,
        credits: 10,
      })
      .returning(); 

    // Return the new user
    return NextResponse.json(newUser, { status: 201 });

  } catch (e) {
    console.error("Error fetching or creating user:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}