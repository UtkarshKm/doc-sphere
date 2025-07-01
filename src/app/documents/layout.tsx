import React from "react";
interface DocumentLayoutProps {
	children: React.ReactNode;
}

function DocumentLayout({children}: DocumentLayoutProps) {
	return (
		<>
			<div className="flex flex-col gap-y-4">
				
				<div>{children}</div>
			</div>
		</>
	);
}

export default DocumentLayout;
