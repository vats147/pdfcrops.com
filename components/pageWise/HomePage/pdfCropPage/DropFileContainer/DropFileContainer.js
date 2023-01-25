import React, { useState } from 'react'
import axios from 'axios'
import Uppy from '@uppy/core'
import StatusBar from '@uppy/status-bar'
import StatusBarComponent from './StatusBarComponent'
import { Dashboard } from '@uppy/react'
import { Checkbox } from '@material-tailwind/react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'



function DropFileContainer() {

    const [allPDFdata, setAllPDFdata] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [firstSetting, setFirstSetting] = useState(true)
    const [secondSetting, setSecondSetting] = useState(false)





    const uppy = React.useMemo(() => {
        return new Uppy({
            id: "uppy",
            restrictions: {
                allowedFileTypes: ["application/pdf"]
            }
        })
    }, [])


    const postPDF = async () => {
        if (allPDFdata[0]?.data) {
            console.log(`----- postPDF is running -----`)
            setIsLoading(true)

            let data = new FormData();
            data.append('file', allPDFdata[0]?.data);
            data.append('Ecommerce', 1);
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
                    return response.blob()

                }).then((blob) => {
                    let binaryData = [];
                    binaryData.push(blob);
                    const fileURL = window.URL.createObjectURL(new Blob(binaryData, { type: "application/pdf" }))
                    let alink = document.createElement('a');
                    alink.href = fileURL;
                    alink.download = "givemereport_" + Date.now();
                    alink.click();
                    alink.remove()




                })
                .catch(function (error) {
                    console.error(error);
                    setIsLoading(false)
                });
        } else {
            alert("Add PDF file(s)")
        }
    }


    // uppy.on('complete', result => {
    //     console.log(result)
    //     setAllPDFdata(result.successful)
    //     console.log(allPDFdata)
    // })



    uppy.on('upload', (data) => {
        console.log(data)
        // setIsLoading(true)
        // setTimeout(() => {
        //     postPDF()
        // }, 1000);
    })


    return (
        <>
            {!isLoading && (
                <div className='flex flex-col items-center justify-start space-y-3'>
                    <Dashboard
                        uppy={uppy}
                        width="90vw"
                        height="500px"
                        showProgressDetails={true}
                        className="md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"

                    />


                    <div className='flex flex-wrap justify-center items-center space-x-3 my-5'>
                        <Checkbox label="Sort Plastic and NPP" ripple={true} color="blue" />
                        <Checkbox label="Sort Courier wise" ripple={true} color="blue" />
                        <Checkbox label="Keep Invoice" ripple={true} color="blue" />
                        <Checkbox label="Merge Files" ripple={true} color="blue" />
                        <Checkbox label="Print Date time on label" ripple={true} color="blue" />
                        <Checkbox label="Multi order at bottom" ripple={true} color="blue" />
                    </div>

                    {/* 
                <div className='w-72 h-20 flex flex-col justify-around items-center bg-blue-300'>
                    <h1 className='my-2 text-base' onClick={() => console.log(allPDFdata[0])}> LOG allPDFdata </h1>
                </div> */}

                    {/* <h1 className='my-2 text-base  bg-red-300' onClick={() => postPDF()}> POST </h1> */}

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