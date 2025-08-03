import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
}

export function ImageUpload({ onImageSelect, selectedImage }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

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
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageSelect(imageFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(imageFile);
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleRemove = useCallback(() => {
    onImageSelect(null);
    setPreview(null);
  }, [onImageSelect]);

  if (selectedImage && preview) {
    return (
      <Card className="p-6 relative group shadow-card hover:shadow-card-hover transition-all duration-300">
        <div className="relative">
          <img
            src={preview}
            alt="Selected image"
            className="w-full h-64 object-cover rounded-lg"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-3 text-center">
          {selectedImage.name}
        </p>
      </Card>
    );
  }

  return (
    <Card 
      className={`p-8 border-2 border-dashed transition-all duration-300 cursor-pointer hover:shadow-card-hover ${
        isDragOver 
          ? 'border-primary bg-primary/5 shadow-card-hover' 
          : 'border-border hover:border-primary/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
          isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted'
        }`}>
          {isDragOver ? (
            <Upload className="w-8 h-8" />
          ) : (
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">
            {isDragOver ? 'Drop your image here' : 'Upload an image'}
          </h3>
          <p className="text-muted-foreground">
            Drag and drop an image file, or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports JPG, PNG, GIF up to 10MB
          </p>
        </div>

        <Button variant="outline" className="mt-4">
          <Upload className="w-4 h-4 mr-2" />
          Browse Files
        </Button>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </Card>
  );
}