import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function PDFtoJPG() {
  console.log('PDFtoJPG component rendering');
  
  const [pdfFile, setPdfFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [jpgImages, setJpgImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const fileInputRef = useRef(null);

  // Set up PDF.js worker
  useEffect(() => {
    const pdfjsVersion = pdfjsLib.version || '3.11.174';
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
    console.log('PDF.js initialized');
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setConversionComplete(false);
      setJpgImages([]);
      setProgress(0);
      setTotalPages(0);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setConversionComplete(false);
      setJpgImages([]);
      setProgress(0);
      setTotalPages(0);
    }
  };

  const convertPDFtoJPG = async () => {
    if (!pdfFile) return;

    setIsConverting(true);
    setProgress(0);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      setTotalPages(numPages);

      const images = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        // Convert canvas to blob
        const blob = await new Promise((resolve) => {
          canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.95);
        });

        images.push({
          blob: blob,
          name: `page_${pageNum}.jpg`,
          url: URL.createObjectURL(blob),
        });

        setProgress(Math.round((pageNum / numPages) * 100));
      }

      setJpgImages(images);
      setConversionComplete(true);
    } catch (error) {
      console.error('Error converting PDF to JPG:', error);
      alert('Failed to convert PDF. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  // Download all images as ZIP
  const downloadAsZip = async () => {
    console.log('downloadAsZip called');

    if (jpgImages.length === 0) {
      console.log('No images to download');
      return;
    }

    try {
      console.log(`Creating ZIP with ${jpgImages.length} images`);
      const zip = new JSZip();
      
      // Add each image to the ZIP
      for (let i = 0; i < jpgImages.length; i++) {
        const image = jpgImages[i];
        console.log(`Adding image ${i + 1} to ZIP:`, image.name);
        zip.file(image.name, image.blob);
      }

      // Generate ZIP file
      console.log('Generating ZIP file...');
      const content = await zip.generateAsync({ type: 'blob' });
      console.log('ZIP file generated, size:', content.size);
      
      // Download the ZIP
      saveAs(content, 'pdf-pages.zip');
      console.log('Download triggered');
    } catch (error) {
      console.error('Error creating ZIP:', error);
      console.error('Error stack:', error.stack);
      alert('Failed to create ZIP file. Error: ' + error.message);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setConversionComplete(false);
    setJpgImages([]);
    setProgress(0);
    setTotalPages(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Head>
        <title>PDF to JPG Converter - Convert PDF to Images Online Free | PDFCrops</title>
        <meta 
          name="description" 
          content="Free online PDF to JPG converter. Convert PDF pages to high-quality JPG images instantly. Download all images in ZIP format. Fast, secure, and no registration required." 
        />
        <meta 
          name="keywords" 
          content="PDF to JPG, PDF to Image, convert PDF to JPG, PDF converter, PDF to JPEG, online PDF converter, free PDF converter, PDF to JPG online, PDF to image converter, batch PDF converter, PDF to picture, extract images from PDF" 
        />
        <meta property="og:title" content="PDF to JPG Converter - Convert PDF to Images Online Free" />
        <meta property="og:description" content="Convert PDF pages to high-quality JPG images instantly. Download all images in ZIP format. Fast, secure, and works in your browser." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF to JPG Converter - Free Online Tool" />
        <meta name="twitter:description" content="Convert PDF pages to high-quality JPG images. Download all images in ZIP format. 100% secure and free." />
        <link rel="canonical" href="https://pdfcrops.com/tools/pdf-to-jpg" />
      </Head>
      
      <BaseOneLayout>
        <div className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 min-h-[80vh]">
          <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              PDF to JPG Converter
            </h1>
            <p className="text-xl text-gray-600">
              Convert your PDF pages to high-quality JPG images
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Download all images in a convenient ZIP file
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            {!pdfFile ? (
              /* Upload Area */
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="relative border-3 border-dashed border-blue-300 rounded-xl p-16 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <svg
                      className="w-24 h-24 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-700 mb-2">
                      Drop your PDF here
                    </p>
                    <p className="text-gray-500">
                      or click to browse from your computer
                    </p>
                  </div>
                  <div className="pt-4">
                    <span className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Select PDF File
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Conversion Area */
              <div className="space-y-6">
                {/* File Info */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-100 p-3 rounded-lg">
                        <svg
                          className="w-8 h-8 text-red-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {pdfFile.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {(pdfFile.size / 1024).toFixed(2)} KB
                          {totalPages > 0 && ` • ${totalPages} pages`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {isConverting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>Converting...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 relative overflow-hidden"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse" />
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-600">
                      Processing page {Math.ceil((progress / 100) * totalPages)} of {totalPages}
                    </p>
                  </div>
                )}

                {/* Preview Grid */}
                {conversionComplete && jpgImages.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-800">
                        Converted Images ({jpgImages.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                      {jpgImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                          <img
                            src={image.url}
                            alt={`Page ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-2 bg-white">
                            <p className="text-xs font-medium text-gray-700 truncate">
                              Page {index + 1}
                            </p>
                          </div>
                          <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                            <a
                              href={image.url}
                              download={image.name}
                              className="opacity-0 group-hover:opacity-100 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {!conversionComplete ? (
                    <button
                      onClick={convertPDFtoJPG}
                      disabled={isConverting}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                    >
                      {isConverting ? (
                        <>
                          <svg
                            className="animate-spin h-6 w-6"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Converting...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Convert to JPG</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleReset}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Convert Another PDF
                      </button>
                      <button
                        onClick={downloadAsZip}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        <span>Download ZIP</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Success Message */}
                {conversionComplete && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="text-sm text-green-700">
                        <p className="font-semibold mb-1">
                          ✨ Conversion Complete!
                        </p>
                        <p>
                          All {jpgImages.length} pages have been successfully converted to JPG images. Click "Download ZIP" to get all images in one file.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Fast Conversion
              </h3>
              <p className="text-gray-600 text-sm">
                Convert all PDF pages to high-quality JPG images in seconds
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                100% Secure
              </h3>
              <p className="text-gray-600 text-sm">
                All processing happens in your browser. Your files never leave your device
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                ZIP Download
              </h3>
              <p className="text-gray-600 text-sm">
                Download all converted images in a single convenient ZIP file
              </p>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Free Online PDF to JPG Converter
              </h2>
              <p className="text-gray-700 mb-4">
                Convert your PDF documents to high-quality JPG images with our free online PDF to JPG converter. 
                Our tool processes all conversions directly in your browser, ensuring complete privacy and security 
                for your documents. No file uploads to servers, no registration required.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
                How to Convert PDF to JPG
              </h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                <li>Upload your PDF file by clicking or dragging it into the upload area</li>
                <li>Click the "Convert to JPG" button to start the conversion process</li>
                <li>Preview all converted images in the gallery</li>
                <li>Download individual images or get all images in a ZIP file</li>
              </ol>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
                Why Choose Our PDF to JPG Converter?
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>100% Free:</strong> No hidden costs, no premium features - completely free forever</li>
                <li><strong>High Quality:</strong> Convert PDFs to JPG images at 2x resolution for crystal clear results</li>
                <li><strong>Batch Processing:</strong> Convert all pages from your PDF in one go</li>
                <li><strong>Secure & Private:</strong> All processing happens locally in your browser - your files never leave your device</li>
                <li><strong>No Registration:</strong> Start converting immediately without creating an account</li>
                <li><strong>ZIP Download:</strong> Download all converted images in a single convenient ZIP file</li>
                <li><strong>Fast Conversion:</strong> Powered by modern browser technology for lightning-fast processing</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6">
                Perfect For
              </h3>
              <p className="text-gray-700 mb-4">
                Our PDF to JPG converter is ideal for students, professionals, designers, and anyone who needs to 
                extract images from PDF files. Whether you need to convert presentation slides, scan documents, 
                create image galleries, or share PDF content on social media, our tool makes it simple and fast.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                <p className="text-blue-900 text-sm">
                  <strong>Pro Tip:</strong> Our converter maintains the aspect ratio and quality of your PDF pages, 
                  ensuring professional results every time. All images are converted at 95% JPEG quality for the 
                  perfect balance between file size and image clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </BaseOneLayout>
    </>
  );
}

export default PDFtoJPG;
