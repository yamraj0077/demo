import { PDFDocument } from 'pdf-lib';

export async function optimizeColorSpaces(pdfDoc: PDFDocument): Promise<void> {
  const pages = pdfDoc.getPages();
  
  for (const page of pages) {
    const images = await page.node.Resources().lookup('XObject', true);
    if (!images) continue;

    for (const [name, image] of Object.entries(images.dict)) {
      if (image.subtype === 'Image') {
        try {
          // Convert CMYK images to RGB to reduce size
          if (image.colorSpace === 'DeviceCMYK') {
            image.convertToRGB();
          }
          
          // Reduce color depth for images that don't need high color precision
          if (image.bitsPerComponent > 8) {
            image.setBitsPerComponent(8);
          }
        } catch (error) {
          console.warn('Color space optimization failed:', error);
        }
      }
    }
  }
}