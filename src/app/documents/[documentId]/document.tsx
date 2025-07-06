'use client'

import { Preloaded, usePreloadedQuery } from "convex/react";
import {Editor} from "./editor";
import {Navbar} from "./navbar";
import {Room} from "./room";
import {ToolBar} from "./toolbar";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

interface DocumentProps {
	preloadedDocument: Preloaded<typeof api.document.getDocumentById>
}

export const Document = ({preloadedDocument}: DocumentProps) => {
	const document = usePreloadedQuery(preloadedDocument)

	if(document === null) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#FAFBFD]">
				<div className="text-center space-y-4">
					<h2 className="text-2xl font-semibold text-gray-800">Document not found</h2>
					<p className="text-gray-600">This document may have been deleted or you don&apos;t have access.</p>
					<Link 
						href="/" 
						className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
					>
						Go back to home
					</Link>
				</div>
			</div>
		);
	}

	// Check if document has real content (not template placeholders)
	const isTemplateContent = (content: string) => {
		// Match any text in square brackets like [Your Name], [Date], etc.
		return /\[.*?\]/.test(content);
	};

	const hasRealContent = document.initialContent && 
		document.initialContent.length > 50 &&
		!isTemplateContent(document.initialContent);

	return (
		<>
			<Room>
				<div className="min-h-screen bg-[#FAFBFD]">
					<div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
						<Navbar data={document} />
						<ToolBar />
					</div>
					<div className="pt-[120px] print:pt-0">
						<Editor initialContent={hasRealContent ? undefined : document.initialContent} />
					</div>
				</div>
			</Room>
		</>
	);
};