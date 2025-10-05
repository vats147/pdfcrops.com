import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker with better error handling
if (typeof window !== 'undefined') {
  const pdfjsVersion = pdfjsLib.version || '3.11.174';
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
  console.log('PDF.js worker configured:', pdfjsLib.GlobalWorkerOptions.workerSrc);
}

const AnimatedPDFPreview = ({ pdfFile, platform, onCropComplete, onDelete }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Platform-specific crop coordinates (same as Flipkart thermal config)
  const getCropCoordinates = (platform) => {
    const coords = {
      'Flipkart': { x: 0, y: 490, width: 600, height: 600 },
      'Meesho': { x: 0, y: 490, width: 600, height: 600 },
      'Amazon': { x: 0, y: 400, width: 600, height: 700 },
      'GlowRoad': { x: 0, y: 450, width: 600, height: 650 },
    };
    return coords[platform] || { x: 0, y: 490, width: 600, height: 600 };
  };

  const cropCoords = getCropCoordinates(platform);

  // Render first page of PDF
  const renderPDFPreview = async () => {
    if (!pdfFile || !canvasRef.current) {
      console.log('Missing pdfFile or canvas:', { pdfFile: !!pdfFile, canvas: !!canvasRef.current });
      return;
    }

    try {
      console.log('Starting PDF render, file type:', pdfFile.type, 'size:', pdfFile.size);
      
      // Convert File/Blob to ArrayBuffer
      const arrayBuffer = await pdfFile.arrayBuffer();
      console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);
      
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      console.log('PDF loaded, pages:', pdf.numPages);
      
      const page = await pdf.getPage(1);
      console.log('First page loaded');

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Scale to fit container width
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      setDimensions({ width: viewport.width, height: viewport.height });

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      console.log('PDF rendered successfully');
      setShowPreview(true);
    } catch (error) {
      console.error('Error rendering PDF preview:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        pdfFile: pdfFile ? { name: pdfFile.name, type: pdfFile.type, size: pdfFile.size } : null
      });
      // Still show something even if there's an error
      setShowPreview(true);
    }
  };

  // Trigger animation
  const startCropAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (onCropComplete) onCropComplete();
    }, 2500);
  };

  useEffect(() => {
    console.log('useEffect triggered, pdfFile:', pdfFile ? 'exists' : 'null', 'platform:', platform);
    
    if (pdfFile) {
      // Reset state
      setShowPreview(false);
      
      // Add a small delay to ensure canvas is ready
      const timer = setTimeout(() => {
        renderPDFPreview();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pdfFile, platform]);

  if (!showPreview) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-500 font-medium">Loading PDF preview...</p>
          <p className="text-xs text-gray-400 mt-2">Platform: {platform}</p>
        </div>
        {/* Hidden canvas for rendering */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    );
  }

  const cropX = (cropCoords.x / dimensions.width) * 100;
  const cropY = (cropCoords.y / dimensions.height) * 100;
  const cropW = (cropCoords.width / dimensions.width) * 100;
  const cropH = (cropCoords.height / dimensions.height) * 100;

  return (
    <div className="w-full flex flex-col items-center space-y-4 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      {/* Header with filename and delete button */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{pdfFile.name || 'PDF Preview'}</h3>
            <p className="text-sm text-gray-500">{(pdfFile.size / 1024).toFixed(2)} KB</p>
          </div>
        </div>
        
        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="group flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Delete</span>
        </button>
      </div>

      {/* Preview Container */}
      <div 
        ref={containerRef}
        className="relative w-full bg-white rounded-lg overflow-hidden border-2 border-gray-200"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-auto block bg-white"
        />
        
        {/* Overlay with dimmed background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Dark overlay everywhere except crop area - only during animation */}
          {isAnimating && (
            <div 
              className="absolute inset-0 transition-opacity duration-1000 opacity-70"
              style={{
                background: `
                  linear-gradient(to bottom,
                    rgba(0,0,0,0.85) 0%,
                    rgba(0,0,0,0.85) ${cropY}%,
                    transparent ${cropY}%,
                    transparent ${cropY + cropH}%,
                    rgba(0,0,0,0.85) ${cropY + cropH}%,
                    rgba(0,0,0,0.85) 100%)
                `,
              }}
            />
          )}
          
          {/* Animated crop borders */}
          {isAnimating && (
            <>
              {/* Top border */}
              <div
                className="absolute bg-gradient-to-r from-green-400 via-green-500 to-green-400 shadow-lg animate-slide-in-top"
                style={{
                  left: `${cropX}%`,
                  top: `${cropY}%`,
                  width: `${cropW}%`,
                  height: '4px',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
                }}
              />
              
              {/* Bottom border */}
              <div
                className="absolute bg-gradient-to-r from-green-400 via-green-500 to-green-400 shadow-lg animate-slide-in-bottom"
                style={{
                  left: `${cropX}%`,
                  top: `${cropY + cropH}%`,
                  width: `${cropW}%`,
                  height: '4px',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
                }}
              />
              
              {/* Left border */}
              <div
                className="absolute bg-gradient-to-b from-green-400 via-green-500 to-green-400 shadow-lg animate-slide-in-left"
                style={{
                  left: `${cropX}%`,
                  top: `${cropY}%`,
                  width: '4px',
                  height: `${cropH}%`,
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
                }}
              />
              
              {/* Right border */}
              <div
                className="absolute bg-gradient-to-b from-green-400 via-green-500 to-green-400 shadow-lg animate-slide-in-right"
                style={{
                  left: `${cropX + cropW}%`,
                  top: `${cropY}%`,
                  width: '4px',
                  height: `${cropH}%`,
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
                }}
              />

              {/* Corner markers */}
              {[
                { x: cropX, y: cropY },
                { x: cropX + cropW, y: cropY },
                { x: cropX, y: cropY + cropH },
                { x: cropX + cropW, y: cropY + cropH },
              ].map((corner, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6 bg-green-500 rounded-full animate-ping"
                  style={{
                    left: `${corner.x}%`,
                    top: `${corner.y}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 30px rgba(34, 197, 94, 0.9)',
                  }}
                />
              ))}
            </>
          )}

          {/* Static crop indicator after animation - just show the border without dark overlay */}
          {!isAnimating && (
            <div
              className="absolute border-4 border-green-500 transition-all duration-500"
              style={{
                left: `${cropX}%`,
                top: `${cropY}%`,
                width: `${cropW}%`,
                height: `${cropH}%`,
              }}
            >
              <div className="absolute -top-10 left-0 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                ✂️ Crop Area: {cropCoords.width}×{cropCoords.height}px
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auto Crop Button */}
      <button
        onClick={startCropAnimation}
        disabled={isAnimating}
        className={`group w-full py-4 rounded-lg font-bold text-lg text-white transition-all duration-300 transform ${
          isAnimating
            ? 'bg-gray-400 cursor-not-allowed scale-95'
            : 'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 hover:scale-105 hover:shadow-xl active:scale-95'
        }`}
      >
        {isAnimating ? (
          <span className="flex items-center justify-center space-x-3">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Cropping Animation...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center space-x-2">
            <span>✨ Show Crop Animation</span>
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        )}
      </button>

      {/* Info box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg w-full">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-700">
            <p className="font-semibold mb-1">Preview for {platform} labels</p>
            <p>Click "Show Crop Animation" to see how your PDF will be cropped. The bright area shows what will be kept.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedPDFPreview;

