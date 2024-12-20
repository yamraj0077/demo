import { PDFDocument } from 'pdf-lib';

export async function optimizePDF(pdfDoc: PDFDocument): Promise<void> {
  // Remove unused objects
  await pdfDoc.compress();
  
  // Optimize text objects
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const content = await page.node.Contents();
    if (content) {
      // Remove unnecessary whitespace from content streams
      content.set(content.toString().replace(/\s+/g, ' '));
    }
  }
  
  // Set compression filters
  pdfDoc.useObjectStreams(true);
  pdfDoc.compress();
}