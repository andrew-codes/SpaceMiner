class SMEditor {
  constructor(template) {
    template._instanceId = Meteor.uuid();
    this.template = template;
  }

  get editorId() {
    return this.template._instanceId;
  }

  get code() {
    return this.getEditor().getSession().getValue();
  }

  getEditor() {
    // TODO: must this be done every time?
    for (let path of ['modePath', 'themePath', 'workerPath', 'basePath']) {
      ace.config.set(path, '/packages/mrt_ace-embed/ace');
    }
    const editor = ace.edit(this.editorId);
    return editor;
  }

  render(code) {
    const editor = this.getEditor();
    editor.setTheme('ace/theme/chrome');
    const session = editor.getSession();
    session.setMode('ace/mode/javascript');
    editor.setOptions({
      maxLines: 18,
      minLines: 18,
      fontSize: 20,
      showPrintMargin: false,
      readOnly: false,
      highlightActiveLine: true,
      highlightGutterLine: true
    });

    session.setOptions({useWorker: false});
    session.setTabSize(2);
    session.setValue(code);

    editor.renderer.setPadding(20);
  }
};

this.SMEditor = SMEditor;