"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Id} from "../../convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {api} from "../../convex/_generated/api";
import {useState} from "react";
import {Loader2} from "lucide-react";

interface RemoveDialogProps {
	documentId: Id<"documents">;
	children: React.ReactNode;
}

export const RemoveDialog = ({documentId, children}: RemoveDialogProps) => {
	const removeDocument = useMutation(api.document.deleteDocumentById);
	const handleDelete = async () => {
		try {
			setIsRemoving(true);
			await removeDocument({id: documentId});
		} catch (error) {
			console.error("Failed to delete document:", error);
		} finally {
			setIsRemoving(false);
		}
	};

	const [isRemoving, setIsRemoving] = useState(false);
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent onClick={(e) => e.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this document?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						document.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={isRemoving}
					>
						{isRemoving ?
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting...
							</>
						:	"Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
