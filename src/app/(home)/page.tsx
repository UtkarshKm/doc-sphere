
import { Navbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";

function Home() {
	return (
		<>
		<div className="flex flex-col min-h-screen">
		<div className="fixed top-0 left-0 right-0 z-50 h-16">
			<Navbar />
		</div>

		<div className=" mt-16">
			<TemplateGallery />
		</div>
		</div>
		</>
	);
}
export default Home;
