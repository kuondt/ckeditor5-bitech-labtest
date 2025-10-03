// Base64 Upload Adapter cho CKEditor 5
export default class Base64UploadAdapter {
    static get pluginName() {
        return 'Base64UploadAdapter';
    }

    static get requires() {
        return ['FileRepository'];
    }

    init() {
        if (!this.editor.plugins.has('FileRepository')) {
            return;
        }

        const fileRepository = this.editor.plugins.get('FileRepository');

        fileRepository.registerUploadAdapter('base64Upload', (loader: any) => {
            return new Base64UploadAdapterHelper(loader);
        });
    }
}

class Base64UploadAdapterHelper {
    private loader: any;
    private reader: FileReader;

    constructor(loader: any) {
        this.loader = loader;
        this.reader = new FileReader();
    }

    upload(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.reader.onload = () => {
                resolve({
                    default: this.reader.result
                });
            };

            this.reader.onerror = (error) => reject(error);
            this.reader.onabort = () => reject(new Error('FileReader was aborted'));

            return this.loader.file.then((file: File) => this.reader.readAsDataURL(file));
        });
    }

    abort(): void {
        if (this.reader.readyState === this.reader.LOADING) {
            this.reader.abort();
        }
    }
}
