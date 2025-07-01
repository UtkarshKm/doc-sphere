'use client'
import {Navbar} from "./navbar";
import {TemplateGallery} from "./template-gallery";
import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";

function Home() {
	const documents = useQuery(api.document.getDocument)
	if (!documents)
		return <>
		<p> Loading...</p>
		</>;
	return (
		<>
		<div className="flex flex-col min-h-screen">
		<div className="fixed top-0 left-0 right-0 z-50 h-16">
			<Navbar />
		</div>

			<div className="mt-16">
				<TemplateGallery/>
				{documents?.map((document) => (
					<span key={document._id} >{document.title}</span>
				))}
		</div>
		</div>
		</>
	);
}
export default Home;
