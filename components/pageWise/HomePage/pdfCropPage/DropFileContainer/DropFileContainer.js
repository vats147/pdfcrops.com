import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Uppy from '@uppy/core'
import StatusBar from '@uppy/status-bar'
import ProgressBar from './StatusBarComponent'
import { Dashboard } from '@uppy/react'
// import { Checkbox } from '@material-tailwind/react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { toast } from 'react-toastify'


import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import pdfCropContext from '@/context/pdfCrop/PdfCropContext'


function DropFileContainer() {
    const [allPDFdata, setAllPDFdata] = useState({})
    const [isDownloadPDFsfilesAvailable, setIsDownloadPDFsfilesAvailable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Checkbox states
    const [settingOne, setSettingOne] = useState(false)
    const [settingTwo, setSettingTwo] = useState(false)
    const [settingThree, setSettingThree] = useState(false)
    const [settingFour, setSettingFour] = useState(false)
    const [settingFive, setSettingFive] = useState(false)
    const [settingSix, setSettingSix] = useState(false)

    // Context states
    const { pdfCropSiteDetails } = useContext(pdfCropContext)

    const downloadFilesButtonRef = useRef()

    const uppy = React.useMemo(() => {
        return new Uppy({
            id: "uppy",
            restrictions: {
                allowedFileTypes: ["application/pdf"]
            }
        })
    }, [])


    uppy.on("file-added", (file) => {
        console.log(file);
        setAllPDFdata(file)
    })




    const postPDF = async () => {
        if (allPDFdata?.data) {
            console.log(`----- postPDF is running -----`)
            setIsLoading(true)

            let data = new FormData();
            data.append('file', allPDFdata?.data);
            data.append('Ecommerce', pdfCropSiteDetails?.value);
            data.append('UserDetails', {
                uid: "xxxxxxxxxxxxxxxxxxxx"
            });
            data.append("settingDetails", {
                settingOne: false ? 0 : 1,
                settingTwo: false ? 0 : 1,
                settingThree: false ? 0 : 1,
                settingFour: false ? 0 : 1,
                settingFive: false ? 0 : 1,
                settingSix: false ? 0 : 1,
            })


            fetch("https://nodeapivercelhostingyoutube-production.up.railway.app/", {
                method: 'POST',
                body: data,
            })
                .then((response) => {
                    uppy.cancelAll()
                    setIsLoading(false)
                    setAllPDFdata({})
                    return response.blob()

                }).then((blob) => {
                    let binaryData = [];
                    binaryData.push(blob);
                    const fileURL = window.URL.createObjectURL(new Blob(binaryData, { type: "application/pdf" }))

                    let alink = document.createElement('a');
                    alink.href = fileURL;
                    alink.download = "givemereport_" + Date.now() + ".pdf";

                    // console.log(alink)
                    // alink.click();
                    // alink.remove()

                    // downloadFilesButtonRef?.current?.href = fileURL
                    // downloadFilesButtonRef?.current?.download = "givemereport_" + Date.now() + ".pdf";



                    setIsDownloadPDFsfilesAvailable(true)

                    downloadFilesButtonRef.href = fileURL
                    downloadFilesButtonRef.download = "givemereport_" + Date.now() + ".pdf"

                    const notify = () => toast.success('Files are ready for download!', {
                        position: "bottom-center",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    notify()


                })

                // resettig states
                .catch(function (error) {
                    console.error(error);
                    setIsLoading(false)
                });
        } else if (!allPDFdata?.data) {
            console.log(`no allPDFdata?.data `)
        }
    }


   


    // getting checkbox data from local storage
    useEffect(() => {
        setSettingOne(JSON.parse(window.localStorage.getItem("settingOne")) || false)
        setSettingTwo(JSON.parse(window.localStorage.getItem("settingTwo")) || false)
        setSettingThree(JSON.parse(window.localStorage.getItem("settingThree")) || false)
        setSettingFour(JSON.parse(window.localStorage.getItem("settingFour")) || false)
        setSettingFive(JSON.parse(window.localStorage.getItem("settingFive")) || false)
        setSettingSix(JSON.parse(window.localStorage.getItem("settingSix")) || false)
    }, [])

    






    return (
        <>
            <div className='flex flex-col items-center justify-start space-y-3'>

                {/* Check boxes */}
                <div className='w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-wrap justify-center items-center space-x-3 my-5 p-3 rounded-md  bg-white shadow-lg shadow-slate-200'>
                    <FormControlLabel className="m-1" control={
                        <Checkbox checked={settingOne} onChange={(e) => {
                            window.localStorage.setItem("settingOne", JSON.stringify(e.target.checked))
                            setSettingOne(e.target.checked)
                        }} />} label="Sort Plastic and NPP" />

                    <FormControlLabel className="m-1" control={<Checkbox checked={settingTwo} onChange={(e) => {
                        window.localStorage.setItem("settingTwo", JSON.stringify(e.target.checked))
                        setSettingTwo(e.target.checked)
                    }} />} label="Sort Courier wise" />

                    <FormControlLabel className="m-1" control={<Checkbox checked={settingThree} onChange={(e) => {
                        window.localStorage.setItem("settingThree", JSON.stringify(e.target.checked))
                        setSettingThree(e.target.checked)
                    }} />} label="Keep Invoice" />

                    <FormControlLabel className="m-1" control={<Checkbox checked={settingFour} onChange={(e) => {
                        window.localStorage.setItem("settingFour", JSON.stringify(e.target.checked))
                        setSettingFour(e.target.checked)
                    }} />} label="Merge Files" />

                    <FormControlLabel className="m-1" control={<Checkbox checked={settingFive} onChange={(e) => {
                        window.localStorage.setItem("settingFive", JSON.stringify(e.target.checked))
                        setSettingFive(e.target.checked)
                    }} />} label="Print Date time on label" />

                    <FormControlLabel className="m-1" control={<Checkbox checked={settingSix} onChange={(e) => {
                        window.localStorage.setItem("settingSix", JSON.stringify(e.target.checked))
                        setSettingSix(e.target.checked)
                    }} />} label="Multi order at bottom" />
                </div>

                <Dashboard
                    uppy={uppy}
                    width="90vw"
                    height="500px"
                    showProgressDetails={true}
                    className="md:w-[60vw] lg:w-[50vw] xl:w-[40vw] z-10 hover:cursor-pointer"
                    hideUploadButton={true}
                    proudlyDisplayPoweredByUppy={false}

                />





                <div className='w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-wrap justify-center items-center space-x-3 my-5 p-3 rounded-md  bg-white shadow-lg shadow-slate-200'>

                    <button

                        disabled={allPDFdata?.data ? false : true}
                        onClick={postPDF}
                        className={` px-8 py-3 my-4 rounded-md bg-brandPrimaryColor text-white text-sm font-medium ${allPDFdata?.data ? "hover:cursor-pointer" : "hover:cursor-not-allowed"} hover:bg-[#156BA9] `}>
                        POST

                    </button>

                    {isDownloadPDFsfilesAvailable && (
                        <button
                            onClick={() => { null }}
                            className={`px-8 py-3 my-4 rounded-md bg-green-500 text-white text-sm font-medium "hover:cursor-pointer" hover:bg-green-600 `}>
                            <a ref={downloadFilesButtonRef} target="_blank" rel="noreferrer" className='font-medium'> Download file </a>
                        </button>
                    )}
                </div>




                <h1 className='my-2 text-base  bg-red-300' onClick={() => {
                    // console.log(`1st => ${settingOne}`)
                    // console.log(`2nd => ${settingTwo}`)
                    // console.log(`3rd => ${settingThree}`)
                    // console.log(`4th => ${settingFour}`)
                    // console.log(`5th => ${settingFive}`)
                    // console.log(`6th => ${settingSix}`)

                    console.log(pdfCropSiteDetails)
                }}> pdfCropSiteDetails   </h1>

            </div>

            {isLoading && (
                <div className='z-50 fixed inset-0 w-full h-screen bg-black opacity-75 flex flex-col justify-center items-center space-y-2'>
                    <p> Cropping .... </p>
                    <AiOutlineLoading3Quarters className='animate-spin text-white text-6xl' />
                </div>

            )}



        </>
    )
}

export default DropFileContainer