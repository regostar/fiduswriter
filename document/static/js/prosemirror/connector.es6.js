/* Functions for ProseMirror integration.*/

var theEditor = {};

function makeEditor (where, doc) {
  return new pm.ProseMirror({
    place: where,
    schema: fidusSchema,
    doc: doc,
    menuBar: true,
  })
};


theEditor.loadDocument = function (aDocument) {
    var editorNode = document.createElement('div'),
      titleNode = exporter.obj2Node(aDocument.metadata.title),
      metadataNode = document.createElement('div'),
      documentContentsNode = exporter.obj2Node(aDocument.contents),
      metadataSubtitleNode = aDocument.metadata.subtitle ? exporter.obj2Node(aDocument.metadata.subtitle) : document.createElement('div'),
      metadataAuthorsNode = aDocument.metadata.authors ? exporter.obj2Node(aDocument.metadata.authors) : document.createElement('div'),
      metadataAbstractNode = aDocument.metadata.abstract ? exporter.obj2Node(aDocument.metadata.abstract) : document.createElement('div'),
      metadataKeywordsNode = aDocument.metadata.keywords ? exporter.obj2Node(aDocument.metadata.keywords) : document.createElement('div'),
      doc;

      titleNode.id = 'document-title';
      metadataNode.id = 'document-metadata';
      metadataSubtitleNode.id = 'metadata-subtitle';
      metadataAuthorsNode.id = 'metadata-authors';
      metadataAbstractNode.id = 'metadata-abstract';
      metadataKeywordsNode.id = 'metadata-keywords';
      documentContentsNode.id = 'document-contents';

      editorNode.appendChild(titleNode);
      metadataNode.appendChild(metadataSubtitleNode);
      metadataNode.appendChild(metadataAuthorsNode);
      metadataNode.appendChild(metadataAbstractNode);
      metadataNode.appendChild(metadataKeywordsNode);
      editorNode.appendChild(metadataNode);
      editorNode.appendChild(documentContentsNode);

      doc = pm.fromDOM(fidusSchema, editorNode)
      theEditor.editor = makeEditor(document.getElementById('document-editable'), doc);

      new HighlightToolbarButtons(theEditor.editor, "selectionChange change activeMarkChange");

};


theEditor.fromDOM = pm.fromDOM;
theEditor.schema = fidusSchema;

window.theEditor = theEditor;