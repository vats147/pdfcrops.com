import PdfCropContext from "./PdfCropContext";
import { useState } from 'react'

const PdfCropState = ({ children }) => {
    const [pdfCropSiteDetails, setPdfCropSiteDetails] = useState(  )
    const [fileReadyToDownloadModalDetails, setFileReadyToDownloadModalDetails] = useState({})

    return (
        <PdfCropContext.Provider value={{ pdfCropSiteDetails, setPdfCropSiteDetails, fileReadyToDownloadModalDetails, setFileReadyToDownloadModalDetails }}>
            {children}
        </PdfCropContext.Provider>
    )
}
export default PdfCropState  