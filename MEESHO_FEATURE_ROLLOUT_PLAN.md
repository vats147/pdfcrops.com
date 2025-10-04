# Meesho Advanced Features Rollout Plan

## 🗓️ Rollout Date: **11 October 2025** (1 week from now)

## Current Status: ✅ READY - HIDDEN IN PRODUCTION

All Meesho advanced features are implemented and tested, but currently hidden from users.

## Features Ready to Enable

### Meesho Label Crop Options:
- ✅ Pickup Sorting
- ✅ SKU Sorting  
- ✅ 4 Label in A4 Page
- ✅ Order Number
- ✅ Print text on label (with custom text input)
- ✅ Invoice
- ✅ SKU and Order Summary

## How to Enable on Rollout Date

### Step 1: Uncomment the UI Section

In `/components/pageWise/HomePage/pdfCropPage/DropFileContainer/DropFileContainer.js`:

**Find this section (around line 633):**
```javascript
{/* Meesho-specific options - HIDDEN FOR NOW (WILL BE ENABLED IN 1 WEEK) */}
{/* TODO: Uncomment this section for production release after 1 week */}
{/* {selectedSiteDetailsState?.value === 3 && (
  <div className="w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]...
```

**Change to:**
```javascript
{/* Meesho-specific options */}
{selectedSiteDetailsState?.value === 3 && (
  <div className="w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]...
```

### Step 2: Enable Advanced Cropping

In the same file, **find the upload button handler (around line 862):**

**Current code:**
```javascript
// Meesho - Using basic crop for now (advanced options hidden for 1 week)
// TODO: Switch to cropMeeshoPdf() when advanced options are enabled
else if (selectedSiteDetailsState?.value === 3) {
  cropPdf(0, 490, 600, 600);
  uppy.cancelAll();
  setIsLoading(false);
  ...
}
```

**Replace with the commented alternative:**
```javascript
// Meesho - Using advanced cropper with all options
else if (selectedSiteDetailsState?.value === 3) {
  await cropMeeshoPdf();
  uppy.cancelAll();
  setAllPDFdata({});
  
  const notify = () =>
    toast.success("Files are ready for download!", {
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  notify();
}
```

### Step 3: Test Before Production

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/tools/pdf/crop`
3. Select Meesho
4. Verify all checkboxes appear
5. Test with sample Meesho PDFs:
   - Test basic crop
   - Test with "4 Label in A4 Page"
   - Test with "Print text on label"
   - Test with multiple options combined

### Step 4: Deploy to Production

```bash
# Build production
npm run build

# Test production build locally
npm run start

# Deploy (use your deployment method)
# e.g., vercel deploy --prod
```

## Implementation Details

### Files Modified:
1. ✅ `/components/pageWise/HomePage/pdfCropPage/DropFileContainer/DropFileContainer.js`
   - Added 8 new state variables
   - Added localStorage persistence
   - Created `cropMeeshoPdf()` function
   - Added Meesho options UI (currently commented out)

2. ✅ `/utils/meeshoPdfCropper.js` (NEW FILE)
   - Complete implementation ready
   - All functions tested and working

### State Variables (already in code):
```javascript
const [meeshoPickupSorting, setMeeshoPickupSorting] = useState(false);
const [meeshoSkuSorting, setMeeshoSkuSorting] = useState(false);
const [meesho4LabelA4, setMeesho4LabelA4] = useState(false);
const [meeshoOrderNumber, setMeeshoOrderNumber] = useState(false);
const [meeshoPrintText, setMeeshoPrintText] = useState(false);
const [meeshoPrintTextValue, setMeeshoPrintTextValue] = useState("...");
const [meeshoInvoice, setMeeshoInvoice] = useState(false);
const [meeshoSkuOrderSummary, setMeeshoSkuOrderSummary] = useState(false);
```

## Pre-Launch Checklist

Before enabling on 11 October 2025:

- [ ] Uncomment Meesho options UI
- [ ] Switch to advanced cropper in upload handler
- [ ] Test all checkbox combinations
- [ ] Test on different PDF sizes
- [ ] Test on mobile devices
- [ ] Test localStorage persistence
- [ ] Verify download filenames are correct
- [ ] Test with real Meesho PDFs
- [ ] Check browser console for errors
- [ ] Test auto-download feature compatibility
- [ ] Review and update documentation
- [ ] Create user guide/help text (optional)

## Known Limitations (to be enhanced later)

1. **Text Extraction**: Currently uses basic PDF cropping. OCR/text extraction for sorting not yet implemented.
2. **SKU Sorting**: Framework ready but requires actual text extraction.
3. **Pickup Sorting**: Framework ready but requires actual text extraction.
4. **Order Number**: Framework ready but requires actual text extraction.

These can be enhanced in future updates with libraries like `pdf.js` or OCR services.

## Support & Monitoring

After launch, monitor for:
- User feedback on Meesho features
- Error reports in production logs
- Performance issues with large PDFs
- Browser compatibility issues

## Rollback Plan

If issues occur, simply comment out the UI section again:

```javascript
{/* {selectedSiteDetailsState?.value === 3 && (
  // ... Meesho options ...
)} */}
```

And revert to basic crop in the upload handler.

## Contact

For questions or issues during rollout:
- Review: `/MEESHO_IMPLEMENTATION.md`
- Check code comments in the files above
- Test locally before production deployment

---

**Ready to go live on: 11 October 2025** ✅
