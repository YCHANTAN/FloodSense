import React, { useState } from 'react';
import { Upload, X, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

interface ImageDropzoneProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageSelect, selectedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPEG or PNG image.');
      return false;
    }
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onImageSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onImageSelect(file);
    }
  };

  return (
    <div className="w-full">
      {!selectedImage ? (
        <label
          className={clsx(
            "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200",
            isDragging 
              ? "border-[#06b6d4] bg-[#06b6d4]/10" 
              : "border-slate-700 bg-slate-800/50 hover:bg-slate-800"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className={clsx("w-12 h-12 mb-4", isDragging ? "text-[#06b6d4]" : "text-slate-400")} />
            <p className="mb-2 text-sm text-slate-300 font-poppins">
              <span className="font-bold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">JPEG or PNG (Max 5MB)</p>
          </div>
          <input type="file" className="hidden" accept="image/jpeg,image/png" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="relative w-full h-64 rounded-2xl overflow-hidden group">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onImageSelect(null)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-bold">
            <CheckCircle2 size={14} />
            <span>Image Ready</span>
          </div>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-[#e11d48] font-inter">{error}</p>}
    </div>
  );
};

export default ImageDropzone;
