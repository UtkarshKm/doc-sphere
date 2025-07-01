import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        initialContent: v.optional(v.string()),
        ownerId: v.string(),
        roomId:v.optional(v.string()),
        organizationId:v.optional(v.string()),

    })
        .index("by_ownerId",["ownerId"])
        .index("byOrganization",["organizationId"])
        .searchIndex("searchTitle", {
                searchField: "title",
                filterFields: ["ownerId", "organizationId"]
            }
        )
})