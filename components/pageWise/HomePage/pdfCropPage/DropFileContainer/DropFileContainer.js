import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Uppy from "@uppy/core";
import StatusBar from "@uppy/status-bar";
import ProgressBar from "./StatusBarComponent";
import { Dashboard } from "@uppy/react";
// import { Checkbox } from '@material-tailwind/react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../firebaseConfig";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// Import pdf-lib for cropping logic
import { PDFDocument } from "pdf-lib";
import UPIImage from "../../../../../public/images/UPI.jpg"

function DropFileContainer({
  selectedSiteDetailsState,
  setSelectedSiteDetailsState,
}) {
  const [user, loading] = useAuthState(auth);

  // States
  const [allPDFdata, setAllPDFdata] = useState({});
  const [isDownloadPDFsfilesAvailable, setIsDownloadPDFsfilesAvailable] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Checkbox states
  const [settingOne, setSettingOne] = useState(false);
  const [settingTwo, setSettingTwo] = useState(false);
  const [settingThree, setSettingThree] = useState(false);
  const [settingFour, setSettingFour] = useState(false);
  const [settingFive, setSettingFive] = useState(false);
  const [settingSix, setSettingSix] = useState(false);

  const [hrefState, setHrefState] = useState("");
  const [fileDownloadState, setFileDownloadState] = useState("");

  // Context states
  const downloadFilesButtonRef = useRef();
  const uploadContainerRef = useRef();

  const uppy = React.useMemo(() => {
    return new Uppy({
      id: "uppy",
      autoProceed: true,
      allowMultipleUploads: true,
      restrictions: {
        allowedFileTypes: ["application/pdf"],
      },
    });
  }, []);

  uppy.on("file-added", (file) => {
    console.log(file);
    setAllPDFdata(file);
  });

  uppy.on("file-removed", (file) => {
    setAllPDFdata({});
  });

  const signInWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
      alert("TRY AGAIN");
    }
  };

  const cropPdf = async (x, y, width, height) => {
    setIsLoading(true);
    console.log("Croppdf Called");
    try {
      const pdfBuffer = await allPDFdata.data.arrayBuffer(); // Convert Blob to ArrayBuffer
      const pdfDoc = await PDFDocument.load(pdfBuffer);

      for (let i = 0; i < pdfDoc.getPages().length; i++) {
        const page = pdfDoc.getPage(i);
        page.setCropBox(x, y, width, height);
      }

      console.log("PDF CROPPED Called");

      const modifiedPDFBuffer = await pdfDoc.save();
      const modifiedBlob = new Blob([modifiedPDFBuffer], {
        type: "application/pdf",
      });

      const currentDate = new Date();
      const prefix =
        selectedSiteDetailsState.value === 1
          ? "Amazon"
          : selectedSiteDetailsState.value === 2
          ? "Flipkart"
          : selectedSiteDetailsState.value === 3
          ? "Meesho"
          : selectedSiteDetailsState.value === 4
          ? "GlowRoad"
          : "Unknown";
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const filename = `PDFCROPS.com-${prefix}-${currentDate.getDate()}-${
        months[currentDate.getMonth()]
      }-${currentDate
        .getFullYear()
        .toString()
        .slice(
          -2
        )}-${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}.pdf`;

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(modifiedBlob);
      downloadLink.download = filename;
      downloadLink.click();

      console.log(downloadLink.href);

      setHrefState(URL.createObjectURL(modifiedBlob));
      setFileDownloadState(filename);

      setIsDownloadPDFsfilesAvailable(true);

      URL.revokeObjectURL(downloadLink.href);
      // setHrefState(downloadLink)
    } catch (error) {
      console.error(error);
      const notify = () =>
        toast.error("Please upload a file again", {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      notify();
    }
  };

  const postPDF = async () => {
    if (selectedSiteDetailsState && allPDFdata) {
      console.log(`----- postPDF is running -----`);
      setIsLoading(true);

      let data = new FormData();
      data.append("file", allPDFdata?.data);
      data.append("Ecommerce", selectedSiteDetailsState?.value);
      data.append("UserDetails", {
        uid: user?.uid,
      });

      if ({ settingTwo: false ? 0 : 1 }) {
        data.append("settingTwo", 1);
      } else {
        data.append("settingTwo", 0);
      }
      // data.append('settingOne', {settingOne: false ? 0 : 1});

      // data.append("settingDetails", {

      //     // settingOne: false ? 0 : 1,
      //     // settingTwo: false ? 0 : 1,
      //     // settingThree: false ? 0 : 1,
      //     // settingFour: false ? 0 : 1,
      //     // settingFive: false ? 0 : 1,
      //     // settingSix: false ? 0 : 1,
      // })

      fetch("https://nodeapivercelhostingyoutube-production.up.railway.app", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          uppy.cancelAll();
          setIsLoading(false);
          setAllPDFdata({});
          return response.blob();
        })
        .then((blob) => {
          let binaryData = [];
          binaryData.push(blob);
          const fileURL = window.URL.createObjectURL(
            new Blob(binaryData, { type: "application/pdf" })
          );

          // Create Current Date object
          let currentDate = new Date();

          // Store EcommerceChoice
          let EcommerceChoice = selectedSiteDetailsState?.value;

          // Declare a prefix
          let prefix;

          // Append value acccoring to user choice
          if (EcommerceChoice == 1) {
            prefix = "Amazon";
          }
          if (EcommerceChoice == 2) {
            prefix = "Flipkart";
          } else if (EcommerceChoice == 3) {
            prefix = "Meesho";
          } else if (EcommerceChoice == 4) {
            prefix = "GlowRoad";
          }

          let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          if (settingOne) {
            let alink = document.createElement("a");

            alink.href = fileURL;
            alink.download =
              "PDFCROPS-" +
              prefix +
              "-" +
              currentDate.getDate() +
              "-" +
              months[currentDate.getMonth()] +
              "-" +
              currentDate.getFullYear().toString().slice(-2) +
              "-" +
              currentDate.getHours() +
              "-" +
              currentDate.getMinutes() +
              ".pdf";

            alink.click();
            alink.remove();
          }

          setHrefState(fileURL);
          setFileDownloadState(
            "PDFCROPS-" +
              prefix +
              "-" +
              currentDate.getDate() +
              "-" +
              months[currentDate.getMonth()] +
              "-" +
              currentDate.getFullYear().toString().slice(-2) +
              "-" +
              currentDate.getHours() +
              "-" +
              currentDate.getMinutes() +
              ".pdf"
          );

          setIsDownloadPDFsfilesAvailable(true);

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
        })

        // resettig states
        .catch(function (error) {
          console.error(error);
          setIsLoading(false);
        });
    } else if (!selectedSiteDetailsState && !allPDFdata) {
      alert("Selected a site and Pick a file");
    }
  };

  const uploadFileInfoToast = () => {
    const notify = () =>
      toast.error("Please upload a file", {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    notify();
  };

  // getting checkbox data from local storage
  useEffect(() => {
    setSettingOne(
      JSON.parse(window.localStorage.getItem("settingOne")) || false
    );
    setSettingTwo(
      JSON.parse(window.localStorage.getItem("settingTwo")) || false
    );
    setSettingThree(
      JSON.parse(window.localStorage.getItem("settingThree")) || false
    );
    setSettingFour(
      JSON.parse(window.localStorage.getItem("settingFour")) || false
    );
    setSettingFive(
      JSON.parse(window.localStorage.getItem("settingFive")) || false
    );
    setSettingSix(
      JSON.parse(window.localStorage.getItem("settingSix")) || false
    );
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Modal
          disableEnforceFocus
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h1">
              Consider To Donate 😊
            </Typography>

            <div className="flex items-center">
              <img
                src="../../../../../public/images/UPI.jpg"
                alt="Description of the image"
                className="w-32 h-auto mr-4"
              />
              <div>
                <Typography id="modal-modal-description" className="mt-2">
                  I'm a single developer, and keeping TheSellerBuddy has a
                  pretty high annual cost. I want to keep the website free and
                  I've been doing it for years but if you use my website and
                  want to help me in their development, a donation is the best
                  way to do it. Most of all, your donation will make it possible
                  to keep up the current development standards, and will bring
                  new features and improvements to the website.
                </Typography>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      <Button onClick={handleOpen}>Open modal</Button>

      <div className="flex flex-col items-center justify-start space-y-3">
        {/* Check boxes */}
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl ">
          {" "}
          Our Features
        </h1>
        <div className="w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-wrap justify-center items-center space-x-3 my-5 p-3 rounded-md  bg-white shadow-lg shadow-slate-200">
          <FormControlLabel
            className="m-1"
            control={
              <Checkbox
                checked={settingOne}
                onChange={(e) => {
                  window.localStorage.setItem(
                    "settingOne",
                    JSON.stringify(e.target.checked)
                  );
                  setSettingOne(e.target.checked);
                }}
              />
            }
            label="Auto Download"
          />

          {/* <FormControlLabel className="m-1" control={<Checkbox checked={settingTwo} onChange={(e) => {
                        window.localStorage.setItem("settingTwo", JSON.stringify(e.target.checked))
                        setSettingTwo(e.target.checked)
                    }} />} label="Merge Crop" /> */}
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

        <div className="w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-wrap justify-center items-center space-x-3 my-5 p-3 rounded-md  bg-white shadow-lg shadow-slate-200">
          <button
            onClick={() => {
              if (!user && !loading) {
                signInWithGoogle();
              } else if (user && !loading && allPDFdata.data) {
                // Client side rendering

                // Amazon
                if (selectedSiteDetailsState?.value === 1) {
                  cropPdf();
                }

                // Flipkart
                if (selectedSiteDetailsState?.value === 2) {
                  cropPdf(170, 467, 255, 353);
                }

                // Meesho
                if (selectedSiteDetailsState?.value === 3) {
                  cropPdf(0, 490, 600, 600);
                }

                // GlowRoad
                if (selectedSiteDetailsState?.value === 4) {
                  cropPdf(25, 220, 545, 300);
                }

                uppy.cancelAll();
                setIsLoading(false);

                setIsDownloadPDFsfilesAvailable(true);
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

                // API CALLED
                // postPDF()
              } else if (!allPDFdata?.data) {
                uploadFileInfoToast();
              }
            }}
            className={` px-8 py-3 my-4 rounded-md bg-brandPrimaryColor text-white text-sm font-medium ${
              allPDFdata?.data
                ? "hover:cursor-pointer"
                : "hover:cursor-not-allowed"
            } hover:bg-[#156BA9] `}
          >
            Upload
          </button>

          {isDownloadPDFsfilesAvailable && (
            <a
              id="popop"
              href={hrefState}
              download={fileDownloadState}
              ref={downloadFilesButtonRef}
              className={`px-8 py-3 my-4 rounded-md bg-green-500 text-white text-sm font-medium "hover:cursor-pointer" hover:bg-green-600 `}
            >
              {" "}
              Download file{" "}
            </a>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="z-50 fixed inset-0 w-full h-screen bg-black opacity-75 flex flex-col justify-center items-center space-y-2">
          <p> Cropping .... </p>
          <AiOutlineLoading3Quarters className="animate-spin text-white text-6xl" />
        </div>
      )}
    </>
  );
}

export default DropFileContainer;
