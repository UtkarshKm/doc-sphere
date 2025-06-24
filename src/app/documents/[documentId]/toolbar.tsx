"use client";
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/store/use-editor-store";

import {
	LucideIcon,
	PrinterIcon,
	Redo2Icon,
	SpellCheckIcon,
	Undo2Icon,
} from "lucide-react";

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
	];
	return (
		<div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] flex items-center gap-x-0.5 overflow-x-auto  ">
			{sections[0].map((item) => (
				<ToolBarButton
					key={item.label}
					{...item}
				/>
			))}
		</div>
	);
}
