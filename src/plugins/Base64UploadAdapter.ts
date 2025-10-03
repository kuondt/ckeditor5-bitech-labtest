// src/plugins/Base64UploadAdapter.ts
import {
  Plugin,
  type FileLoader,
  type UploadAdapter,
  type FileRepository,
} from "ckeditor5";

export default class Base64UploadAdapter extends Plugin {
  public static get pluginName() {
    return "Base64UploadAdapter" as const;
  }

  // Đảm bảo FileRepository được load trước
  public static get requires() {
    return ["FileRepository"] as const;
  }

  public init(): void {
    const fileRepository = this.editor.plugins.get(
      "FileRepository"
    ) as FileRepository;

    // Gắn factory tạo adapter
    fileRepository.createUploadAdapter = (loader: FileLoader) => {
      return new Base64UploadAdapterHelper(loader);
    };
  }
}

class Base64UploadAdapterHelper implements UploadAdapter {
  private loader: FileLoader;
  private reader: FileReader;

  constructor(loader: FileLoader) {
    this.loader = loader;
    this.reader = new FileReader();
  }

  public upload(): Promise<{ default: string }> {
    return this.loader.file.then((file) => {
      return new Promise((resolve, reject) => {
        this.reader.onload = () => {
          // Reader.result có thể là string | ArrayBuffer – ta ép về string
          resolve({ default: String(this.reader.result) });
        };
        this.reader.onerror = () =>
          reject(this.reader.error || new Error("File reading error"));
        this.reader.onabort = () => reject(new Error("File reading aborted"));

        this.reader.readAsDataURL(file as File);
      });
    });
  }

  public abort(): void {
    if (this.reader && this.reader.readyState === this.reader.LOADING) {
      this.reader.abort();
    }
  }
}
