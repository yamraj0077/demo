import React, { useState } from 'react';
import { Images } from 'lucide-react';
import ToolPageLayout from '../../../components/layout/ToolPageLayout';
import ImageDropzone from '../../../components/tools/image/ImageDropzone';
import ImagePreview from '../../../components/tools/image/ImagePreview';
import { convertImage } from '../../../utils/image/conversion';
import type { ImageFormat } from '../../../utils/image/types';

function ImageConverterPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('jpeg');
  const [converting, setConverting] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);

  const handleImageSelect = async (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);
    setConvertedBlob(null);
  };

  const handleConvert = async () => {
    if (!selectedImage) return;
    
    setConverting(true);
    try {
      const converted = await convertImage(selectedImage, targetFormat);
      setConvertedBlob(converted);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedBlob || !selectedImage) return;
    
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement('a');
    const fileName = selectedImage.name.split('.')[0];
    a.href = url;
    a.download = `${fileName}.${targetFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setConvertedBlob(null);
  };

  return (
    <ToolPageLayout
      title="Image Converter"
      description="Convert images between different formats with ease"
      seoTitle="Free Image Converter - Convert Images Online | Developer Tools"
      seoDescription="Convert images between different formats online. Support for JPG, PNG, WebP, and more. Fast and secure image conversion in your browser."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 mb-4">
          <Images className="h-5 w-5" />
          <span className="text-lg font-medium">Convert Image</span>
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
              compressedSize={convertedBlob?.size}
              onRemove={handleRemove}
              onDownload={handleDownload}
              canDownload={!!convertedBlob}
            />
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Format
                </label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value as ImageFormat)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>

              <button
                onClick={handleConvert}
                disabled={converting}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {converting ? 'Converting...' : 'Convert Image'}
              </button>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">How to use:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Upload an image by clicking or dragging and dropping</li>
            <li>Select the target format (JPEG, PNG, or WebP)</li>
            <li>Click "Convert Image" to change the format</li>
            <li>Download the converted image when ready</li>
          </ul>
        </div>
      </div>
    </ToolPageLayout>
  );
}

export default ImageConverterPage;