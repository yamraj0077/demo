import { useState } from 'react';
import { ImageDimensions } from '../utils/image/types';
import { resizeImage } from '../utils/image/resize';

export function useImageProcessing() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = async (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);
    setProcessedBlob(null);
  };

  const handleResize = async (dimensions: ImageDimensions) => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    try {
      const resized = await resizeImage(selectedImage, dimensions);
      setProcessedBlob(resized);
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedBlob || !selectedImage) return;
    
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    const fileName = selectedImage.name.split('.')[0];
    a.href = url;
    a.download = `${fileName}-resized.${selectedImage.type.split('/')[1]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setProcessedBlob(null);
  };

  return {
    selectedImage,
    previewUrl,
    processedBlob,
    isProcessing,
    handleImageSelect,
    handleResize,
    handleDownload,
    handleRemove
  };
}