import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { ToolBar } from "./toolbar";

interface DocumentIdProps {
	params: Promise<{ documentId: string }>;
}

const DocumentId = async ({ params }: DocumentIdProps) => {
	await params; // Await params but don't use documentId for now

	return (
		<>
			<div className=" min-h-screen bg-[#FAFBFD]">
				<div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
					<Navbar />
					<ToolBar />
				</div>
				<div className="pt-[120px] print:pt-0">

					<Editor />
				</div>
			</div>
		</>
	);
};

export default DocumentId;
