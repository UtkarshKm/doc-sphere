"use client";
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/store/use-editor-store";
import {Separator} from "@/components/ui/separator";

import {
	BoldIcon,
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

// const FontFamilyButton = () => {
// 	const {editor} = useEditorStore();

// 	const fonts = [
// 		// broswer supported fonts
// 		{label: "Arial", value: "Arial"},
// 		{label: "Arial Black", value: "Arial Black"},
// 		{label: "Comic Sans MS", value: "Comic Sans MS"},
// 		{label: "Courier New", value: "Courier New"},
// 		{label: "Georgia", value: "Georgia"},
// 		{label: "Impact", value: "Impact"},
// 		{label: "Lucida Sans Unicode", value: "Lucida Sans Unicode"},
// 		{label: "Tahoma", value: "Tahoma"},
// 		{label: "Times New Roman", value: "Times New Roman"},
// 		{label: "Trebuchet MS", value: "Trebuchet MS"},
// 		{label: "Verdana", value: "Verdana"},
// 		{label: "MS Sans Serif", value: "MS Sans Serif"},
// 	];

// 	return (
// 		<DropdownMenu>
// 			<DropdownMenuTrigger asChild>
// 				<button
// 					className={
// 						" h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
// 					}
// 				>
// 					<span className="truncate">
// 						{editor?.getAttributes("textStyle").fontFamily || "Arial" }
// 					</span>
// 					<ChevronDownIcon className="ml-2 size-4 shrink-0" />
// 				</button>
// 			</DropdownMenuTrigger>

// 			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
// 				{fonts.map((font) => (
// 					// <DropdownMenuItem
// 					// 	key={font.value}

// 					// 	onClick={() => {
// 					// 		editor?.chain().focus().setFontFamily(font.value).run();
// 					// 	}}
// 					// >
// 					// 	{font.label}
// 					// </DropdownMenuItem>

// 					<button
// 						key={font.value}
// 						className={cn(
// 							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
// 							editor?.getAttributes("textStyle").fontFamily === font.value &&
// 								"bg-neutral-200/80"
// 						)}
// 						onClick={() => {
// 							editor?.chain().focus().setFontFamily(font.value).run();
// 						}}
// 						style={{fontFamily: font.value}}
// 					>
// 						{font.label}
// 					</button>
// 				))}
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	);
// };

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

    const currentFontFamily = editor?.getAttributes("textStyle")?.fontFamily || "Arial";

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
                        onClick={() => editor?.chain().focus().setFontFamily(font.value).run()}
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
