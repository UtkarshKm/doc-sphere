import {ConvexError, v} from "convex/values";
import {mutation, query} from "./_generated/server";
import {paginationOptsValidator} from "convex/server";

// Mutation to create a new document
export const createDocument = mutation({
	args: {
		title: v.optional(v.string()),
		initialContent: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new ConvexError("Unauthorized");
		}

		// Get organizationId from user if available
		const organizationId = (user.organization_id ?? undefined) as
			| string
			| undefined;

		// Insert a new document with the provided title and content, or defaults
		return await ctx.db.insert("documents", {
			title: args.title ?? "Untitled Document",
			ownerId: user.subject,
			initialContent: args.initialContent ?? "",
			organizationId,
		});
	},
});

// Query to fetch documents, supporting search and organization filtering
// export const getDocument = query({
// 	args: {
// 		paginationOpts: paginationOptsValidator,
// 		search: v.optional(v.string()),
// 	},
// 	handler: async (ctx, args) => {
// 		const user = await ctx.auth.getUserIdentity();
// 		if (!user) {
// 			throw new ConvexError("Unauthorized");
// 		}

// 		// Get organizationId from user if available
// 		const organizationId = (user.organization_id ?? undefined) as
// 			| string
// 			| undefined;

// 		// If user is in an organization, search by organization and title
// 		if ( organizationId && user) {
// 			return await ctx.db
// 				.query("documents")
// 				.withSearchIndex("search_title", (q) =>
// 					q.search("title", args.search!).eq("organizationId", organizationId)
// 				)
// 				.paginate(args.paginationOpts);
// 		}

// 		// If searching by title for personal documents
// 		if (args.search) {
// 			return await ctx.db
// 				.query("documents")
// 				.withSearchIndex("search_title", (q) =>
// 					q.search("title", args.search!).eq("ownerId", user.subject)
// 				)
// 				.paginate(args.paginationOpts);
// 		}

// 		// If user is in an organization, fetch all organization documents
// 		if (organizationId) {
// 			return await ctx.db
// 				.query("documents")
// 				.withIndex("by_OrganizationId", (q) =>
// 					q.eq("organizationId", organizationId)
// 				)
// 				.paginate(args.paginationOpts);
// 		}

// 		// Default: fetch all personal documents for the user
// 		return await ctx.db
// 			.query("documents")
// 			.withIndex("by_ownerId", (q) => q.eq("ownerId", user.subject))
// 			.paginate(args.paginationOpts);
// 	},
// });

export const getDocument = query({
    args: {
        paginationOpts: paginationOptsValidator,
        search: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        // Get organizationId from user if available
        const organizationId = (user.organization_id ?? undefined) as
            | string
            | undefined;

        // If searching by title
        if (args.search) {
            if (organizationId) {
                // Search within organization documents
                return await ctx.db
                    .query("documents")
                    .withSearchIndex("search_title", (q) =>
                        q.search("title", args.search!).eq("organizationId", organizationId)
                    )
                    .paginate(args.paginationOpts);
            } else {
                // Search within personal documents
                return await ctx.db
                    .query("documents")
                    .withSearchIndex("search_title", (q) =>
                        q.search("title", args.search!).eq("ownerId", user.subject)
                    )
                    .paginate(args.paginationOpts);
            }
        }

        // If user is in an organization, fetch all organization documents
        if (organizationId) {
            return await ctx.db
                .query("documents")
                .withIndex("by_OrganizationId", (q) =>
                    q.eq("organizationId", organizationId)
                )
                .paginate(args.paginationOpts);
        }

        // Default: fetch all personal documents for the user
        return await ctx.db
            .query("documents")
            .withIndex("by_ownerId", (q) => q.eq("ownerId", user.subject))
            .paginate(args.paginationOpts);
    },
});

// Mutation to delete a document by its ID, only if the user is the owner
export const deleteDocumentById = mutation({
	args: {id: v.id("documents")},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new ConvexError("Unauthorized");
		}
		const document = await ctx.db.get(args.id);
		if (!document) {
			throw new ConvexError("Document not found");
		}
		if (document.ownerId !== user.subject) {
			throw new ConvexError("Unauthorized");
		}
		return await ctx.db.delete(args.id);
	},
});

// Mutation to update a document's title by its ID, only if the user is the owner
export const updateDocumentById = mutation({
	args: {id: v.id("documents"), title: v.string()},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new ConvexError("Unauthorized");
		}
		const document = await ctx.db.get(args.id);
		if (!document) {
			throw new ConvexError("Document not found");
		}
		if (document.ownerId !== user.subject) {
			throw new ConvexError("Unauthorized");
		}
		return await ctx.db.patch(args.id, {title: args.title});
	},
});

// TODO: add role based access control