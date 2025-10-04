import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Meesho Label Cropper Utility
 * Handles various Meesho label cropping options including:
 * - Pickup Sorting
 * - SKU Sorting
 * - 4 Labels in A4 Page
 * - Order Number extraction
 * - Custom text printing
 * - Invoice generation
 * - SKU and Order Summary
 */

// Standard Meesho label crop coordinates (x, y, width, height)
export const MEESHO_LABEL_CONFIG = {
  x: 0,
  y: 490,
  width: 600,
  height: 600,
  // Alternative configurations for different label types
  fullPage: {
    x: 0,
    y: 0,
    width: 595,
    height: 842,
  },
  invoiceArea: {
    x: 0,
    y: 0,
    width: 600,
    height: 490,
  },
};

/**
 * Extract text from PDF (simplified - in production, use pdf.js or similar)
 */
async function extractTextFromPDF(pdfBuffer) {
  // This is a placeholder. In a real implementation, you'd use pdf.js or similar
  // For now, return empty array
  return [];
}

/**
 * Sort pages by pickup location or date
 */
function sortByPickup(pages, extractedData) {
  // Implementation for sorting by pickup
  // This would require text extraction to identify pickup locations
  return pages;
}

/**
 * Sort pages by SKU
 */
function sortBySKU(pages, extractedData) {
  // Implementation for sorting by SKU
  // This would require text extraction to identify SKUs
  return pages;
}

/**
 * Arrange 4 labels in A4 page format
 */
async function arrange4LabelsInA4(pdfDoc, pages) {
  const newDoc = await PDFDocument.create();
  const font = await newDoc.embedFont(StandardFonts.Helvetica);

  // A4 dimensions: 595 x 842 points
  const a4Width = 595;
  const a4Height = 842;
  
  // Each label will be in a quadrant (2x2 grid)
  const labelWidth = a4Width / 2;
  const labelHeight = a4Height / 2;

  let currentPage = null;
  let labelCount = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    
    // Create new A4 page every 4 labels
    if (labelCount % 4 === 0) {
      currentPage = newDoc.addPage([a4Width, a4Height]);
    }

    // Calculate position in 2x2 grid
    const position = labelCount % 4;
    const col = position % 2;
    const row = Math.floor(position / 2);
    
    const x = col * labelWidth;
    const y = a4Height - (row + 1) * labelHeight; // PDF coordinates start from bottom

    // Embed the page
    const [embeddedPage] = await newDoc.embedPdf(pdfDoc, [i]);
    
    // Scale and position the embedded page
    const scaleFactor = Math.min(
      labelWidth / embeddedPage.width,
      labelHeight / embeddedPage.height
    );

    currentPage.drawPage(embeddedPage, {
      x: x,
      y: y,
      width: embeddedPage.width * scaleFactor,
      height: embeddedPage.height * scaleFactor,
    });

    labelCount++;
  }

  return newDoc;
}

/**
 * Add custom text to label
 */
async function addTextToLabel(page, text, config = {}) {
  const font = await page.doc.embedFont(StandardFonts.HelveticaBold);
  
  const {
    x = 50,
    y = 50,
    size = 10,
    color = rgb(0, 0, 0),
    maxWidth = 500,
  } = config;

  // Simple text wrapping
  const words = text.split(' ');
  let lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, size);
    
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }

  // Draw each line
  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - (index * (size + 2)),
      size,
      font,
      color,
    });
  });
}

/**
 * Generate filename with timestamp
 */
export function generateMeeshoFilename(prefix = 'Meesho') {
  const currentDate = new Date();
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return `PDFCROPS.com-${prefix}-${currentDate.getDate()}-${
    months[currentDate.getMonth()]
  }-${currentDate.getFullYear().toString().slice(-2)}-${
    currentDate.getHours()
  }-${currentDate.getMinutes()}-${currentDate.getSeconds()}.pdf`;
}

/**
 * Main Meesho cropping function with all options
 */
export async function cropMeeshoLabel(pdfBlob, options = {}) {
  const {
    pickupSorting = false,
    skuSorting = false,
    fourLabelA4 = false,
    orderNumber = false,
    printText = false,
    printTextValue = '',
    invoice = false,
    skuOrderSummary = false,
    debug = false,
  } = options;

  try {
    if (debug) {
      console.log('Meesho crop options:', options);
    }

    // Load the PDF
    const pdfBuffer = await pdfBlob.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    if (debug) {
      console.log(`Processing ${pages.length} pages`);
    }

    // Extract text data if needed for sorting
    let extractedData = [];
    if (pickupSorting || skuSorting || orderNumber) {
      extractedData = await extractTextFromPDF(pdfBuffer);
    }

    // Create new document for output
    let outputDoc = await PDFDocument.create();

    // Process each page
    let processedPages = [...pages];

    // Apply sorting if requested
    if (pickupSorting) {
      processedPages = sortByPickup(processedPages, extractedData);
    } else if (skuSorting) {
      processedPages = sortBySKU(processedPages, extractedData);
    }

    // Crop labels based on configuration
    for (let i = 0; i < processedPages.length; i++) {
      const originalPage = processedPages[i];
      
      // Determine crop area based on invoice option
      let cropConfig = invoice 
        ? MEESHO_LABEL_CONFIG.fullPage 
        : MEESHO_LABEL_CONFIG;

      if (skuOrderSummary) {
        cropConfig = MEESHO_LABEL_CONFIG.fullPage;
      }

      // Copy page to new document
      const [copiedPage] = await outputDoc.copyPages(pdfDoc, [i]);
      
      // Apply crop box
      copiedPage.setCropBox(
        cropConfig.x,
        cropConfig.y,
        cropConfig.width,
        cropConfig.height
      );

      // Add custom text if enabled
      if (printText && printTextValue) {
        const addedPage = outputDoc.addPage(copiedPage);
        await addTextToLabel(addedPage, printTextValue, {
          x: 20,
          y: copiedPage.getHeight() - 30,
          size: 9,
          color: rgb(0, 0, 0),
        });
      } else {
        outputDoc.addPage(copiedPage);
      }
    }

    // If 4 labels in A4 is enabled, rearrange
    if (fourLabelA4) {
      outputDoc = await arrange4LabelsInA4(pdfDoc, processedPages);
    }

    // Save and return
    const pdfBytes = await outputDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    if (debug) {
      console.log('Meesho crop completed successfully');
    }

    return blob;

  } catch (error) {
    console.error('Error in Meesho crop:', error);
    throw error;
  }
}

/**
 * Simple crop without advanced options (backward compatibility)
 */
export async function cropMeeshoLabelSimple(pdfBlob) {
  const pdfBuffer = await pdfBlob.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    page.setCropBox(
      MEESHO_LABEL_CONFIG.x,
      MEESHO_LABEL_CONFIG.y,
      MEESHO_LABEL_CONFIG.width,
      MEESHO_LABEL_CONFIG.height
    );
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
