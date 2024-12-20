import { PDFDocument } from 'pdf-lib';

export async function optimizeFonts(pdfDoc: PDFDocument): Promise<void> {
  const pages = pdfDoc.getPages();
  
  for (const page of pages) {
    const fonts = await page.node.Resources().lookup('Font', true);
    if (!fonts) continue;

    for (const [name, font] of Object.entries(fonts.dict)) {
      try {
        // Subset fonts to only include used characters
        if (font.Subtype === 'TrueType' || font.Subtype === 'Type1') {
          font.subset = true;
        }
      } catch (error) {
        console.warn('Font optimization failed:', error);
      }
    }
  }
}