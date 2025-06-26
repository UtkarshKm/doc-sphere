import {Editor} from "./editor";
import Ruler from "./ruler";
import {ToolBar} from "./toolbar";

interface DocumentIdProps {
	params: Promise<{documentId: string}>;
}

const DocumentId = async ({params}: DocumentIdProps) => {
	const awaitedParams = await params;
	const documentId = awaitedParams.documentId;

	return (
		<>
			<div className=" min-h-screen bg-[#FAFBFD]">
				<ToolBar />
				<Ruler />
				<Editor />
			</div>
		</>
	);
};

export default DocumentId;
