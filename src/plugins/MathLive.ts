// MathLive Plugin cho CKEditor 5
export default class MathLivePlugin {
    static get requires() {
        return ['Widget', 'Paragraph'];
    }

    static get pluginName() {
        return 'MathLive';
    }

    init() {
        this.editor.commands.add('mathLive', new (class MathLiveCommand {
            constructor(private editor: any) {}
            
            execute(options = {}) {
                const model = this.editor.model;
                const selection = model.document.selection;

                model.change((writer: any) => {
                    const mathElement = writer.createElement('mathLive', options);
                    model.insertContent(mathElement);
                    writer.setSelection(mathElement, 'on');
                });
            }

            refresh() {
                const model = this.editor.model;
                const selection = model.document.selection;
                const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'mathLive');
                this.isEnabled = allowedIn !== null;
            }

            isEnabled = true;
        })(this.editor));

        this._defineSchema();
        this._defineConverters();
    }

    _defineSchema() {
        const schema = this.editor.model.schema;
        schema.register('mathLive', {
            inheritAllFrom: '$inlineObject',
            allowWhere: '$text'
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;
        
        conversion.for('upcast').elementToElement({
            view: {
                name: 'span',
                classes: ['math-live']
            },
            model: (viewElement: any, conversionApi: any) => {
                const modelElement = conversionApi.writer.createElement('mathLive', {
                    latex: viewElement.getAttribute('data-latex')
                });
                conversionApi.writer.insert(modelElement, conversionApi.writer.createRangeAt(viewElement));
                return conversionApi.writer.createRangeOn(modelElement);
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model: {
                name: 'mathLive',
                attributes: ['latex']
            },
            view: (modelElement: any, viewWriter: any) => {
                const label = 'MathLive';
                const viewElement = viewWriter.createEditableElement('span', {
                    class: 'math-live',
                    'data-latex': modelElement.getAttribute('latex')
                });

                viewWriter.insert(viewWriter.createPositionAt(viewElement, 0), viewWriter.createText(label));
                return viewElement;
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model: {
                name: 'mathLive',
                attributes: ['latex']
            },
            view: (modelElement: any, viewWriter: any) => {
                return viewWriter.createContainerElement('span', {
                    class: 'math-live',
                    'data-latex': modelElement.getAttribute('latex')
                });
            }
        });
    }
}