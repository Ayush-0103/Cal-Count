import React, { useCallback, useState } from 'react';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  isLoading?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageSelect(file, result);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearPreview = useCallback(() => {
    setPreview(null);
  }, []);

  if (preview) {
    return (
      <div className="relative w-full max-w-md mx-auto animate-scale-in">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={preview}
            alt="Meal preview"
            className="w-full h-64 object-cover"
          />
          {!isLoading && (
            <button
              onClick={clearPreview}
              className="absolute top-3 right-3 p-2 bg-card/90 backdrop-blur-sm rounded-full shadow-md hover:bg-card transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          )}
          {isLoading && (
            <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-primary-foreground font-medium text-sm bg-primary/90 px-4 py-2 rounded-full">
                  Analyzing your meal...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative w-full max-w-md mx-auto p-8 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
      )}
    >
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center gap-4 text-center pointer-events-none">
        <div className={cn(
          "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300",
          isDragging ? "bg-primary text-primary-foreground scale-110" : "bg-secondary text-primary"
        )}>
          {isDragging ? (
            <Upload className="w-10 h-10 animate-bounce" />
          ) : (
            <ImageIcon className="w-10 h-10" />
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">
            {isDragging ? "Drop your meal photo" : "Upload a meal photo"}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag & drop or tap to select
          </p>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            Browse
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <Camera className="w-4 h-4" />
            Camera
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
