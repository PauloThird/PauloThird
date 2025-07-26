import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface UploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  className?: string;
}

const Uploader: React.FC<UploaderProps> = ({ onFileSelect, selectedFile, className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelection = useCallback((file: File) => {
    onFileSelect(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Cleanup previous URL
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [onFileSelect, previewUrl]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelection(file);
      }
    }
  }, [handleFileSelection]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [handleFileSelection]);

  React.useEffect(() => {
    if (!selectedFile && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [selectedFile, previewUrl]);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-neon-green bg-neon-green/10 scale-105' 
            : selectedFile 
              ? 'border-neon-purple bg-neon-purple/10' 
              : 'border-gray-600 bg-white/5 hover:border-neon-blue hover:bg-neon-blue/5'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {previewUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="relative mx-auto w-32 h-32 rounded-xl overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-neon-gradient/20"></div>
            </div>
            <div className="text-center">
              <p className="text-neon-green font-semibold">{selectedFile?.name}</p>
              <p className="text-gray-400 text-sm">
                {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-neon-blue text-sm mt-2">Clique ou arraste para alterar</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Upload Icon */}
            <motion.div
              className="mx-auto w-24 h-24 relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-neon-gradient rounded-2xl flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-neon-gradient rounded-2xl animate-pulse opacity-30"></div>
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-neon-gradient">
                Upload sua imagem
              </h3>
              <p className="text-gray-400">
                Arraste e solte ou clique para selecionar
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, GIF até 10MB
              </p>
            </div>

            {isDragOver && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-neon-green font-semibold text-lg"
              >
                Solte sua imagem aqui! ✨
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Glow effect overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-purple/0 via-neon-blue/10 to-neon-purple/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </motion.div>
    </div>
  );
};

export default Uploader;