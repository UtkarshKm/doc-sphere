import {Doc, Id} from "../../../convex/_generated/dataModel";
import {TableRow, TableCell} from "@/components/ui/table";
import {Building2Icon, CircleUserRound} from "lucide-react";
import {SiGoogledocs} from "react-icons/si";
import {format} from "date-fns";
import {DocumentDropdownMenu} from "./document-dropdown-menu";
import {useRouter} from "next/navigation";

interface DocumentRowProps {
	document: Doc<"documents">;
}

export const DocumentRow = ({document}: DocumentRowProps) => {
	const router = useRouter();
	const onNewtabClick = (id: Id<"documents">) => {
		window.open(`/documents/${id}`, "_blank");
	};

	const onRowClick = () => {
		router.push(`/documents/${document._id}`);
	};

	return (
		<TableRow
			className="cursor-pointer "
			onClick={onRowClick}
		>
			<TableCell className="w-[50px]">
				<SiGoogledocs className="size-6 fill-blue-500" />
			</TableCell>
			<TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
			<TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
				{document.organizationId ?
					<Building2Icon className="size-4" />
				:	<CircleUserRound className="size-4" />}
				{document.organizationId ? "Organization" : "Personal"}
			</TableCell>
			<TableCell className="text-muted-foreground hidden md:table-cell">
				{format(document._creationTime, "MMM d, yyyy")}
			</TableCell>
			<TableCell className="flex justify-end" onClick={e => e.stopPropagation()}>
				<DocumentDropdownMenu
					documentId={document._id}
					title={document.title}
					onNewtab={onNewtabClick}
				/>
			</TableCell>
		</TableRow>
	);
};
