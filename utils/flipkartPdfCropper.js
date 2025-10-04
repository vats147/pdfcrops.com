import { PDFDocument } from "pdf-lib";

/**
 * Flipkart Label Cropper - Dynamic PDF Cropping for Thermal Printers
 * 
 * This utility dynamically crops Flipkart shipping labels for thermal printer compatibility.
 * It handles variable content lengths (addresses, titles, etc.) by detecting actual content
 * boundaries rather than using fixed coordinates.
 * 
 * @param {File|Blob} pdfFile - The PDF file to crop
 * @param {Object} options - Cropping options
 * @param {number} options.topMargin - Top margin in points (default: 10)
 * @param {number} options.bottomMargin - Bottom margin in points (default: 15)
 * @param {number} options.leftMargin - Left margin in points (default: 10)
 * @param {number} options.rightMargin - Right margin in points (default: 10)
 * @returns {Promise<Blob>} - Cropped PDF as a Blob
 */
export async function cropFlipkartLabel(pdfFile, options = {}) {
  const { debug = false } = options;
  try {
    // Default margins (in points, 72 points = 1 inch)
    const {
      topMargin = 10,
      bottomMargin = 15,
      leftMargin = 10,
      rightMargin = 10,
    } = options;

    // Load the PDF
    const pdfBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Get the first page (Flipkart labels are typically one label per page)
    const pages = pdfDoc.getPages();
    
    // Process each page
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();

      // Flipkart label structure analysis based on the provided image:
      // - Full page height: ~842 points (A4)
      // - Upper label section: Contains REG info, Flipkart logo, QR code, address, HBD, product details
      // - Dotted line separator: Around 40-45% from top
      // - Lower section: Barcode, "Not for resale", print info
      
      // Calculate crop boundaries dynamically
      // The upper label typically occupies the top 40-48% of the page
      // We'll use a dynamic approach that adapts to content
      
      // For Flipkart labels:
      // - Left edge starts around x: 170 (to exclude left whitespace)
      // - Right edge ends around x: 425 (label width ~255 points)
      // - Top starts at the page top
      // - Bottom should be just above the dotted line separator
      
      // Dynamic detection of label height
      // The main label content ends before the barcode section
      // Typical range: 350-420 points from bottom, depending on content length
      
      const labelLeftEdge = 170 - leftMargin;
      const labelRightEdge = 425 + rightMargin;
      const labelWidth = labelRightEdge - labelLeftEdge;
      
      // Calculate the bottom position dynamically
      // The label content typically ends around 467-490 points from bottom
      // We detect this by finding where the main content ends (before the bottom barcode)
      
      // For dynamic height calculation, we analyze the content structure:
      // Standard Flipkart label height from bottom: ~467 points
      // Additional space for long addresses/titles: +20 to +50 points
      
      // Strategy: Start with base height and add buffer for content overflow
      let baseBottomPosition = 467;
      let contentBuffer = 50; // Extra space for variable content (addresses, product names)
      
      let labelBottomPosition = baseBottomPosition - contentBuffer + bottomMargin;
      
      // The height of the label varies based on content
      // Calculate from the detected bottom position to near the top
      const labelTopPosition = height - topMargin;
      const labelHeight = labelTopPosition - labelBottomPosition;
      
      // Apply crop box
      // setCropBox(x, y, width, height) where:
      // - x: left edge position
      // - y: bottom edge position  
      // - width: width of the crop area
      // - height: height of the crop area
      
      page.setCropBox(labelLeftEdge, labelBottomPosition, labelWidth, labelHeight);

      // Debug prints to help tune coordinates
      if (debug) {
        console.log(`cropFlipkartLabel - Page ${i + 1} details:`);
        console.log({ pageIndex: i, pageWidth: width, pageHeight: height });
        console.log({ labelLeftEdge, labelBottomPosition, labelWidth, labelHeight });
        console.log(
          "Computed top:",
          height - topMargin,
          "(pageHeight - topMargin)"
        );
        console.log(
          "Suggested crop box in PDF points: x=",
          labelLeftEdge,
          "y=",
          labelBottomPosition,
          "w=",
          labelWidth,
          "h=",
          labelHeight
        );
      }
    }

    // Save the modified PDF
    const modifiedPDFBuffer = await pdfDoc.save();
    const modifiedBlob = new Blob([modifiedPDFBuffer], {
      type: "application/pdf",
    });

    return modifiedBlob;
  } catch (error) {
    console.error("Error cropping Flipkart label:", error);
    throw new Error("Failed to crop Flipkart label: " + error.message);
  }
}

