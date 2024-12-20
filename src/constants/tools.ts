import { FileText, Image, Type, FilePlus, FileOutput, FileDown, Images, ImagePlus, ImageDown, AlignLeft, Hash, GitCompare } from 'lucide-react';
import { ROUTES } from './routes';

export const mainTools = [
  {
    id: 'pdf-tools',
    icon: FileText,
    title: 'PDF Tools',
    description: 'Convert, compress, merge and split PDF files with ease',
    path: ROUTES.PDF.ROOT
  },
  {
    id: 'image-tools',
    icon: Image,
    title: 'Image Tools',
    description: 'Compress, resize, and convert images between formats',
    path: ROUTES.IMAGE.ROOT
  },
  {
    id: 'text-tools',
    icon: Type,
    title: 'Text Tools',
    description: 'Format, convert, and analyze text content',
    path: ROUTES.TEXT.ROOT
  }
] as const;

export const pdfTools = [
  {
    id: 'pdf-merger',
    title: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document quickly and easily',
    icon: FilePlus,
    path: ROUTES.PDF.MERGER
  },
  {
    id: 'pdf-compressor',
    title: 'PDF Compressor',
    description: 'Reduce PDF file size while maintaining quality',
    icon: FileOutput,
    path: ROUTES.PDF.COMPRESSOR
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF files to editable Word documents',
    icon: FileDown,
    path: ROUTES.PDF.CONVERTER
  }
] as const;

export const imageTools = [
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description: 'Compress images without losing quality. Supports JPG, PNG, WebP formats',
    icon: Image,
    path: ROUTES.IMAGE.COMPRESSOR
  },
  {
    id: 'image-converter',
    title: 'Image Converter',
    description: 'Convert images between different formats with ease',
    icon: Images,
    path: ROUTES.IMAGE.CONVERTER
  },
  {
    id: 'image-resizer',
    title: 'Image Resizer',
    description: 'Resize images to exact dimensions while preserving quality',
    icon: ImagePlus,
    path: ROUTES.IMAGE.RESIZER
  }
] as const;

export const textTools = [
  {
    id: 'text-formatter',
    title: 'Text Formatter',
    description: 'Format and beautify text with various styling options',
    icon: AlignLeft,
    path: ROUTES.TEXT.FORMATTER
  },
  {
    id: 'text-counter',
    title: 'Word Counter',
    description: 'Count words, characters, and paragraphs in your text',
    icon: Hash,
    path: ROUTES.TEXT.COUNTER
  },
  {
    id: 'text-diff',
    title: 'Text Compare',
    description: 'Compare two texts and find the differences',
    icon: GitCompare,
    path: ROUTES.TEXT.DIFF
  }
] as const;