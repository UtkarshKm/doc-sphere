"use client";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import {useEditorStore} from "@/store/use-editor-store";
import Underline from "@tiptap/extension-underline";

export const Editor = () => {
	const {setEditor, triggerUpdate} = useEditorStore();

	const editor = useEditor({
		onCreate({editor}) {
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
			style: "padding-left: 56px padding-right:56px",
			attributes: {
				class:
					" pr-10 focus:outline-none print:border-0 bg-white border  broder-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10  pb-10 cursor-text pl-10",
			},
		},
		extensions: [
			StarterKit,
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
			Image,
			ImageResize,
			Underline
		],
		content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>

		
      `,
	});

	return (
		<div className=" size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible">
			<div className=" min-w-max flex justify-center w-[816px] py-4 print:p-0 print:w-full mx-auto print:min-w-0 ">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
