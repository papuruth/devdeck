import React from "react";
import { ActionBar, ActionBtn, ActionBtnGroup, CodeArea } from "components/Shared/ToolKit";

const EMPTY_CTAS = ["paste", "loadJSONData"];
const CONTENT_CTAS = ["copy", "clear", "format", "removeWhitespace"];

const CTA_LABELS = {
    paste: "Paste",
    loadJSONData: "Load JSON Data",
    copy: "Copy",
    clear: "Clear",
    format: "Format",
    removeWhitespace: "Remove Whitespace"
};

interface EditorProps {
    handleJSONInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    jsonInput: string;
    handleEditorOperations: (id: string) => Promise<void>;
}

export default function Editor({ handleJSONInput, jsonInput, handleEditorOperations }: EditorProps) {
    const hasContent = !!jsonInput;
    const visibleIds = hasContent ? [...EMPTY_CTAS, ...CONTENT_CTAS] : EMPTY_CTAS;

    return (
        <>
            <ActionBar>
                <ActionBtnGroup>
                    {visibleIds.map((id) => (
                        <ActionBtn key={id} onClick={() => handleEditorOperations(id as keyof typeof CTA_LABELS)}>
                            {CTA_LABELS[id as keyof typeof CTA_LABELS]}
                        </ActionBtn>
                    ))}
                </ActionBtnGroup>
            </ActionBar>
            <CodeArea
                value={jsonInput}
                onChange={handleJSONInput}
                placeholder="Paste JSON code here..."
                spellCheck={false}
                style={{ flex: 1, minHeight: 400 }}
            />
        </>
    );
}

