import { PDFDocument } from 'pdf-lib';

export async function compressImages(pdfDoc: PDFDocument): Promise<void> {
  const pages = pdfDoc.getPages();
  
  for (const page of pages) {
    const images = await page.node.Resources().lookup('XObject', true);
    if (!images) continue;

    for (const [name, image] of Object.entries(images.dict)) {
      if (image.subtype === 'Image') {
        // Downsample images larger than 1000px
        if (image.width > 1000 || image.height > 1000) {
          const scale = Math.min(1000 / image.width, 1000 / image.height);
          image.scaleBy(scale);
        }
        
        // Reduce image quality if it's a JPG
        if (image.colorSpace === 'DeviceRGB') {
          image.setImageQuality(0.8);
        }
      }
    }
  }
}