export const ROUTES = {
  HOME: '/',
  PDF: {
    ROOT: '/tools/pdf',
    MERGER: '/tools/pdf/merger',
    COMPRESSOR: '/tools/pdf/compressor',
    CONVERTER: '/tools/pdf/to-word'
  },
  IMAGE: {
    ROOT: '/tools/image',
    COMPRESSOR: '/tools/image/compressor',
    CONVERTER: '/tools/image/converter',
    RESIZER: '/tools/image/resizer'
  },
  TEXT: {
    ROOT: '/tools/text',
    FORMATTER: '/tools/text/formatter',
    COUNTER: '/tools/text/counter',
    DIFF: '/tools/text/diff'
  }
} as const;