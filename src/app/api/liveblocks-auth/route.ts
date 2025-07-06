import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";

// Initialize Convex HTTP client for server-side queries
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Initialize Liveblocks with your secret API key
const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
	try {
		// Authenticate user using Clerk session
		const { sessionClaims, orgId } = await auth();

		// Extract required user details from Clerk session
		const userId = sessionClaims?.sub;
		const name = sessionClaims?.fullName as string | undefined;
		const avatar = sessionClaims?.picture as string | undefined;

		// Deny if user is not authenticated
		if (!sessionClaims || !userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Parse request body to get Liveblocks room ID
		const { room } = await req.json();
		if (!room) {
			return NextResponse.json({ error: "Room ID required" }, { status: 400 });
		}

		// Fetch the document from Convex DB to validate access
		const document = await convex.query(api.document.getDocumentById, {
			id: room,
		});

		// Deny if the document doesn't exist
		if (!document) {
			return NextResponse.json({ error: "Room not found" }, { status: 404 });
		}

		// Check if the user is either the owner or part of the org that owns the doc
		const isOwner = document.ownerId === userId;
		const isOrg = document.organizationId === orgId;

		// Deny access if the user has no permission
		if (!isOwner && !isOrg) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		// Generate a unique color from user's name or email
		const nameForColor = name ?? "Anonymous";
		const nameToNumber = nameForColor
			.split("")
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const hue = Math.abs(nameToNumber) % 360;
		const color = `hsl(${hue}, 80%, 60%)`;

		// Prepare a Liveblocks session with user metadata
		const session = liveblocks.prepareSession(userId, {
			userInfo: {
				name: name ?? "Anonymous",
				avatar: avatar ?? "",
				color,
			},
		});
		await liveblocks.getOrCreateRoom(room, {
			defaultAccesses: ["room:write"],
		});

		// Grant the user full access to the specified room
		session.allow(room, session.FULL_ACCESS);

		// Authorize the session and return credentials to frontend
		const { body: sessionBody, status } = await session.authorize();

		return new NextResponse(sessionBody, { status });
	} catch (err) {
		console.error("Error in liveblocks-auth:", err);
		// Generic error response
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}
