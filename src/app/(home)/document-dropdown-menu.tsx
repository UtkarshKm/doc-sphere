import {Button} from "@/components/ui/button";
import {ExternalLinkIcon, MoreVerticalIcon, PencilIcon, TrashIcon} from "lucide-react";
import {Id} from "../../../convex/_generated/dataModel";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { RemoveDialog } from "@/components/remove-dialog";

interface DocumentDropdownMenuProps {
	documentId: Id<"documents">;
	documentTitle: string;
	onNewtab: (id: Id<"documents">) => void;
}
export const DocumentDropdownMenu = ({
	documentId,
	documentTitle,
	onNewtab,
}: DocumentDropdownMenuProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild >
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
                    <ExternalLinkIcon className="size-4 mr-2"/>
                    Open in new tab
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <PencilIcon className="size-4 mr-2"/>
                    Edit
                </DropdownMenuItem>
                <RemoveDialog documentId={documentId} >
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}
                        onSelect={(e) => e.preventDefault()}>
                        <TrashIcon className="size-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </RemoveDialog>

            </DropdownMenuContent>
		</DropdownMenu>
	);
};