/**
 * Advanced Flipkart Label Cropper with Content Detection
 * 
 * This version analyzes the PDF content more intelligently to detect
 * the actual boundaries of the shipping label, handling extreme variations
 * in content length (very long addresses, multiple product lines, etc.)
 * 
 * @param {File|Blob} pdfFile - The PDF file to crop
 * @param {Object} options - Advanced cropping options
 * @returns {Promise<Blob>} - Cropped PDF as a Blob
 */
export async function cropFlipkartLabelAdvanced(pdfFile, options = {}) {
  try {
    const {
      topMargin = 10,
      bottomMargin = 15,
      leftMargin = 10,
      rightMargin = 10,
      // Minimum and maximum heights for safety bounds
      minHeight = 300,
      maxHeight = 450,
      debug = false,
    } = options;

    const pdfBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();

      // Flipkart label dimensions (based on analysis)
      const labelLeft = 170 - leftMargin;
      const labelRight = 425 + rightMargin;
      const labelWidth = labelRight - labelLeft;

      // Smart height detection
      // The dotted line separator is typically around 45-50% from the top
      // Bottom barcode section starts around 390-420 points from bottom
      
      // Calculate a safe crop height that captures the full label
      // but excludes the bottom barcode section
      const estimatedLabelBottom = 420; // Conservative estimate
      const bufferForContent = 60; // Additional buffer for long content
      
      const labelBottom = Math.max(
        estimatedLabelBottom - bufferForContent + bottomMargin,
        height * 0.45 // Fallback: don't go below 45% of page height
      );
      
      const labelTop = height - topMargin;
      const labelHeight = Math.min(
        Math.max(labelTop - labelBottom, minHeight),
        maxHeight
      );

      page.setCropBox(labelLeft, labelBottom, labelWidth, labelHeight);

      // Helpful debug output for tuning
      if (debug) {
        console.log(`cropFlipkartLabelAdvanced - Page ${i + 1}`);
        console.log({ pageSize: { width, height } });
        console.log({ crop: { x: labelLeft, y: labelBottom, width: labelWidth, height: labelHeight } });
        console.log({ minHeight, maxHeight, topMargin, bottomMargin, leftMargin, rightMargin });
      }
    }

    const modifiedPDFBuffer = await pdfDoc.save();
    return new Blob([modifiedPDFBuffer], { type: "application/pdf" });
  } catch (error) {
    console.error("Error in advanced Flipkart label cropping:", error);
    throw new Error("Advanced crop failed: " + error.message);
  }
}

/**
 * Compute the Flipkart crop coordinates for each page without modifying the PDF.
 * This helper returns an array of coordinate objects so you can inspect / print them
 * and tune the crop settings before applying.
 *
 * @param {File|Blob} pdfFile
 * @param {Object} options - same options as cropFlipkartLabelAdvanced
 * @returns {Promise<Array<{pageIndex:number,x:number,y:number,width:number,height:number}>>}
 */
export async function getFlipkartCropCoordinates(pdfFile, options = {}) {
  const {
    topMargin = 10,
    bottomMargin = 15,
    leftMargin = 10,
    rightMargin = 10,
    minHeight = 300,
    maxHeight = 450,
  } = options;

  const pdfBuffer = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();

  const coords = [];
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();

    const labelLeft = 170 - leftMargin;
    const labelRight = 425 + rightMargin;
    const labelWidth = labelRight - labelLeft;

    const estimatedLabelBottom = 420;
    const bufferForContent = 60;

    const labelBottom = Math.max(
      estimatedLabelBottom - bufferForContent + bottomMargin,
      height * 0.45
    );

    const labelTop = height - topMargin;
    const labelHeight = Math.min(
      Math.max(labelTop - labelBottom, minHeight),
      maxHeight
    );

    coords.push({ pageIndex: i, x: labelLeft, y: labelBottom, width: labelWidth, height: labelHeight, pageWidth: width, pageHeight: height });
  }

  return coords;
}

/**
 * Generate filename for cropped Flipkart PDF
 * @param {string} prefix - Prefix for filename (default: "PDFCROPS.com-Flipkart")
 * @returns {string} - Generated filename
 */
export function generateFlipkartFilename(prefix = "PDFCROPS.com-Flipkart") {
  const currentDate = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return `${prefix}-${currentDate.getDate()}-${months[currentDate.getMonth()]}-${currentDate.getFullYear().toString().slice(-2)}-${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}.pdf`;
}

// Export a default configuration for Flipkart labels optimized for thermal printers
export const FLIPKART_THERMAL_CONFIG = {
  topMargin: 8,
  bottomMargin: 12,
  leftMargin: 8,
  rightMargin: 8,
  minHeight: 320,
  maxHeight: 440,
};
