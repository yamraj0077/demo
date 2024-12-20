import { useState, useCallback } from 'react';
import { ImageDimensions } from '../utils/image/types';

export function useImageDimensions(initialDimensions: ImageDimensions = { width: 800, height: 600 }) {
  const [dimensions, setDimensions] = useState<ImageDimensions>(initialDimensions);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const handleDimensionChange = useCallback((dimension: 'width' | 'height', value: number, aspectRatio?: number) => {
    if (maintainAspectRatio && aspectRatio) {
      if (dimension === 'width') {
        setDimensions({
          width: value,
          height: Math.round(value / aspectRatio)
        });
      } else {
        setDimensions({
          width: Math.round(value * aspectRatio),
          height: value
        });
      }
    } else {
      setDimensions(prev => ({
        ...prev,
        [dimension]: value
      }));
    }
  }, [maintainAspectRatio]);

  return {
    dimensions,
    setDimensions,
    maintainAspectRatio,
    setMaintainAspectRatio,
    handleDimensionChange
  };
}