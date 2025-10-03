import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';

import { createCKEditorConfig, CKEditorConfig } from './CKEditorConfig';
import './styles/index.css';

export interface CKEditorProps {
  initialData?: string;
  placeholder?: string;
  licenseKey?: string;
  onChange?: (event: any, editor: any) => void;
  onFocus?: (event: any, editor: any) => void;
  onBlur?: (event: any, editor: any) => void;
  onReady?: (editor: any) => void;
  disabled?: boolean;
  className?: string;
  customConfig?: Partial<CKEditorConfig>;
}

export const BiTechCKEditor: React.FC<CKEditorProps> = ({
  initialData = '',
  placeholder = 'Nhập hoặc dán nội dung của bạn vào đây!',
  licenseKey,
  onChange,
  onFocus,
  onBlur,
  onReady,
  disabled = false,
  className = '',
  customConfig = {}
}) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    const defaultConfig = createCKEditorConfig(licenseKey);
    const mergedConfig = {
      ...defaultConfig,
      ...customConfig,
      initialData,
      placeholder
    };

    return { editorConfig: mergedConfig };
  }, [isLayoutReady, licenseKey, initialData, placeholder, customConfig]);

  const handleChange = useCallback((event: any, editor: any) => {
    editorRef.current = editor;
    onChange?.(event, editor);
  }, [onChange]);

  const handleFocus = useCallback((event: any, editor: any) => {
    onFocus?.(event, editor);
  }, [onFocus]);

  const handleBlur = useCallback((event: any, editor: any) => {
    onBlur?.(event, editor);
  }, [onBlur]);

  const handleReady = useCallback((editor: any) => {
    editorRef.current = editor;
    onReady?.(editor);
  }, [onReady]);

  useEffect(() => {
    const handleMathLiveClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const mathElement = target.closest('.math-live') as HTMLElement;
      
      if (mathElement) {
        const latex = mathElement.getAttribute('data-latex') || '';
        
        const mathField = document.createElement('math-field');
        mathField.style.position = 'fixed';
        mathField.style.top = '50%';
        mathField.style.left = '50%';
        mathField.style.transform = 'translate(-50%, -50%)';
        mathField.style.zIndex = '10000';
        mathField.style.backgroundColor = 'white';
        mathField.style.padding = '20px';
        mathField.style.borderRadius = '8px';
        mathField.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        (mathField as any).value = latex;

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.zIndex = '9999';
        
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Lưu';
        saveButton.style.marginLeft = '10px';
        saveButton.style.padding = '8px 16px';
        saveButton.style.backgroundColor = '#007cba';
        saveButton.style.color = 'white';
        saveButton.style.border = 'none';
        saveButton.style.borderRadius = '4px';
        saveButton.style.cursor = 'pointer';

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Hủy';
        cancelButton.style.marginLeft = '10px';
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.backgroundColor = '#666';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';

        const container = document.createElement('div');
        container.appendChild(mathField);
        container.appendChild(saveButton);
        container.appendChild(cancelButton);

        const handleClose = () => {
          document.body.removeChild(overlay);
        };

        const handleSave = () => {
          const newLatex = (mathField as any).value;
          mathElement.setAttribute('data-latex', newLatex);
          mathElement.textContent = newLatex;
          handleClose();
        };

        saveButton.onclick = handleSave;
        cancelButton.onclick = handleClose;
        overlay.onclick = handleClose;
        container.onclick = (e) => e.stopPropagation();

        document.body.appendChild(overlay);
        document.body.appendChild(container);
      }
    };

    document.addEventListener('click', handleMathLiveClick);
    
    return () => {
      document.removeEventListener('click', handleMathLiveClick);
    };
  }, []);

  return React.createElement(
    'div',
    {
      className: `main-container ${className}`,
      style: {
        height: '100%',
        minHeight: '400px',
        width: '100%'
      },
      ref: editorContainerRef
    },
    React.createElement(
      'div',
      { className: 'editor-container editor-container_classic-editor editor-container_include-fullscreen' },
      React.createElement(
        'div',
        { className: 'editor-container__editor' },
        editorConfig && React.createElement(CKEditor, {
          editor: ClassicEditor,
          config: editorConfig,
          disabled,
          onChange: handleChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
          onReady: handleReady,
          ref: editorRef
        })
      )
    )
  );
};

// Export default
export default BiTechCKEditor;

// Export configuration
export { createCKEditorConfig } from './CKEditorConfig';
export type { CKEditorConfig } from './CKEditorConfig';

// Export plugins
export { default as Base64UploadAdapter } from './plugins/Base64UploadAdapter';
export { default as MathLivePlugin } from './plugins/MathLive';
