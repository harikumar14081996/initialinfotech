"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const controls: Array<{ label: string; action: (editor: Editor) => boolean }> = [
  { label: "Bold", action: (editor) => editor.chain().focus().toggleBold().run() },
  { label: "Bullet", action: (editor) => editor.chain().focus().toggleBulletList().run() },
  { label: "Heading", action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run() },
];

export function RichTextEditor({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Describe duties, responsibilities, and work scope...",
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose-rich min-h-48 rounded-b-3xl px-4 py-4 outline-none [&_.is-editor-empty:first-child::before]:text-[var(--color-muted)] [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_ul]:list-disc",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  return (
    <div className={cn("overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white", className)}>
      <div className="flex flex-wrap gap-2 border-b border-[var(--color-line)] px-3 py-3">
        {controls.map((control) => (
          <Button
            key={control.label}
            variant="secondary"
            className="px-3 py-2 text-xs"
            onClick={() => editor && control.action(editor)}
            disabled={!editor}
          >
            {control.label}
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
