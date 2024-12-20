import { PDFDocument } from 'pdf-lib';

export async function compressImages(pdfDoc: PDFDocument, quality: number = 0.8): Promise<void> {
  const pages = pdfDoc.getPages();
  
  for (const page of pages) {
    const images = await page.node.Resources().lookup('XObject', true);
    if (!images) continue;

    for (const [name, image] of Object.entries(images.dict)) {
      if (image.subtype === 'Image') {
        // Progressive image optimization
        if (image.width > 2000 || image.height > 2000) {
          const scale = Math.min(2000 / image.width, 2000 / image.height);
          image.scaleBy(scale);
        }
        
        if (image.colorSpace === 'DeviceRGB') {
          image.setImageQuality(quality);
        }
      }
    }
  }
}