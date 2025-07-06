"use client";
import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarTrigger,
	MenubarSubTrigger,
	MenubarSubContent,
} from "@/components/ui/menubar";
import {
	FileIcon,
	FileJsonIcon,
	FilePenIcon,
	FilePlusIcon,
	FileTextIcon,
	GlobeIcon,
	PrinterIcon,
	RedoIcon,
	TrashIcon,
	UndoIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
	RemoveFormattingIcon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./avatar";
import { Inbox } from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RenameDialog } from "@/components/rename-dialog";
import { RemoveDialog } from "@/components/remove-dialog";

interface NavbarProps {
	data: Doc<"documents">;
}

export function Navbar({ data }: NavbarProps) {
	const router = useRouter();
	const { editor } = useEditorStore();
	const mutation = useMutation(api.document.createDocument);

	const newDocument = async () => {
		try {
			const res = await mutation({
				title: "Untitled Document",
				initialContent: "",
			});
			toast.success("New document created!");
			router.push(`/documents/${res}`);
		} catch (error) {
			toast.error("Failed to create new document.");
			console.error(error);
		}
	};
	const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
		editor
			?.chain()
			.focus()
			.insertTable({ rows, cols, withHeaderRow: false })
			.run();
	};
	const onDownload = (blod: Blob, fileName: string) => {
		const url = URL.createObjectURL(blod);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		a.click();
	};

	const onSaveJson = () => {
		if (!editor) return;
		const json = editor.getJSON();
		const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
		onDownload(blob, `${data.title}.json`);
	};
	const onSaveHtml = () => {
		if (!editor) return;
		const html = editor.getHTML();
		const blob = new Blob([html], { type: "text/html" });
		onDownload(blob, `${data.title}.html`);
	};

	const onSaveText = () => {
		if (!editor) return;
		const text = editor.getText();
		const blob = new Blob([text], { type: "text/plain" });
		onDownload(blob, `${data.title}.txt`);
	};

	return (
		<nav className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Link href="/">
					<Image
						src="/logo.svg"
						alt="Doc Sphere logo"
						width={40}
						height={40}
						priority
					/>
				</Link>

				<div className="flex flex-col gap-2">
					<DocumentInput title={data.title} id={data._id} />
					<Menubar className="border-none bg-transparent shadow-none h-auto p-0">
						<MenubarMenu>
							<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
								File
							</MenubarTrigger>
							<MenubarContent className="print:hidden">
								<MenubarSub>
									<MenubarSubTrigger>
										<FileIcon className="size-4 mr-2" />
										Save
									</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem onClick={onSaveJson}>
											<FileJsonIcon className=" size-4 mr-2" />
											JSON
										</MenubarItem>
										<MenubarItem onClick={onSaveHtml}>
											<GlobeIcon className=" size-4 mr-2" />
											HTML
										</MenubarItem>
										<MenubarItem onClick={() => window.print()}>
											<BsFilePdf className=" size-4 mr-2" />
											PDF
										</MenubarItem>
										<MenubarItem onClick={onSaveText}>
											<FileTextIcon className=" size-4 mr-2" />
											TEXT
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarItem onClick={newDocument}>
									<FilePlusIcon className="size-4 mr-2" />
									New Document
								</MenubarItem>
								<MenubarSeparator />
								<RenameDialog documentId={data._id} initialTitle={data.title}>
									<MenubarItem
										onClick={(e) => e.stopPropagation()}
										onSelect={(e) => e.preventDefault()}
									>
										<FilePenIcon className="size-4 mr-2" />
										Rename
									</MenubarItem>
								</RenameDialog>
								<RemoveDialog documentId={data._id}>
									<MenubarItem
										onClick={(e) => e.stopPropagation()}
										onSelect={(e) => e.preventDefault()}
									>
										<TrashIcon className="size-4 mr-2" />
										Remove
									</MenubarItem>
								</RemoveDialog>
								<MenubarSeparator />
								<MenubarItem onClick={() => window.print()}>
									<PrinterIcon className="size-4 mr-2" />
									Print
									<MenubarShortcut>⌘p</MenubarShortcut>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
								Edit
							</MenubarTrigger>
							<MenubarContent className="print:hidden">
								<MenubarItem
									onClick={() => editor?.chain().focus().undo().run()}
								>
									<UndoIcon className="size-4 mr-2" />
									Undo
									<MenubarShortcut>⌘Z</MenubarShortcut>
								</MenubarItem>
								<MenubarItem
									onClick={() => editor?.chain().focus().redo().run()}
								>
									<RedoIcon className="size-4 mr-2" />
									Redo
									<MenubarShortcut>⌘⇧Z</MenubarShortcut>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									Cut
									<MenubarShortcut>⌘X</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Copy
									<MenubarShortcut>⌘C</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Paste
									<MenubarShortcut>⌘V</MenubarShortcut>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									Select All
									<MenubarShortcut>⌘A</MenubarShortcut>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
								Insert
							</MenubarTrigger>
							<MenubarContent className="print:hidden">
								<MenubarSub>
									<MenubarSubTrigger>Table</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem
											onClick={() => insertTable({ rows: 1, cols: 1 })}
										>
											1 x 1
										</MenubarItem>
										<MenubarItem
											onClick={() => insertTable({ rows: 2, cols: 3 })}
										>
											2 x 3
										</MenubarItem>
										<MenubarItem
											onClick={() => insertTable({ rows: 3, cols: 3 })}
										>
											3 x 3
										</MenubarItem>
										<MenubarItem
											onClick={() => insertTable({ rows: 4, cols: 3 })}
										>
											4 x 3
										</MenubarItem>
										<MenubarItem
											onClick={() => insertTable({ rows: 5, cols: 3 })}
										>
											5 x 3
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
								Format
							</MenubarTrigger>
							<MenubarContent className="print:hidden">
								<MenubarSub>
									<MenubarSubTrigger>TEXT</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem
											onClick={() => editor?.chain().focus().toggleBold().run()}
										>
											<BoldIcon className="size-4 mr-2" />
											Bold
										</MenubarItem>
										<MenubarItem
											onClick={() =>
												editor?.chain().focus().toggleItalic().run()
											}
										>
											<ItalicIcon className="size-4 mr-2" />
											Italic
										</MenubarItem>
										<MenubarItem
											onClick={() =>
												editor?.chain().focus().toggleUnderline().run()
											}
										>
											<UnderlineIcon className="size-4 mr-2" />
											Underline
										</MenubarItem>
										<MenubarItem
											onClick={() =>
												editor?.chain().focus().toggleStrike().run()
											}
										>
											<StrikethroughIcon className="size-4 mr-2" />
											Strikethrough
										</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarItem
									onClick={() => editor?.chain().focus().unsetAllMarks().run()}
								>
									<RemoveFormattingIcon className="size-4 mr-2" />
									Clear Formatting
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>
			</div>

			<div className="flex gap-3 items-center">
				<Avatars />
				<Inbox />
				<OrganizationSwitcher
					afterCreateOrganizationUrl="/"
					afterLeaveOrganizationUrl="/"
					afterSelectOrganizationUrl="/"
					afterSelectPersonalUrl="/"
				/>
				<UserButton />
			</div>
		</nav>
	);
}
