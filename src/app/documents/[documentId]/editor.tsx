"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageResize from "tiptap-extension-resize-image";
import { useEditorStore } from "@/store/use-editor-store";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

import { FontSizeExtension } from "@/extensions/font-size";
import { LineHightExtension } from "@/extensions/line-hight";
import Ruler from "./ruler";
import {
	useLiveblocksExtension,
	FloatingToolbar,
} from "@liveblocks/react-tiptap";
import { Threads } from "./threads";

interface EditorProps {
	initialContent?: string | undefined;
}
export const Editor = ({ initialContent }: EditorProps) => {
	const { setEditor, triggerUpdate } = useEditorStore();
	const liveblocks = useLiveblocksExtension({
		initialContent,
		offlineSupport_experimental: true,
	});

	const editor = useEditor({
		immediatelyRender: false,
		onCreate({ editor }) {
			setEditor(editor);
			triggerUpdate(); // Initial trigger for toolbar setup
		},

		onUpdate() {
			triggerUpdate(); // ✅ Content changed - update toolbar
		},

		onSelectionUpdate() {
			triggerUpdate(); // ✅ Selection changed - update active states
		},

		onFocus() {
			triggerUpdate(); // ✅ Focus changed - update toolbar
		},

		onBlur() {
			triggerUpdate(); // ✅ Blur changed - update toolbar
		},

		onDestroy() {
			setEditor(null);
		},

		editorProps: {
			attributes: {
				class:
					" pr-10 focus:outline-none print:border-0 bg-white border  border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10  pb-10 cursor-text pl-10",
				style: "padding-left: 56px; padding-right:56px;",
			},
		},
		extensions: [
			liveblocks,
			StarterKit.configure({
				history: false,
			}),
			FontSizeExtension,
			LineHightExtension,
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			ImageResize,
			Underline,
			TextStyle,
			FontFamily,
			Color,
			Highlight.configure({
				multicolor: true,
			}),
			Link.configure({
				openOnClick: true,
				autolink: true,
				defaultProtocol: "https",
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
		],
	});

	return (
		<div className=" size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible">
			<Ruler />
			<div className=" min-w-max flex justify-center w-[816px] py-4 print:p-0 print:w-full mx-auto print:min-w-0 ">
				<EditorContent editor={editor} />
				<Threads editor={editor} />
				<FloatingToolbar editor={editor} />
			</div>
		</div>
	);
};
