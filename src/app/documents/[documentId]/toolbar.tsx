"use client";
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/store/use-editor-store";
import {Separator} from "@/components/ui/separator";

import {
	BoldIcon,
	CheckIcon,
	ChevronDownIcon,
	ItalicIcon,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	SpellCheckIcon,
	UnderlineIcon,
	Undo2Icon,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

	console.log("tollbar editor", {editor});

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

			<Separator
				orientation="vertical"
				className="!h-6  bg-neutral-300 "
			/>
			{/* link
			image
			algin
			line hight 
			list */}
			{sections[2].map((item) => (
				<ToolBarButton
					key={item.label}
					{...item}
				/>
			))}
		</div>
	);
}
