import React from 'react';

interface DocumentViewerProps {
  fileUrl: string;
  fileType: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ fileUrl, fileType }) => {
  const renderContent = () => {
    switch (fileType) {
      case 'pdf':
        return (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            className="w-full h-full border-none"
            title="PDF Viewer"
          />
        );
      case 'docx':
      case 'doc':
      case 'odt':
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
            className="w-full h-full border-none"
            title="Office Document Viewer"
          />
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'svg':
        return <img src={fileUrl} alt="Document Preview" className="max-w-full max-h-full object-contain" />;
      case 'md':
        // For markdown, you might want to use a markdown parser library
        return <div className="p-4">Markdown content would be rendered here</div>;
      case 'html':
        return <iframe src={fileUrl} className="w-full h-full border-none" title="HTML Preview" />;
      default:
        return <div className="p-4">不支持的文件類型</div>;
    }
  };

  return (
    <div className="w-full h-full bg-white">
      {renderContent()}
    </div>
  );
};

export default DocumentViewer;