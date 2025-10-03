import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { createBasicConfig } from "./BasicCKEditorConfig";
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
  const config = createBasicConfig();

  return (
    <div className="main-container">
      <CKEditor
        editor={BiTechEditor}
        config={config}
        data={initialData}
        onChange={onChange}
      />
    </div>
  );
}
