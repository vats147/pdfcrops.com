// import Uppy, { debugLogger } from '@uppy/core'
// import Dashboard from '@uppy/dashboard'
// import RemoteSources from '@uppy/google-drive'
// import ImageEditor from '@uppy/image-editor'
// import Form from '@uppy/form'
// import Webcam from '@uppy/webcam'
// import Audio from '@uppy/audio'
// import ScreenCapture from '@uppy/screen-capture'
// import Tus from '@uppy/tus'
// import DropTarget from '@uppy/drop-target'
// import Compressor from '@uppy/compressor'

// import "@uppy/core/dist/style.css"
// import "@uppy/dashboard/dist/style.css"
// import "@uppy/audio/dist/style.css"
// import "@uppy/screen-capture/dist/style.css"
// import "@uppy/image-editor/dist/style.css"

// const COMPANION_URL = "http://companion.uppy.io"
// const COMPANION_ALLOWED_HOSTS = ['https://my-site.com']

// const uppy = new Uppy({ logger: debugLogger })
//   // The main UI that shows files, progress and holds all plugins
//   .use(Dashboard, {
//     target: '.DashboardContainer',
//     inline: true,
//     height: 470,
//     metaFields: [
//       { id: 'name', name: 'Name', placeholder: 'file name' },
//       { id: 'caption', name: 'Caption', placeholder: 'add description' },
//     ],
//     note: 'Images and video only, 2–3 files, up to 1 MB',
//   })
//   // All remote services like Instagram and Google Drive in one package
//   .use(RemoteSources, {
//     // You can manually specify `sources` here, by default all available are included. 
//     // See docs: https://uppy.io/docs/remote-sources/#sources.
//     companionUrl: COMPANION_URL,
//     companionAllowedHosts: COMPANION_ALLOWED_HOSTS,
//   })
//   .use(Webcam, { target: Dashboard })
//   .use(Audio, { target: Dashboard, showRecordingLength: true })
//   .use(ScreenCapture, { target: Dashboard })
//   .use(Form, { target: '#upload-form' })
//   .use(ImageEditor, { target: Dashboard })
//   // Allow dropping files on any element or the whole document
//   .use(DropTarget, { target: document.body })
//   // Optimize images
//   .use(Compressor)
//   // Upload
//   .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })

// uppy.on('complete', result => {
//   console.log('successful files:', result.successful)
//   console.log('failed files:', result.failed)
// })

import React, { useState } from 'react'
import axios from 'axios'
import Uppy from '@uppy/core'
import StatusBar from '@uppy/status-bar'
import StatusBarComponent from './StatusBarComponent'
import { Dashboard } from '@uppy/react'



function DropFileContainer() {

    const uppy = React.useMemo(() => {
        return new Uppy({
            id: "uppy",
            restrictions: {
                allowedFileTypes: ["application/pdf"]
            }
        })
    }, [])

    const [allPDFdata, setAllPDFdata] = useState([])

    const postPDF = async () => {

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
                // console.log(response);
                return response.blob()

            }).then((blob) => {
                let binaryData = [];
                binaryData.push(blob);
                const fileURL = window.URL.createObjectURL(new Blob(binaryData, { type: "application/pdf" }))

                // const fileURL = window?.URL?.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = "givemereport_" + Date.now();
                alink.click();
                alink.remove()

                // console.log(blob);
            })
            .catch(function (error) {
                console.error(error);
            });



    }





    uppy.on('complete', result => {
        console.log(result)
        setAllPDFdata(result.successful)
    })

    return (
        <>
            <Dashboard
                uppy={uppy}
                width="90vw"
                height="500px"
                showProgressDetails={true}
            />

            <div className='w-72 h-20 flex flex-col justify-around items-center bg-blue-300'>
                <h1 className='my-2 text-base' onClick={() => console.log(allPDFdata[0])}> LOG allPDFdata </h1>
            </div>

            <h1 className='my-2 text-base  bg-red-300' onClick={() => postPDF()}> POST </h1>

        </>
    )
}

export default DropFileContainer