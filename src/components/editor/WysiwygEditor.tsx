"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";

export default function WysiwygEditor() {
  const editor = useEditor({
    extensions: [StarterKit.configure({
        heading: {
            levels: [1, 2, 3],
        },
        codeBlock: {
            HTMLAttributes: {
                class: 'bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm font-mono',
            },
        },
        bulletList: {
            HTMLAttributes: {
                class: 'list-disc pl-8',
            },
        },
        orderedList: {
            HTMLAttributes: {
                class: 'list-decimal pl-8',
            },
        },
        blockquote: {
            HTMLAttributes: {
                class: 'border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic',
            },
        }
    })],
    content: `
      <h1>Comece a escrever...</h1>
      <p>Este é um editor de texto <strong>WYSIWYG</strong>. Use a barra de ferramentas acima para formatar o seu conteúdo.</p>
    `,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] border border-input rounded-lg">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}