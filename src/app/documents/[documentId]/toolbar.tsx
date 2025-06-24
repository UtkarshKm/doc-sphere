"use client";
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/store/use-editor-store";
import {Separator} from "@/components/ui/separator";

import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	CheckIcon,
	ChevronDownIcon,
	HighlighterIcon,
	ImageIcon,
	ItalicIcon,
	Link2Icon,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	SearchIcon,
	SpellCheckIcon,
	UnderlineIcon,
	Undo2Icon,
	UploadIcon,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {CompactPicker, type ColorResult} from "react-color";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

const AlignButton = () => {
	const {editor} = useEditorStore();
	const alignment = [
		{
			label: "Align Left",
			value: "left",
			icon: AlignLeftIcon,
		},
		{
			label: "Align Center",
			value: "center",
			icon: AlignCenterIcon,
		},
		{
			label: "Align Right",
			value: "right",
			icon: AlignRightIcon,
		},
		{
			label: "Align Justify",
			value: "justify",
			icon: AlignJustifyIcon,
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm transition-colors">
					<AlignLeftIcon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent  className="p-1 ">
				{alignment.map(({label, value, icon: Icon}) => (
					<DropdownMenuItem
						key={label}
						onClick={() => editor?.chain().focus().setTextAlign(value).run()}
						className="cursor-pointer py-2"
					>
						<div className="flex items-center justify-between w-full">
							<Icon className="mr-2" />
							<span className="truncate">{label}</span>
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
const ImageButton = () => {
	const {editor} = useEditorStore();
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	const onChange = (src: string) => {
		editor?.chain().focus().setImage({src: src}).run();
	};

	const onUpload = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				// ✅ Create object URL from the file
				const imageObjectUrl = URL.createObjectURL(file);
				onChange(imageObjectUrl); // ✅ Use the created URL, not state variable

				// ✅ Clean up object URL to prevent memory leaks
				// setTimeout(() => {
				//     URL.revokeObjectURL(imageObjectUrl);
				// }, 1000);
			}
		};
		input.click();
	};

	const imageUrlSubmit = () => {
		if (imageUrl.trim()) {
			onChange(imageUrl);
			setImageUrl("");
			setDialogOpen(false);
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
						<ImageIcon className="size-4" />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					{/* ✅ Make entire menu item clickable */}
					<DropdownMenuItem
						onClick={onUpload}
						className="cursor-pointer"
					>
						<UploadIcon className="mr-2 size-4" />
						Upload Image
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => setDialogOpen(true)}
						className="cursor-pointer"
					>
						<SearchIcon className="mr-2 size-4" />
						Paste image URL
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog
				open={isDialogOpen}
				onOpenChange={setDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Insert Image URL</DialogTitle>
						<DialogDescription>
							Enter the URL of the image you want to add.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<Input
							placeholder="https://example.com/image.jpg"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									imageUrlSubmit();
								}
							}}
						/>

						<div className="flex gap-2 justify-end">
							<Button
								variant="outline"
								onClick={() => setDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button
								onClick={imageUrlSubmit}
								disabled={!imageUrl.trim()}
							>
								Insert Image
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

const LinkButton = () => {
	const {editor} = useEditorStore();
	const [value, setValue] = useState("");

	const isActive = editor?.isActive("link");
	const currentHref = editor?.getAttributes("link")?.href || "";

	const onChange = (href: string) => {
		if (href.trim()) {
			const url = href.startsWith("http") ? href : `https://${href}`;
			editor?.chain().focus().setLink({href: url}).run();
		}
		setValue("");
	};

	const removeLink = () => {
		editor?.chain().focus().unsetLink().run();
		setValue("");
	};

	return (
		<DropdownMenu
			onOpenChange={(open) => {
				if (open) {
					setValue(currentHref);
				}
			}}
		>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm transition-colors",
						isActive && "bg-neutral-200/80"
					)}
				>
					<Link2Icon className="size-4" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="p-2.5">
				<div className="flex gap-x-2 items-center">
					<Input
						placeholder="https://example.com"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								onChange(value);
							}
						}}
						className="min-w-[200px]"
					/>
					<Button
						onClick={() => onChange(value)}
						disabled={!value.trim()}
						size="sm"
					>
						Apply
					</Button>
					{isActive && (
						<Button
							onClick={removeLink}
							variant="outline"
							size="sm"
						>
							Remove
						</Button>
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const TextColorButton = () => {
	const {editor} = useEditorStore();
	const currentColor = editor?.getAttributes("textStyle")?.color || "#000000";

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm transition-colors">
					<span className="text-sm">A</span>
					<div
						className="h-0.5 w-full"
						style={{backgroundColor: currentColor}}
					></div>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="border-0">
				<CompactPicker
					color={currentColor}
					onChange={onChange}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HighLightButton = () => {
	const {editor} = useEditorStore();
	const currentColor = editor?.getAttributes("highlight")?.color || "#ffffff";

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({color: color.hex}).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm transition-colors">
					<HighlighterIcon className="size-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="border-0">
				<CompactPicker
					color={currentColor}
					onChange={onChange}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HeadingButton = () => {
	const {editor} = useEditorStore();

	const headings = [
		{
			label: "Normal text",
			value: 0,
			element: "p",
			className: "text-sm",
			preview: "Normal text",
		},
		{
			label: "Heading 1",
			value: 1,
			element: "h1",
			className: "text-2xl font-bold",
			preview: "Heading 1",
		},
		{
			label: "Heading 2",
			value: 2,
			element: "h2",
			className: "text-xl font-semibold",
			preview: "Heading 2",
		},
		{
			label: "Heading 3",
			value: 3,
			element: "h3",
			className: "text-lg font-semibold",
			preview: "Heading 3",
		},
		{
			label: "Heading 4",
			value: 4,
			element: "h4",
			className: "text-base font-medium",
			preview: "Heading 4",
		},
		{
			label: "Heading 5",
			value: 5,
			element: "h5",
			className: "text-sm font-medium",
			preview: "Heading 5",
		},
		{
			label: "Heading 6",
			value: 6,
			element: "h6",
			className: "text-xs font-medium",
			preview: "Heading 6",
		},
	];

	const getCurrentHeading = () => {
		if (!editor) return headings[0];

		for (let i = 1; i <= 6; i++) {
			if (editor.isActive("heading", {level: i})) {
				return headings[i];
			}
		}
		return headings[0];
	};

	const currentHeading = getCurrentHeading();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm transition-colors">
					<span className="truncate">{currentHeading.label}</span>
					<ChevronDownIcon className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-[200px]">
				<DropdownMenuLabel>Text Style</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{headings.map((heading) => (
					<DropdownMenuItem
						key={heading.value}
						onClick={() => {
							if (heading.value === 0) {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({
										level: heading.value as 1 | 2 | 3 | 4 | 5 | 6,
									})
									.run();
							}
						}}
						className="cursor-pointer py-2"
					>
						<div className="flex items-center justify-between w-full">
							<span className={heading.className}>{heading.preview}</span>
							{currentHeading.value === heading.value && (
								<CheckIcon className="size-4 ml-2" />
							)}
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const FontFamilyButton = () => {
	const {editor} = useEditorStore();

	const fonts = [
		{label: "Arial", value: "Arial"},
		{label: "Arial Black", value: "Arial Black"},
		{label: "Comic Sans MS", value: "Comic Sans MS"},
		{label: "Courier New", value: "Courier New"},
		{label: "Georgia", value: "Georgia"},
		{label: "Impact", value: "Impact"},
		{label: "Times New Roman", value: "Times New Roman"},
		{label: "Verdana", value: "Verdana"},
	];

	const currentFontFamily =
		editor?.getAttributes("textStyle")?.fontFamily || "Arial";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
					<span className="truncate">{currentFontFamily}</span>
					<ChevronDownIcon className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuLabel>Font Family</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{fonts.map((font) => (
					<DropdownMenuItem
						key={font.value}
						onClick={() =>
							editor?.chain().focus().setFontFamily(font.value).run()
						}
						style={{fontFamily: font.value}}
					>
						{font.label}
						{currentFontFamily === font.value && " ✓"}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
interface ToolBarButtonProps {
	onclick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}

const ToolBarButton = ({onclick, isActive, icon: Icon}: ToolBarButtonProps) => {
	return (
		<button
			onClick={onclick}
			className={cn(
				"text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
				isActive && "bg-neutral-200/80"
			)}
		>
			<Icon className="size-4" />
		</button>
	);
};

export function ToolBar() {
	const {editor} = useEditorStore();

	console.log("toolbar editor", {editor});

	//Object[][]
	// { ... } defines the object structure
	//[] after the object type = array of those objects
	//[] after that = array of those arrays
	const sections: {
		label: string;
		icon: LucideIcon;
		onclick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onclick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onclick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: "print",
				icon: PrinterIcon,
				onclick: () => window.print(),
			},
			{
				label: "spell check",
				icon: SpellCheckIcon,
				onclick: () => {
					const current = editor?.view.dom.getAttribute("spellcheck");
					editor?.view.dom.setAttribute(
						"spellcheck",
						current === "false" ? "true" : "false"
					);
				},
			},
		],
		[
			{
				label: "Bold",
				icon: BoldIcon,
				onclick: () => editor?.chain().focus().toggleBold().run(),
				isActive: editor?.isActive("bold"),
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				isActive: editor?.isActive("italic"),
				onclick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: "Underline",
				icon: UnderlineIcon,
				isActive: editor?.isActive("underline"),
				onclick: () => editor?.chain().focus().toggleUnderline().run(),
			},
		],
		[
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onclick: () => console.log("message "),
				isActive: false,
			},
			{
				label: "ListTodo",
				icon: ListTodoIcon,
				onclick: () => editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive("taskList"),
			},
			{
				label: "Remove Formatting",
				icon: RemoveFormattingIcon,
				onclick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		],
	];
	return (
		<div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] flex items-center gap-x-0.5 overflow-x-auto  ">
			{/* undo redo print spell check */}
			{sections[0].map((item) => (
				<ToolBarButton
					key={item.label}
					{...item}
				/>
			))}

			<Separator
				orientation="vertical"
				className="!h-6  bg-neutral-300 "
			/>

			{/* font family */}
			<FontFamilyButton />
			<Separator
				orientation="vertical"
				className="!h-6  bg-neutral-300 "
			/>
			{/* heading */}
			<HeadingButton />
			<Separator
				orientation="vertical"
				className="!h-6  bg-neutral-300 "
			/>
			{/* front size */}

			<Separator
				orientation="vertical"
				className="!h-6  bg-neutral-300 "
			/>
			{/* bold italic underline */}
			{sections[1].map((item) => (
				<ToolBarButton
					key={item.label}
					{...item}
				/>
			))}
			<Separator
				orientation="vertical"
				className="!h-6  bg-neutral-300 "
			/>

			{/* text color
				highlight color */}

			<TextColorButton />
			<HighLightButton />

			<Separator
				orientation="vertical"
				className="!h-6  bg-neutral-300 "
			/>
			{/* link
			image
			algin
			line hight 
			list */}
			<LinkButton />
			<ImageButton />
			<AlignButton />

			{/* comment list-todo remove-formatting */}
			{sections[2].map((item) => (
				<ToolBarButton
					key={item.label}
					{...item}
				/>
			))}
		</div>
	);
}
