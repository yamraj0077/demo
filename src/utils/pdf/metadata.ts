import { PDFDocument } from 'pdf-lib';

export function removeMetadata(pdfDoc: PDFDocument): void {
  try {
    const context = pdfDoc.context;
    
    // Safely remove document metadata
    try {
      const metadata = pdfDoc.catalog.get(context.obj('Metadata'));
      if (metadata) {
        context.delete(metadata);
        pdfDoc.catalog.delete(context.obj('Metadata'));
      }
    } catch (e) {
      console.warn('Failed to remove Metadata:', e);
    }
    
    // Safely remove document information
    try {
      const info = context.obj('Info');
      if (info) {
        context.delete(info);
      }
    } catch (e) {
      console.warn('Failed to remove Info:', e);
    }
    
    // Safely remove XMP metadata
    try {
      const xmp = pdfDoc.catalog.get(context.obj('XMP'));
      if (xmp) {
        context.delete(xmp);
        pdfDoc.catalog.delete(context.obj('XMP'));
      }
    } catch (e) {
      console.warn('Failed to remove XMP:', e);
    }
  } catch (error) {
    console.warn('Metadata removal failed:', error);
    // Don't throw, allow the compression to continue
  }
}