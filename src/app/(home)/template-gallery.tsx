"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {cn} from "@/lib/utils";
import {templates} from "@/constants/templates";
import {useRouter} from "next/navigation";
import {useMutation} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {useState} from "react";

export const TemplateGallery = () => {
	const router = useRouter();
	const createDocument = useMutation(api.document.createDocument);
	const [isCreating, setIsCreating] = useState(false);

	const onTemplateClick = async (title: string, initialContent: string) => {
		setIsCreating(true);
		try {
			const documentId = await createDocument({title, initialContent});
			router.push(`/documents/${documentId}`);
		} catch (error) {
			console.error(error);
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<div className="bg-[#f1f3f4]">
			<div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
				<h3 className="font-medium">Start a new document </h3>
				<Carousel>
					<CarouselContent className="-ml-4">
						{templates.map((template) => (
							<CarouselItem
								key={template.id}
								className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 pl-4"
							>
								<div
									className={cn(
										"aspect-[3/4] flex flex-col gap-y-2.5",
										isCreating && "pointer-events-auto opacity-50"
									)}
								>
									<button
										disabled={isCreating}
										onClick={() => onTemplateClick(template.label, template.initialContent)}
										style={{
											backgroundImage: `url(${template.imageUrl})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
											backgroundRepeat: "no-repeat",
										}}
										className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
									/>
									<p className="text-sm font-medium truncate text-center w-full">
										{template.label}
									</p>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
};
