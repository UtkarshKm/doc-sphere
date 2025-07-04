import {Liveblocks} from "@liveblocks/node";
import {ConvexHttpClient} from "convex/browser";
import {auth, currentUser} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";
import {api} from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
	try {
		const {sessionClaims, orgId} = await auth();
		if (!sessionClaims) {
			return NextResponse.json(
				{error: "Unauthorized, no document"},
				{status: 401}
			);
		}

		const user = await currentUser();
		if (!user) {
			return NextResponse.json({error: "Unauthorized, no user"}, {status: 401});
		}

		// Parse JSON body using NextRequest
		const body = await req.json();
		const {room} = body;

		if (!room) {
			return NextResponse.json({error: "Room ID is required"}, {status: 400});
		}

		const document = await convex.query(api.document.getDocumentById, {
			id: room,
		});
		if (!document) {
			return NextResponse.json({error: "Room not found"}, {status: 404});
		}

		// Permission checks
		const isOwner = document.ownerId === user.id;
		const isOrganization = !!(
			document.organizationId && document.organizationId === orgId
		);

		if (!isOwner && !isOrganization) {
			return NextResponse.json(
				{error: "Unauthorized, no access"},
				{status: 403}
			);
		}

		// Create Liveblocks session
		const session = liveblocks.prepareSession(user.id, {
			userInfo: {
				name: user.fullName ?? "Anonymous",
				avatar: user.imageUrl ?? "",
			},
		});

		session.allow(room, session.FULL_ACCESS);
		const {body: sessionBody, status} = await session.authorize();

		// Return the session response
		return new NextResponse(sessionBody, {status});
	} catch (error) {
		console.error("Liveblocks auth error:", error);
		return NextResponse.json({error: "Internal server error"}, {status: 500});
	}
}
