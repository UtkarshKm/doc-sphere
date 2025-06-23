import React from "react";
interface DocumentLayoutProps {
	children: React.ReactNode;
}

function DocumentLayout({children}: DocumentLayoutProps) {
	return (
		<>
			<div className="flex flex-col gap-y-4">
				{/* <nav className="bg-purple-600 text-white w-full" > NavBar</nav> */}
				<div>{children}</div>
			</div>
		</>
	);
}

export default DocumentLayout;
