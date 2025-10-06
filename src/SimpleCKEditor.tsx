import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./styles/index.css";
import BiTechEditor from "./BiTechEditor";

export interface SimpleCKEditorProps {
  initialData?: string;
  onChange?: (event: any, editor: any) => void;
}

export default function SimpleCKEditor({
  initialData = "",
  onChange,
}: SimpleCKEditorProps) {
  return (
    <div className="main-container">
      <CKEditor editor={BiTechEditor} data={initialData} onChange={onChange} />
    </div>
  );
}
