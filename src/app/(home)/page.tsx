"use client";
import {Navbar} from "./navbar";
import {TemplateGallery} from "./template-gallery";
import {usePaginatedQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {DocumentsTable} from "./documents-Table";
import { useSearchParams } from "@/hooks/use-search-parma";

function Home() {
	const [ search] = useSearchParams("search");
	const {results, status, loadMore} = usePaginatedQuery(
		api.document.getDocument,
		{search},
		{initialNumItems: 5}
	);

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<div className="fixed top-0 left-0 right-0 z-50 h-16">
					<Navbar />
				</div>

				<div className="mt-16">
					<TemplateGallery />
					<DocumentsTable
						documents={results}
						status={status}
						loadMore={loadMore}
					/>
				</div>
			</div>
		</>
	);
}
export default Home;
