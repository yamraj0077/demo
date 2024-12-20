import { PDFDocument } from 'pdf-lib';

export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  // Create a new PDF document
  const mergedPdf = await PDFDocument.create();
  
  // Process each PDF file
  for (const file of files) {
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Copy all pages
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    
    // Add each page to the new document
    pages.forEach(page => mergedPdf.addPage(page));
  }
  
  // Save the merged PDF
  return await mergedPdf.save();
}

export function downloadPDF(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}