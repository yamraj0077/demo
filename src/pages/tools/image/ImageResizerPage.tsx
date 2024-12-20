import React, { useEffect } from 'react';
import { ImagePlus } from 'lucide-react';
import ToolPageLayout from '../../../components/layout/ToolPageLayout';
import ImageDropzone from '../../../components/tools/image/ImageDropzone';
import ImagePreview from '../../../components/tools/image/ImagePreview';
import ResizeDimensionsControl from '../../../components/tools/image/ResizeDimensionsControl';
import { useImageDimensions } from '../../../hooks/useImageDimensions';
import { useImageProcessing } from '../../../hooks/useImageProcessing';

function ImageResizerPage() {
  const {
    dimensions,
    setDimensions,
    maintainAspectRatio,
    setMaintainAspectRatio,
    handleDimensionChange
  } = useImageDimensions();

  const {
    selectedImage,
    previewUrl,
    processedBlob,
    isProcessing,
    handleImageSelect,
    handleResize,
    handleDownload,
    handleRemove
  } = useImageProcessing();

  // Update dimensions when image is selected
  useEffect(() => {
    if (selectedImage) {
      const img = new Image();
      img.onload = () => {
        setDimensions({
          width: img.width,
          height: img.height
        });
      };
      img.src = URL.createObjectURL(selectedImage);
    }
  }, [selectedImage, setDimensions]);

  return (
    <ToolPageLayout
      title="Image Resizer"
      description="Resize images to exact dimensions while preserving quality"
      seoTitle="Free Image Resizer - Resize Images Online | Developer Tools"
      seoDescription="Resize images online while maintaining quality. Set custom dimensions or percentage scaling. Support for all major image formats."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 mb-4">
          <ImagePlus className="h-5 w-5" />
          <span className="text-lg font-medium">Resize Image</span>
        </div>

        {!selectedImage ? (
          <ImageDropzone
            onImageSelect={handleImageSelect}
            accept="image/*"
            maxSize={10 * 1024 * 1024}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImagePreview
              src={previewUrl}
              originalSize={selectedImage.size}
              compressedSize={processedBlob?.size}
              onRemove={handleRemove}
              onDownload={handleDownload}
              canDownload={!!processedBlob}
              downloadButtonText="Download Resized Image"
            />
            
            <div className="space-y-6">
              <ResizeDimensionsControl
                dimensions={dimensions}
                onDimensionChange={handleDimensionChange}
                maintainAspectRatio={maintainAspectRatio}
                onAspectRatioChange={setMaintainAspectRatio}
              />

              <button
                onClick={() => handleResize(dimensions)}
                disabled={isProcessing}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isProcessing ? 'Resizing...' : 'Resize Image'}
              </button>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">How to use:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Upload an image by clicking or dragging and dropping</li>
            <li>Set your desired width and height in pixels</li>
            <li>Toggle "Maintain aspect ratio" to preserve proportions</li>
            <li>Click "Resize Image" to process your image</li>
            <li>Download the resized image when ready</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

export default ImageResizerPage;