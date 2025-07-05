import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

interface DocumentIdProps {
	params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentId = async ({ params }: DocumentIdProps) => {
	const { documentId } = await params; // Await params but don't use documentId for now
	const { getToken } = await auth();
	const token = (await getToken({ template: "convex" })) ?? undefined;
	if (!token) {
		throw new Error("Not authenticated");
	}
	const preloadedDocument = await preloadQuery(
		api.document.getDocumentById,
		{ id: documentId },
		{ token }
	);
	if (!preloadedDocument) {
		throw new Error("Document not found");
	}
	return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentId;
