import React, { useRef, useState } from 'react'
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


function DropFileContainer() {
    const [allPDFdata, setAllPDFdata] = useState({})
    const [isDownloadPDFsfilesAvailable, setIsDownloadPDFsfilesAvailable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [settingOne, setSettingOne] = useState(false)
    const [settingTwo, setSettingTwo] = useState(false)
    const [settingThree, setSettingThree] = useState(false)
    const [settingFour, setSettingFour] = useState(false)
    const [settingFive, setSettingFive] = useState(false)
    const [settingSix, setSettingSix] = useState(false)



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
            data.append('Ecommerce', 2);
            data.append('UserDetails', {
                uid: "xxxxxxxxxxxxxxxxxxxx"
            });


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
                .catch(function (error) {
                    console.error(error);
                    setIsLoading(false)
                });
        } else if (!allPDFdata?.data) {
            console.log(`no allPDFdata?.data `)
        }
    }


    const downloadFilesButtonRef = useRef()



    return (
        <>
            {true && (
                <div className='flex flex-col items-center justify-start space-y-3'>

                    {/* Check boxes */}
                    <div className='w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-wrap justify-center items-center space-x-3 my-5 p-3 rounded-md  bg-white shadow-lg shadow-slate-200'>
                        {/* <Checkbox label="Sort Plastic and NPP" ripple={true} color="blue" onChange={(e) => setSettingOne(e.target.checked)} />
                        <input type="checkbox" name="" id="" className='bg-red-100 border-red-300 text-red-500 focus:ring-red-200'/>
                        <Checkbox label="Sort Courier wise" ripple={true} color="blue" />
                        <Checkbox label="Keep Invoice" ripple={true} color="blue" />
                        <Checkbox label="Merge Files" ripple={true} color="blue" />
                        <Checkbox label="Print Date time on label" ripple={true} color="blue" />
                        <Checkbox label="Multi order at bottom" ripple={true} color="blue" /> */}

                        <FormGroup className='flex justify-center items-center space-x-2'>
                            <FormControlLabel className="bg-red-300 m-1" control={<Checkbox  onChange={(e) => setSettingOne(e.target.checked)}/>} label="Sort Plastic and NPP" />
                            <FormControlLabel className="bg-red-300 m-1" control={<Checkbox  onChange={(e) => setSettingTwo(e.target.checked)}/>} label="Sort Courier wise" />
                            <FormControlLabel className="bg-red-300 m-1" control={<Checkbox  onChange={(e) => setSettingThree(e.target.checked)}/>} label="Keep Invoice" />
                            <FormControlLabel className="bg-red-300 m-1" control={<Checkbox  onChange={(e) => setSettingFour(e.target.checked)}/>} label="Merge Files" />
                            <FormControlLabel className="bg-red-300 m-1" control={<Checkbox  onChange={(e) => setSettingFive(e.target.checked)}/>} label="Print Date time on label" />
                            <FormControlLabel className="bg-red-300 m-1" control={<Checkbox  onChange={(e) => setSettingSix(e.target.checked)}/>} label="Multi order at bottom" />
                        </FormGroup>
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
                        console.log(`1st => ${settingOne}`)
                        console.log(`2nd => ${settingTwo}`)
                        console.log(`3rd => ${settingThree}`)
                        console.log(`4th => ${settingFour}`)
                        console.log(`5th => ${settingFive}`)
                        console.log(`6th => ${settingSix}`)
                    }}> setSettingOne   </h1>

                </div>
            )}

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