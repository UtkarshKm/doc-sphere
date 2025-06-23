import Link from "next/link";

function Home() {
	return (
		<div className="text-4xl  font-bold">
			click{" "}
			<Link href="/documents/1">
				{" "}
				<span className=" text-blue-500 underline">here</span>
			</Link>{" "}
			to go to document 1
		</div>
	);
}

export default Home;
