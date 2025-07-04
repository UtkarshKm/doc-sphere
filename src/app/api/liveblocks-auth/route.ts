import {Liveblocks} from "@liveblocks/node";
import {ConvexHttpClient} from "convex/browser";
import {auth, currentUser} from "@clerk/nextjs/server";
import {api} from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
	const {sessionClaims, orgId} = await auth();
	if (!sessionClaims) {
		return new Response(JSON.stringify("Unauthorized, no document"), {
			status: 401,
		});
	}
	const user = await currentUser();
	if (!user) {
		return new Response(JSON.stringify("Unauthorized, no user"), {status: 401});
	}

	const {room} = await req.json();
	const document = await convex.query(api.document.getDocumentById, {id: room});
	if (!document) {
		return new Response(JSON.stringify("Room not found"), {status: 404});
	}

	// console.log("document.organizationId ->", document.organizationId);
	// console.log("orgId (from sessionClaims) ->", orgId);

	const isOwner = document.ownerId === user.id;
	const isOrganization = !!(
		document.organizationId && document.organizationId === orgId
	);

	// console.log("isOwner ->", isOwner);
	// console.log("isOrganization ->", isOrganization);

	if (!isOwner && !isOrganization) {
		return new Response(JSON.stringify("Unauthorized, no access"), {
			status: 403,
		});
	}

	const session = liveblocks.prepareSession(user.id, {
		userInfo: {
			name: user.fullName ?? "Anonymous",
			avatar: user.imageUrl,
		},
	});
	session.allow(room, session.FULL_ACCESS);
	const {body, status} = await session.authorize();

	return new Response(body, {status});
}
