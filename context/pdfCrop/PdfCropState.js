import PdfCropContext from "./PdfCropContext";
import { useState } from 'react'

const PdfCropState = ({ children }) => {
    const [pdfCropSiteDetails, setPdfCropSiteDetails] = useState( '_____')

    return (
        <PdfCropContext.Provider value={{ pdfCropSiteDetails, setPdfCropSiteDetails }}>
            {children}
        </PdfCropContext.Provider>
    )
}
export default PdfCropState