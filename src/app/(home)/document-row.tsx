import {Doc} from "../../../convex/_generated/dataModel"
import { TableRow, TableCell } from "@/components/ui/table";
import { Building2Icon, CircleUserRound, MoreVerticalIcon } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";


interface DocumentRowProps {
	document: Doc<"documents">;
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
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVerticalIcon className="size-4 " />
                </Button>
            </TableCell>
		</TableRow>
	)
}