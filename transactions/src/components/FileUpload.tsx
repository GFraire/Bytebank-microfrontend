import React, { useRef, useState } from 'react';
import { Upload, X, FileText } from 'phosphor-react';
import { fileService } from '../services/fileService';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  existingFiles?: string[];
  maxFiles?: number;
  acceptedTypes?: string[];
  maxSize?: number; // em MB
}

export default function FileUpload({ 
  onFilesChange,
  existingFiles = [],
  maxFiles = 5, 
  acceptedTypes = ['image/*', 'application/pdf'],
  maxSize = 5 
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles = Array.from(newFiles).filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`Arquivo ${file.name} é muito grande. Máximo ${maxSize}MB.`);
        return false;
      }
      return true;
    });

    const updatedFiles = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-green bg-green-50' : 'border-gray-300 hover:border-green'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-2">
          Arraste arquivos aqui ou{' '}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-green hover:underline"
          >
            clique para selecionar
          </button>
        </p>
        <p className="text-sm text-gray-500">
          Máximo {maxFiles} arquivos, até {maxSize}MB cada
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Arquivos existentes */}
      {existingFiles && existingFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Arquivos anexados:</h4>
          <div className="space-y-2">
            {existingFiles.map((fileName, index) => (
              <div key={`existing-${index}`} className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                <div className="flex items-center">
                  <FileText size={20} className="text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700 truncate">{fileName}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (fileName.includes('_')) {
                        alert(`Arquivo simulado: ${fileName.split('_').slice(1).join('_')}`);
                      } else {
                        window.open(fileService.getFileUrl(fileName), '_blank');
                      }
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200"
                    title="Visualizar arquivo"
                  >
                    Ver
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (fileName.includes('_')) {
                        alert(`Download simulado: ${fileName.split('_').slice(1).join('_')}`);
                      } else {
                        const link = document.createElement('a');
                        link.href = fileService.getFileUrl(fileName);
                        link.download = fileName;
                        link.click();
                      }
                    }}
                    className="text-green-600 hover:text-green-800 text-xs px-2 py-1 rounded bg-green-100 hover:bg-green-200"
                    title="Baixar arquivo"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Novos arquivos */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Novos arquivos:</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <FileText size={20} className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700 truncate">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}