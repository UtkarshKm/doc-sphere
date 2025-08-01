"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<"documents">[]) {
	return await convex.query(api.document.getByIds, { ids });
}
export async function getUsers() {
	const { orgId } = await auth();
	const clerk = await clerkClient();
	const response = await clerk.users.getUserList({
		organizationId: orgId ? [orgId as string] : undefined,
	});
	const users = response.data.map((user) => ({
		id: user.id,
		name:
			user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
		avatar: user.imageUrl,
		color:""
	}));
	return users;
}
