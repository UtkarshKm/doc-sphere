import {Extension} from "@tiptap/core";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		lineHight: {
			setLineHight: (size: string) => ReturnType;
			unsetLineHight: () => ReturnType;
		};
	}
}

export const LineHightExtension = Extension.create({
	name: "lineHight",
	addOptions() {
		return {
			types: ["paragraph", "heading"],
			defaultLineHight: "normal",
		};
	},
	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					lineHight: {
						default: this.options.defaultLineHight,
						parseHTML: (element) =>
							element.style.lineHeight || this.options.defaultLineHight,
						renderHTML: (attributes) => {
							if (attributes.lineHight) {
								return {
									style: `line-height: ${attributes.lineHight}`,
								};
							}
							return {};
						},
					},
				},
			},
		];
	},
	addCommands() {
		return {
			setLineHight:
				(size: string) =>
				({tr, state, dispatch}) => {
					const {selection} = state;
					tr = tr.setSelection(selection);

					const {from, to} = selection;
					state.doc.nodesBetween(from, to, (node, pos) => {
						if (this.options.types.includes(node.type.name)) {
							tr = tr.setNodeMarkup(pos, undefined, {
								...node.attrs,
								lineHight: size,
							});
						}
					});
					if (dispatch) {
						dispatch(tr);
					}
					return true;
				},
			unsetLineHight:
				() =>
				({tr, state, dispatch}) => {
					const {selection} = state;
					tr = tr.setSelection(selection);

					const {from, to} = selection;
					state.doc.nodesBetween(from, to, (node, pos) => {
						if (this.options.types.includes(node.type.name)) {
							tr = tr.setNodeMarkup(pos, undefined, {
								...node.attrs,
								lineHight: this.options.defaultLineHight,
							});
						}
					});
					if (dispatch) {
						dispatch(tr);
					}
					return true;
				},
		};
	},
});
