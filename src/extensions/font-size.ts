import {Extension} from "@tiptap/core";

import "@tiptap/extension-text-style";


declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		fontSize: {
			setFontSize: (size: string) => ReturnType;
			unsetFontSize: () => ReturnType;
		};
	}
}


export const FontSizeExtension = Extension.create({
    name: "fontSize",
    addOptions(){
        return{
            types:["textStyle"]
        }
    },
    addGlobalAttributes(){
        return [{
            types: this.options.types,
            attributes: {
                fontSize: {
                    default: null,
                    parseHTML: element => element.style.fontSize,
                    renderHTML: attributes => {
                        if (attributes.fontSize) {
                            return {
                                style: `font-size: ${attributes.fontSize}`
                            }
                        }
                        else return {}
                    },
                }
            }   
        }]
    },    
    addCommands(){
        return {
            setFontSize: (fontSize : string) => ({ chain}) =>{
                return chain().
                setMark("textStyle", {fontSize}).
                run()
            },
            unsetFontSize:() => ({ chain}) =>{
                return chain().
                setMark("textStyle", {fontSize : null})
                .removeEmptyTextStyle().
                run()
            }
        }
    },
    
})