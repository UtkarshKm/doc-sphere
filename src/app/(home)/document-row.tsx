import {Doc} from "../../../convex/_generated/dataModel"
import { TableRow, TableCell } from "@/components/ui/table";
import { Building2Icon, CircleUserRound } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { DocumentDropdownMenu } from "./document-dropdown-menu";


interface DocumentRowProps {
	document: Doc<"documents">;
}

const onNewtabClick = ( id: string) => {
    window.open(`documents/${id}`, "_blank");
}

export const DocumentRow = ({document}: DocumentRowProps) => {
	return (
		<TableRow className="cursor-pointer ">
			<TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}

            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserRound className="size-4" />}
                {document.organizationId ? "Organization" : "Personal"}

            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                {format(document._creationTime, "MMM d, yyyy")}
            </TableCell>
            <TableCell className="flex justify-end">
                <DocumentDropdownMenu
                documentId={document._id}
                documentTitle={document.title}
                onNewtab={onNewtabClick}
                />
            </TableCell>
		</TableRow>
	)
}