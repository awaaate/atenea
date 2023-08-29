import { $isListNode, INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListNode, REMOVE_LIST_COMMAND } from "@lexical/list";
import { $createHeadingNode, $isHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $getNearestNodeOfType } from "@lexical/utils";
import { IconName } from "@shared/ui";
import { $createParagraphNode, $getSelection, $isRangeSelection, LexicalEditor, LexicalNode, RangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection"
export const blockTypeToBlockName = {
    paragraph: "Normal",
    h1: "Heading 1",
    h2: "Heading 2",
    h3: "Heading 3",
    h4: "Heading 4",
    h5: "Heading 5",
    bullet: "Bulleted List",
    number: "Numbered List",
};


export const blockIcon: Record<keyof typeof blockTypeToBlockName, IconName> = {
    "bullet": "List",
    "number": "ListOrdered",
    "h1": "Heading1",
    "h2": "Heading2",
    "h3": "Heading3",
    "h4": "Heading4",
    "h5": "Heading5",
    "paragraph": "Text",

}
export type BlockType = keyof typeof blockTypeToBlockName;

function validateBlockType(type: BlockType): BlockType {
    return type in blockTypeToBlockName ? type : "paragraph";
}

export function getNodeName(node: LexicalNode | null, anchorNode: LexicalNode): BlockType {
    if (node !== null) {
        if ($isListNode(node)) {
            const parentList = $getNearestNodeOfType<ListNode>(
                anchorNode,
                ListNode,
            );
            const type = (parentList
                ? parentList.getListType()
                : node.getListType()) as BlockType
            return validateBlockType(type)
        } else {
            const type = ($isHeadingNode(node)
                ? node.getTag()
                : node.getType()) as BlockType;
            if (type in blockTypeToBlockName) {
                return validateBlockType(type)
            }

        }
    }
    return "paragraph"
}

function formatHeaingNode(headingSize: HeadingTagType) {

    const selection = $getSelection();


    if (!$isRangeSelection(selection)) return

    $setBlocksType(selection, () => $createHeadingNode(headingSize));
}


export function formatNode(name: BlockType, editor: LexicalEditor, currentType?: BlockType) {

    if (name === "paragraph") {
        editor.update(() => {
            const selection = $getSelection();


            if (!$isRangeSelection(selection)) return

            $setBlocksType(selection, () => $createParagraphNode())
        })
        return

    }

    if (["h1", "h2", "h3", "h4", "h5"].includes(name)) {

        editor.update(() => {
            formatHeaingNode(name as any)
        })
        return
    }
    if (name === "bullet") {
        if (currentType !== 'bullet') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
        return
    }


    if ("number" === name) {
        if (currentType !== 'number') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
        return
    }

    /*    if (name === "check") {
           if (currentType !== 'check') {
               editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
           } else {
               editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
           }
           return
       }
    */


}

