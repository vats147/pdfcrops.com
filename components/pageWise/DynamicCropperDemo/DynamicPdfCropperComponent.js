/**
 * Dynamic PDF Cropper Component
 * 
 * A React component demonstrating how to use the dynamic PDF cropping utility.
 * This component allows users to upload a PDF, automatically detect dashed lines,
 * and crop the document accordingly.
 */

import React, { useState } from 'react';
import { 
  cropPdfByDashedLineBrowser, 
  previewDashedLineDetection,
  downloadCroppedPdf,
  BROWSER_CROP_PRESETS 
} from '@/utils/browserDynamicCropper';

export default function DynamicPdfCropperComponent() {
  const [pdfFile, setPdfFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [croppedPdfUrl, setCroppedPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  
  const [options, setOptions] = useState({
    cropAboveLine: true,
    topMargin: 10,
    bottomMargin: 10,
    leftMargin: 10,
    rightMargin: 10,
    minDashLength: 50,
    useTextMarkers: true,
    debug: true,
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError(null);
      setCroppedPdfUrl(null);
      setDetectionResult(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handlePreview = async () => {
    if (!pdfFile) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      const result = await previewDashedLineDetection(pdfFile, options);
      setDetectionResult(result);
      console.log('Detection result:', result);
    } catch (err) {
      setError('Failed to analyze PDF: ' + err.message);
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleCrop = async () => {
    if (!pdfFile) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      const croppedBlob = await cropPdfByDashedLineBrowser(pdfFile, options);
      
      // Create URL for preview
      const url = URL.createObjectURL(croppedBlob);
      setCroppedPdfUrl(url);
      
    } catch (err) {
      setError('Failed to crop PDF: ' + err.message);
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (croppedPdfUrl) {
      const a = document.createElement('a');
      a.href = croppedPdfUrl;
      a.download = `cropped-${pdfFile?.name || 'document.pdf'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const applyPreset = (presetName) => {
    setOptions({ ...BROWSER_CROP_PRESETS[presetName], debug: true });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Dynamic PDF Cropper</h2>
        <p className="text-gray-600 mb-6">
          Upload a PDF with a dashed line separator. This tool will automatically detect 
          the line and crop the content above or below it.
        </p>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select PDF File
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Preset Buttons */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Presets
          </label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => applyPreset('SHIPPING_LABEL')}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 text-sm font-medium"
            >
              📦 Shipping Label
            </button>
            <button
              onClick={() => applyPreset('RECEIPT')}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm font-medium"
            >
              🧾 Receipt
            </button>
            <button
              onClick={() => applyPreset('CUSTOM')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
            >
              ⚙️ Custom
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Crop Direction
            </label>
            <select
              value={options.cropAboveLine ? 'above' : 'below'}
              onChange={(e) => setOptions({ ...options, cropAboveLine: e.target.value === 'above' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="above">Keep content above line</option>
              <option value="below">Keep content below line</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Dash Length (px)
            </label>
            <input
              type="number"
              value={options.minDashLength}
              onChange={(e) => setOptions({ ...options, minDashLength: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Top Margin
            </label>
            <input
              type="number"
              value={options.topMargin}
              onChange={(e) => setOptions({ ...options, topMargin: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bottom Margin
            </label>
            <input
              type="number"
              value={options.bottomMargin}
              onChange={(e) => setOptions({ ...options, bottomMargin: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Left Margin
            </label>
            <input
              type="number"
              value={options.leftMargin}
              onChange={(e) => setOptions({ ...options, leftMargin: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Right Margin
            </label>
            <input
              type="number"
              value={options.rightMargin}
              onChange={(e) => setOptions({ ...options, rightMargin: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.useTextMarkers}
              onChange={(e) => setOptions({ ...options, useTextMarkers: e.target.checked })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              Use text markers as fallback (e.g., "---", "cut here")
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handlePreview}
            disabled={!pdfFile || processing}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            {processing ? '🔍 Analyzing...' : '🔍 Preview Detection'}
          </button>
          
          <button
            onClick={handleCrop}
            disabled={!pdfFile || processing}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            {processing ? '✂️ Cropping...' : '✂️ Crop PDF'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">❌ {error}</p>
          </div>
        )}

        {/* Detection Results */}
        {detectionResult && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-semibold text-blue-900 mb-2">Detection Results:</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>📄 Page Size: {detectionResult.pageInfo.width.toFixed(1)} × {detectionResult.pageInfo.height.toFixed(1)} pts</p>
              <p>📏 Dashed Lines Found: {detectionResult.dashedLines.length}</p>
              {detectionResult.dashedLines.map((line, idx) => (
                <p key={idx} className="ml-4">
                  • Line {idx + 1}: Y={line.y.toFixed(2)}, Length={line.length.toFixed(2)}px
                </p>
              ))}
              <p>📝 Text Markers Found: {detectionResult.textMarkers.length}</p>
              {detectionResult.textMarkers.map((marker, idx) => (
                <p key={idx} className="ml-4">
                  • "{marker.text}" at Y={marker.y.toFixed(2)}
                </p>
              ))}
            </div>
            <p className="text-xs text-blue-600 mt-2">
              💡 Check browser console for detailed logs
            </p>
          </div>
        )}

        {/* Preview Cropped PDF */}
        {croppedPdfUrl && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Cropped PDF Preview:</h3>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm"
              >
                ⬇️ Download
              </button>
            </div>
            <iframe
              src={croppedPdfUrl}
              className="w-full h-96 border border-gray-300 rounded-md"
              title="Cropped PDF Preview"
            />
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">How It Works:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Upload your PDF file with a dashed line separator</li>
          <li>The tool analyzes the PDF drawing operations to detect dashed lines automatically</li>
          <li>If no dashed line is found, it searches for text markers like "---" or "cut here"</li>
          <li>The PDF is cropped based on the detected line position</li>
          <li>Download the cropped result or preview it in the browser</li>
        </ol>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>💡 Tip:</strong> Use "Preview Detection" first to see what lines were detected 
            before cropping. This helps you adjust margins and settings for optimal results.
          </p>
        </div>
      </div>
    </div>
  );
}
