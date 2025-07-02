import {Button} from "@/components/ui/button";
import {
	ExternalLinkIcon,
	MoreVerticalIcon,
	PencilIcon,
	TrashIcon,
} from "lucide-react";
import {Id} from "../../../convex/_generated/dataModel";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {RemoveDialog} from "@/components/remove-dialog";
import {RenameDialog} from "@/components/rename-dialog";

interface DocumentDropdownMenuProps {
	documentId: Id<"documents">;
	title: string;
	onNewtab: (id: Id<"documents">) => void;
}
export const DocumentDropdownMenu = ({
	documentId,
	title,
	onNewtab,
}: DocumentDropdownMenuProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-full"
				>
					<MoreVerticalIcon className="size-4 " />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => onNewtab(documentId)}>
					<ExternalLinkIcon className="size-4 mr-2" />
					Open in new tab
				</DropdownMenuItem>

				<RenameDialog
					documentId={documentId}
					initialTitle={title}
				>
					<DropdownMenuItem
						onClick={(e) => e.stopPropagation()}
						onSelect={(e) => e.preventDefault()}
					>
						<PencilIcon className="size-4 mr-2" />
						Rename
					</DropdownMenuItem>
				</RenameDialog>
				<RemoveDialog documentId={documentId}>
					<DropdownMenuItem
						onClick={(e) => e.stopPropagation()}
						onSelect={(e) => e.preventDefault()}
					>
						<TrashIcon className="size-4 mr-2" />
						Delete
					</DropdownMenuItem>
				</RemoveDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
