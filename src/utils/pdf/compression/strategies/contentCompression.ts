import { PDFDocument } from 'pdf-lib';

export async function compressContent(pdfDoc: PDFDocument): Promise<void> {
  const pages = pdfDoc.getPages();
  
  for (const page of pages) {
    const content = await page.node.Contents();
    if (content) {
      // Remove redundant whitespace and newlines
      const optimizedContent = content
        .toString()
        .replace(/\s+/g, ' ')
        .replace(/(\w)\s+(\w)/g, '$1 $2')
        .trim();
      
      content.set(optimizedContent);
    }
  }
}