import {Editor} from "./editor";

interface DocumentIdProps {
	params: Promise<{documentId: string}>;
}

const DocumentId = async ({params}: DocumentIdProps) => {
	const awaitedParams = await params;
    const documentId = awaitedParams.documentId;

	return <>

    <div className=" min-h-screen bg-[#FAFBFD]">
        <Editor/>
    </div>
    </>;
};

export default DocumentId;
