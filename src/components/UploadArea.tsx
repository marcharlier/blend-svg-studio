import React, { useCallback, useState } from 'react';
import { Upload, X, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadAreaProps {
  onImageUpload: (file: File, imageData: string) => void;
  currentImage?: string;
  onClearImage: () => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
  onImageUpload,
  currentImage,
  onClearImage,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError('Only JPG and PNG files are allowed');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const loadExampleImage = async () => {
    try {
      const response = await fetch('/lovable-uploads/ac0baf0a-896a-4460-9b98-2228132c7798.png');
      const blob = await response.blob();
      const file = new File([blob], 'example-swoosh.png', { type: 'image/png' });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(file, result);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      setError('Failed to load example image');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Upload Image</h2>
        {currentImage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearImage}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {!currentImage ? (
        <div className="space-y-4">
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${isDragOver 
                ? 'border-primary bg-upload-hover' 
                : 'border-upload-border bg-upload hover:bg-upload-hover hover:border-primary/50'
              }
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4 pointer-events-none">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              
              <div>
                <p className="text-lg font-medium">Drop your image here</p>
                <p className="text-muted-foreground mt-1">
                  or click to browse • JPG, PNG only
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={loadExampleImage}
              variant="secondary"
              size="sm"
              className="pointer-events-auto"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Try Example Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-upload border border-upload-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <img
              src={currentImage}
              alt="Uploaded"
              className="w-16 h-16 object-cover rounded border border-upload-border"
            />
            <div className="flex-1">
              <p className="font-medium">Image loaded</p>
              <p className="text-sm text-muted-foreground">
                Ready for SVG generation
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};