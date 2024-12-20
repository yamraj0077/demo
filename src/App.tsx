import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PDFToolsPage from './pages/categories/pdf/PDFToolsPage';
import PDFMergerPage from './pages/tools/pdf/PDFMergerPage';
import PDFCompressorPage from './pages/tools/pdf/PDFCompressorPage';
import PDFToWordPage from './pages/tools/pdf/PDFToWordPage';
import ImageToolsPage from './pages/categories/image/ImageToolsPage';
import ImageCompressorPage from './pages/tools/image/ImageCompressorPage';
import ImageConverterPage from './pages/tools/image/ImageConverterPage';
import ImageResizerPage from './pages/tools/image/ImageResizerPage';
import TextToolsPage from './pages/categories/text/TextToolsPage';
import TextFormatterPage from './pages/tools/text/TextFormatterPage';
import TextCounterPage from './pages/tools/text/TextCounterPage';
import TextDiffPage from './pages/tools/text/TextDiffPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* PDF Tools */}
              <Route path="/tools/pdf" element={<PDFToolsPage />} />
              <Route path="/tools/pdf/merger" element={<PDFMergerPage />} />
              <Route path="/tools/pdf/compressor" element={<PDFCompressorPage />} />
              <Route path="/tools/pdf/to-word" element={<PDFToWordPage />} />
              
              {/* Image Tools */}
              <Route path="/tools/image" element={<ImageToolsPage />} />
              <Route path="/tools/image/compressor" element={<ImageCompressorPage />} />
              <Route path="/tools/image/converter" element={<ImageConverterPage />} />
              <Route path="/tools/image/resizer" element={<ImageResizerPage />} />
              
              {/* Text Tools */}
              <Route path="/tools/text" element={<TextToolsPage />} />
              <Route path="/tools/text/formatter" element={<TextFormatterPage />} />
              <Route path="/tools/text/counter" element={<TextCounterPage />} />
              <Route path="/tools/text/diff" element={<TextDiffPage />} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;