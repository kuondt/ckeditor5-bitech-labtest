import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import { createBasicConfig } from './BasicCKEditorConfig';
import './styles/index.css';

export interface SimpleCKEditorProps {
  initialData?: string;
  onChange?: (event: any, editor: any) => void;
}

export default function SimpleCKEditor({ 
  initialData = '', 
  onChange 
}: SimpleCKEditorProps) {
  const config = createBasicConfig();

  return (
    <div className="main-container">
      <CKEditor
        editor={ClassicEditor}
        config={config}
        data={initialData}
        onChange={onChange}
      />
    </div>
  );
}
