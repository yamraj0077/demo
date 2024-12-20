import React, { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import ToolPageLayout from '../../../components/layout/ToolPageLayout';
import ImageDropzone from '../../../components/tools/image/ImageDropzone';
import ImagePreview from '../../../components/tools/image/ImagePreview';
import CompressionControls from '../../../components/tools/image/CompressionControls';
import { createImagePreview, compressImage } from '../../../utils/imageUtils';

function ImageCompressorPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      createImagePreview(selectedImage).then(setPreviewUrl);
    }
  }, [selectedImage]);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setCompressedBlob(null);
  };

  const handleCompress = async () => {
    if (!selectedImage) return;
    
    setIsCompressing(true);
    try {
      const compressed = await compressImage(selectedImage, quality);
      setCompressedBlob(compressed);
    } catch (error) {
      console.error('Compression failed:', error);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !selectedImage) return;
    
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${selectedImage.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setCompressedBlob(null);
  };

  return (
    <ToolPageLayout
      title="Image Compressor"
      description="Compress images without losing quality"
      seoTitle="Free Image Compressor - Reduce Image Size Online | Developer Tools"
      seoDescription="Compress JPG, PNG, and WebP images online without losing quality. Fast, free, and secure image compression right in your browser. Reduce file size while maintaining image quality."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 mb-4">
          <Image className="h-5 w-5" />
          <span className="text-lg font-medium">Upload Image</span>
        </div>

        {!selectedImage ? (
          <ImageDropzone 
            onImageSelect={handleImageSelect}
            accept="image/jpeg,image/png,image/webp"
            maxSize={20 * 1024 * 1024}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImagePreview
              src={previewUrl}
              originalSize={selectedImage.size}
              compressedSize={compressedBlob?.size}
              onRemove={handleRemove}
              onDownload={handleDownload}
              canDownload={!!compressedBlob}
            />
            <CompressionControls
              quality={quality}
              onQualityChange={setQuality}
              onCompress={handleCompress}
              isCompressing={isCompressing}
            />
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">How to use:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Drag and drop your image or click to select</li>
            <li>Adjust the compression quality slider</li>
            <li>Click "Compress Image" to reduce the file size</li>
            <li>Download the compressed image when ready</li>
            <li>Your images are processed locally - no upload needed</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

export default ImageCompressorPage;