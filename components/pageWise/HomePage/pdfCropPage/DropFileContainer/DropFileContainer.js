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

// Import Flipkart-specific cropping utility
import { 
  cropFlipkartLabel, 
  cropFlipkartLabelAdvanced,
  generateFlipkartFilename,
  FLIPKART_THERMAL_CONFIG 
} from "../../../../../utils/flipkartPdfCropper";
import { getFlipkartCropCoordinates } from "../../../../../utils/flipkartPdfCropper";

// Import Meesho-specific cropping utility
import { 
  cropMeeshoLabel,
  cropMeeshoLabelSimple,
  generateMeeshoFilename 
} from "../../../../../utils/meeshoPdfCropper";

import Image from "next/image";

import UPIImage from "../../../../../public/images/UPI.jpg";

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
  const [debugCrop, setDebugCrop] = useState(false);

  // Meesho-specific checkbox states
  const [meeshoPickupSorting, setMeeshoPickupSorting] = useState(false);
  const [meeshoSkuSorting, setMeeshoSkuSorting] = useState(false);
  const [meesho4LabelA4, setMeesho4LabelA4] = useState(false);
  const [meeshoOrderNumber, setMeeshoOrderNumber] = useState(false);
  const [meeshoPrintText, setMeeshoPrintText] = useState(false);
  const [meeshoPrintTextValue, setMeeshoPrintTextValue] = useState("Dispatch on 04-10-2025, Thank you for choosing us...");
  const [meeshoInvoice, setMeeshoInvoice] = useState(false);
  const [meeshoSkuOrderSummary, setMeeshoSkuOrderSummary] = useState(false);

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

      const filename = `pdfcrops.app-${prefix}-${currentDate.getDate()}-${
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

  // Dedicated Flipkart cropping function with dynamic content detection
  const cropFlipkartPdf = async () => {
    setIsLoading(true);
    console.log("Flipkart Dynamic Crop Called");
    try {
      // Use the advanced Flipkart cropper with thermal printer optimizations
      const croppedBlob = await cropFlipkartLabelAdvanced(
        allPDFdata.data,
        { ...FLIPKART_THERMAL_CONFIG, debug: debugCrop }
      );

      // Generate filename
      const filename = generateFlipkartFilename();

      // Create download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(croppedBlob);
      downloadLink.download = filename;
      downloadLink.click();

      console.log("Flipkart PDF cropped successfully:", downloadLink.href);

      // Update state for download button
      setHrefState(URL.createObjectURL(croppedBlob));
      setFileDownloadState(filename);
      setIsDownloadPDFsfilesAvailable(true);

      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error("Flipkart crop error:", error);
      const notify = () =>
        toast.error("Failed to crop Flipkart label. Please upload the file again.", {
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
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to compute and print crop coordinates without modifying the PDF
  const printCropCoordinates = async () => {
    if (!allPDFdata || !allPDFdata.data) {
      uploadFileInfoToast();
      return;
    }

    try {
      const coords = await getFlipkartCropCoordinates(allPDFdata.data, FLIPKART_THERMAL_CONFIG);
      console.log("Computed Flipkart crop coordinates:", coords);
      toast.info(`Computed crop for ${coords.length} page(s). See console for details.`, {
        position: "bottom-center",
        autoClose: 2500,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to compute crop coordinates. Check console.");
    }
  };

  // Dedicated Meesho cropping function with all options
  const cropMeeshoPdf = async () => {
    setIsLoading(true);
    console.log("Meesho Advanced Crop Called");
    console.log("Meesho Options:", {
      pickupSorting: meeshoPickupSorting,
      skuSorting: meeshoSkuSorting,
      fourLabelA4: meesho4LabelA4,
      orderNumber: meeshoOrderNumber,
      printText: meeshoPrintText,
      printTextValue: meeshoPrintTextValue,
      invoice: meeshoInvoice,
      skuOrderSummary: meeshoSkuOrderSummary,
    });

    try {
      // Use the advanced Meesho cropper with all selected options
      const croppedBlob = await cropMeeshoLabel(
        allPDFdata.data,
        {
          pickupSorting: meeshoPickupSorting,
          skuSorting: meeshoSkuSorting,
          fourLabelA4: meesho4LabelA4,
          orderNumber: meeshoOrderNumber,
          printText: meeshoPrintText,
          printTextValue: meeshoPrintTextValue,
          invoice: meeshoInvoice,
          skuOrderSummary: meeshoSkuOrderSummary,
          debug: debugCrop,
        }
      );

      // Generate filename
      const filename = generateMeeshoFilename();

      // Create download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(croppedBlob);
      downloadLink.download = filename;
      downloadLink.click();

      console.log("Meesho PDF cropped successfully:", downloadLink.href);

      // Update state for download button
      setHrefState(URL.createObjectURL(croppedBlob));
      setFileDownloadState(filename);
      setIsDownloadPDFsfilesAvailable(true);

      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error("Meesho crop error:", error);
      const notify = () =>
        toast.error("Failed to crop Meesho label. Please upload the file again.", {
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
    } finally {
      setIsLoading(false);
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

    // Meesho-specific settings from localStorage
    setMeeshoPickupSorting(
      JSON.parse(window.localStorage.getItem("meeshoPickupSorting")) || false
    );
    setMeeshoSkuSorting(
      JSON.parse(window.localStorage.getItem("meeshoSkuSorting")) || false
    );
    setMeesho4LabelA4(
      JSON.parse(window.localStorage.getItem("meesho4LabelA4")) || false
    );
    setMeeshoOrderNumber(
      JSON.parse(window.localStorage.getItem("meeshoOrderNumber")) || false
    );
    setMeeshoPrintText(
      JSON.parse(window.localStorage.getItem("meeshoPrintText")) || false
    );
    setMeeshoPrintTextValue(
      window.localStorage.getItem("meeshoPrintTextValue") || "Dispatch on 04-10-2025, Thank you for choosing us..."
    );
    setMeeshoInvoice(
      JSON.parse(window.localStorage.getItem("meeshoInvoice")) || false
    );
    setMeeshoSkuOrderSummary(
      JSON.parse(window.localStorage.getItem("meeshoSkuOrderSummary")) || false
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="w-full">
  <Modal
    disableEnforceFocus
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto bg-white rounded-lg p-6">
      <div className="flex justify-end">
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Consider To Donate 😊
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center">
        <Image
          draggable="false"
          quality={100}
          unoptimized
          src={UPIImage}
          alt="upi image "
          className="w-64 md:w-96 h-auto mb-4 md:mb-0"
        />

        <div className="md:ml-8">
          <Typography className="text-base md:text-lg">
            I'm a single developer, and keeping pdfcrops.app has a pretty high annual cost. I want to keep the website free and I've been doing it for years but if you use my website and want to help me in their development, a donation is the best way to do it. Most of all, your donation will make it possible to keep up the current development standards, and will bring new features and improvements to the website.
          </Typography>
        </div>
      </div>
    </div>
  </Modal>
</div>


     

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

        {/* Meesho-specific options - HIDDEN FOR NOW (WILL BE ENABLED IN 1 WEEK) */}
        {/* TODO: Uncomment this section for production release after 1 week */}
        {/* {selectedSiteDetailsState?.value === 3 && (
          <div className="w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-col justify-start items-start space-y-2 my-5 p-5 rounded-md bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg border-2 border-green-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3 w-full text-center">
              Meesho Label Crop Options
            </h2>
            
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={meeshoPickupSorting}
                    onChange={(e) => {
                      window.localStorage.setItem(
                        "meeshoPickupSorting",
                        JSON.stringify(e.target.checked)
                      );
                      setMeeshoPickupSorting(e.target.checked);
                    }}
                  />
                }
                label="Pickup Sorting"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={meeshoSkuSorting}
                    onChange={(e) => {
                      window.localStorage.setItem(
                        "meeshoSkuSorting",
                        JSON.stringify(e.target.checked)
                      );
                      setMeeshoSkuSorting(e.target.checked);
                    }}
                  />
                }
                label="SKU Sorting"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={meesho4LabelA4}
                    onChange={(e) => {
                      window.localStorage.setItem(
                        "meesho4LabelA4",
                        JSON.stringify(e.target.checked)
                      );
                      setMeesho4LabelA4(e.target.checked);
                    }}
                  />
                }
                label="4 Label in A4 Page"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={meeshoOrderNumber}
                    onChange={(e) => {
                      window.localStorage.setItem(
                        "meeshoOrderNumber",
                        JSON.stringify(e.target.checked)
                      );
                      setMeeshoOrderNumber(e.target.checked);
                    }}
                  />
                }
                label="Order Number"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={meeshoInvoice}
                    onChange={(e) => {
                      window.localStorage.setItem(
                        "meeshoInvoice",
                        JSON.stringify(e.target.checked)
                      );
                      setMeeshoInvoice(e.target.checked);
                    }}
                  />
                }
                label="Invoice"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={meeshoSkuOrderSummary}
                    onChange={(e) => {
                      window.localStorage.setItem(
                        "meeshoSkuOrderSummary",
                        JSON.stringify(e.target.checked)
                      );
                      setMeeshoSkuOrderSummary(e.target.checked);
                    }}
                  />
                }
                label="SKU and Order Summary"
              />
            </div>

            <div className="w-full flex flex-col space-y-2 mt-3">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={meeshoPrintText}
                    onChange={(e) => {
                      window.localStorage.setItem(
                        "meeshoPrintText",
                        JSON.stringify(e.target.checked)
                      );
                      setMeeshoPrintText(e.target.checked);
                    }}
                  />
                }
                label="Print text on label"
              />
              
              {meeshoPrintText && (
                <input
                  type="text"
                  value={meeshoPrintTextValue}
                  onChange={(e) => {
                    window.localStorage.setItem("meeshoPrintTextValue", e.target.value);
                    setMeeshoPrintTextValue(e.target.value);
                  }}
                  placeholder="e.g. Dispatch on 04-10-2025, Thank you for choosing us..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              )}
            </div>
          </div>
        )} */}

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
            onClick={async () => {
              if (!user && !loading) {
                signInWithGoogle();
              } else if (user && !loading && allPDFdata.data) {
                // Client side rendering
                console.log('Selected Site Details:', selectedSiteDetailsState);
                console.log('Selected Site Value:', selectedSiteDetailsState?.value);

                // Amazon - No crop needed, just download as is
                if (selectedSiteDetailsState?.value === 1) {
                  // For Amazon, we don't crop - just show error for now
                  const notify = () =>
                    toast.info("Amazon label cropping is not yet implemented", {
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
                  uppy.cancelAll();
                  setAllPDFdata({});
                }

                // Flipkart - Using dynamic cropper for thermal printer compatibility
                else if (selectedSiteDetailsState?.value === 2) {
                  await cropFlipkartPdf();
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

                // Meesho - Using basic crop for now (advanced options hidden for 1 week)
                // TODO: Switch to cropMeeshoPdf() when advanced options are enabled
                else if (selectedSiteDetailsState?.value === 3) {
                  cropPdf(0, 490, 600, 600);
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
                }
                
                // ALTERNATIVE (for when advanced options are enabled):
                // else if (selectedSiteDetailsState?.value === 3) {
                //   await cropMeeshoPdf();
                //   uppy.cancelAll();
                //   setAllPDFdata({});
                //   
                //   const notify = () =>
                //     toast.success("Files are ready for download!", {
                //       position: "bottom-center",
                //       autoClose: false,
                //       hideProgressBar: false,
                //       closeOnClick: true,
                //       pauseOnHover: true,
                //       draggable: true,
                //       progress: undefined,
                //       theme: "light",
                //     });
                //   notify();
                // }

                // GlowRoad
                else if (selectedSiteDetailsState?.value === 4) {
                  cropPdf(25, 220, 545, 300);
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
                }

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

          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={debugCrop}
                onChange={(e) => setDebugCrop(e.target.checked)}
              />
              <span>Enable crop debug</span>
            </label>

            <button
              onClick={async () => {
                if (!allPDFdata?.data) {
                  uploadFileInfoToast();
                  return;
                }
                await printCropCoordinates();
              }}
              className="px-4 py-2 rounded-md bg-slate-700 text-white text-sm font-medium hover:bg-slate-800"
            >
              Print crop coords
            </button>
          </div>

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
