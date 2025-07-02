"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import {Id} from "../../convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {api} from "../../convex/_generated/api";
import {useState} from "react";
import {Loader2} from "lucide-react";
import {Input} from "./ui/input";
import {Button} from "./ui/button";

interface RenameDialogProps {
	documentId: Id<"documents">;
	initialTitle: string;
	children: React.ReactNode;
}

export const RenameDialog = ({
	documentId,
	initialTitle,
	children,
}: RenameDialogProps) => {
	const updateDocument = useMutation(api.document.updateDocumentById);
	const [openDialog, setOpenDialog] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const handleUpdate = async (formData: FormData) => {
		try {
			setIsUpdating(true);
			const title = formData.get("title") as string;
			await updateDocument({id: documentId, title: title.trim() || "Untitled"});
		} catch (error) {
			console.error("Failed to update document title:", error);
		} finally {
			setIsUpdating(false);
			setOpenDialog(false);
		}
	};

	return (
		<Dialog
			open={openDialog}
			onOpenChange={setOpenDialog}
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<form action={handleUpdate}>
					<DialogHeader>
						<DialogTitle>Rename Document</DialogTitle>
						<DialogDescription>
							Rename the document to a new title
						</DialogDescription>
					</DialogHeader>
					<div className=" my-4">
						<Input
							type="text"
							placeholder="Enter new title"
							name="title"
							defaultValue={initialTitle}
						/>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>

						<Button
							type="submit"
							disabled={isUpdating}
						>
							{isUpdating ?
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							:	"Update"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
