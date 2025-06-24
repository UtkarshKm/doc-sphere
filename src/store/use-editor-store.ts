import {create} from "zustand";
import {type Editor} from "@tiptap/react";

// Enhanced store that tracks editor updates
interface EditorState {
    editor: Editor | null;
    updateTrigger: number;  // Force re-renders
    setEditor: (editor: Editor | null) => void;
    triggerUpdate: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
    editor: null,
    updateTrigger: 0,
    
    setEditor: (editor) => set({ editor }),
    
    triggerUpdate: () => set((state) => ({ 
        updateTrigger: state.updateTrigger + 1 
    })),
}));
