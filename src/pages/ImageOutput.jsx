// import { useNavigate, useLocation } from "react-router";

// // import cameraIcon from "../assets/images/camera.png";
// import { useEffect, useState } from "react";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";
// import { MdArrowBackIos } from "react-icons/md";
// import { MdArrowForwardIos } from "react-icons/md";
// import homeB from "../assets/images/homeB.png";
// import backB from "../assets/images/backButton.png";
// import { IoClose } from "react-icons/io5";

// function ImageOutput() {
//   const navigate = useNavigate();
//   let location = useLocation();
//   let initialImageList =
//     location.state?.imageList.map((image) => ({
//       ...image,
//       isSelected: false, // Add isSelected property
//     })) || [];
//   const [imageList, setImageList] = useState(initialImageList);
//   const [progress, setProgress] = useState(0);
//   const [processing, setProcessing] = useState(false);
//   const [previewImageUrl, setPreviewImageUrl] = useState(null);
//   const [previewUrlIndex, setPreivewUrlIndex] = useState(null);

//   const handleDownloadAll = async () => {
//     setProcessing(true);
//     const selectedImages = imageList.filter((img) => img.isSelected);

//     if (selectedImages.length === 1) {
//       const image = selectedImages[0];
//       const imageUrl = `${import.meta.env.VITE_APP_S3_URL}/originals/${
//         image.originalFileName
//       }`;
//       const response = await fetch(imageUrl, {
//         mode: "cors",
//         cache: "no-cache",
//       });
//       const blob = await response.blob();
//       saveAs(blob, image.originalFileName);
//       setProcessing(false);
//     } else {
//       const zip = new JSZip();
//       const imagesToDownload =
//         selectedImages.length > 0 ? selectedImages : imageList;

//       for (const [index, file] of imagesToDownload.entries()) {
//         const imageUrl = `${import.meta.env.VITE_APP_S3_URL}/originals/${
//           file.originalFileName
//         }`;
//         const response = await fetch(imageUrl, {
//           mode: "cors",
//           cache: "no-cache",
//         });
//         const blob = await response.blob();
//         zip.file(file.originalFileName, blob);
//         setProgress(Math.round(((index + 1) / imagesToDownload.length) * 100));
//       }

//       zip
//         .generateAsync({ type: "blob" }, (metadata) => {
//           setProgress(metadata.percent);
//         })
//         .then((content) => {
//           saveAs(content, "images.zip");
//           setProcessing(false);
//           setProgress(0);
//           setTimeout(() => {
//             console.log("fasfsadf");
//             navigate("/thank-you");
//           }, 2000);
//         });
//     }
//   };

//   const selectedCount = imageList.filter((img) => img.isSelected).length;
//   const downloadButtonText =
//     selectedCount > 0 ? `Download ${selectedCount} Images` : "Download All";

//   const magnifyImageSlider = (imageName, index) => {
//     console.log(imageName);
//     setPreviewImageUrl(imageName);
//     setPreivewUrlIndex(index);
//   };

//   const nextImage = () => {
//     const newIndex = previewUrlIndex + 1;
//     if (newIndex < imageList.length) {
//       const nextImage = imageList[newIndex].originalFileName;
//       setPreviewImageUrl(nextImage);
//       setPreivewUrlIndex(newIndex);
//     }
//   };

//   const prevImage = () => {
//     const newIndex = previewUrlIndex - 1;
//     if (newIndex >= 0) {
//       const prevImage = imageList[newIndex].originalFileName;
//       setPreviewImageUrl(prevImage);
//       setPreivewUrlIndex(newIndex);
//     }
//   };
//   const handleDownloadSingle = async () => {
//     const imageUrl = `${
//       import.meta.env.VITE_APP_S3_URL
//     }/originals/${previewImageUrl}`;
//     // const response = await fetch(imageUrl);
//     const response = await fetch(imageUrl, { mode: "cors", cache: "no-cache" });
//     const blob = await response.blob();
//     saveAs(blob, previewImageUrl);
//   };
//   return (
//     <>
//       <div className="homeIconContainerFinal">
//         <img
//           src={backB}
//           alt="backB"
//           onClick={() => {
//             navigate("/click-selfie");
//           }}
//         />
//         <img
//           src={homeB}
//           alt="homeB"
//           onClick={() => {
//             navigate("/");
//           }}
//         />
//       </div>
//       <div className="selfieInstruction">Click on an Image to Preview</div>

//       <div className="image-grid-container">
//         {imageList.map((file, index) => (
//           <div className="image-box" key={index}>
//             <img
//               src={`${import.meta.env.VITE_APP_S3_URL}/thumbnails/${
//                 file.thumbnailFileName
//               }`}
//               className="thumbnail"
//               alt="thumbnail"
//               onClick={() => magnifyImageSlider(file.originalFileName, index)}
//             />
//           </div>
//         ))}
//       </div>
//       {processing && (
//         <div className="progress-bar-background">
//           <div className="progress-bar-foreground">
//             <div className="process">Processing, please wait...</div>
//             <div className="process-count">{progress.toFixed(0)}%</div>
//           </div>
//         </div>
//       )}

//       <div className="download-footer">
//         <button onClick={handleDownloadAll}>{downloadButtonText}</button>
//       </div>
//       {previewImageUrl && (
//         <div className="popup-container">
//           <div className="popupInnerBox">
//             <div className="closeBtn">
//               <IoClose
//                 onClick={() => {
//                   setPreviewImageUrl(null);
//                   setPreivewUrlIndex(null);
//                 }}
//               />
//             </div>
//             <div className="imageContainer">
//               <img
//                 src={
//                   import.meta.env.VITE_APP_S3_URL +
//                   "/originals/" +
//                   previewImageUrl
//                 }
//                 alt="image"
//               />
//             </div>
//             <div className="sliderControl">
//               <div>
//                 <MdArrowBackIos onClick={() => prevImage(previewUrlIndex)} />
//               </div>
//               <div>
//                 <MdArrowForwardIos onClick={() => nextImage(previewUrlIndex)} />
//               </div>
//             </div>
//             <div className="download-single">
//               <button onClick={handleDownloadSingle}>Download</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ImageOutput;

import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import homeB from "../assets/images/homeB.png";
import backB from "../assets/images/backButton.png";
import { IoClose } from "react-icons/io5";

function ImageOutput() {
  const navigate = useNavigate();
  let location = useLocation();
  let initialImageList =
    location.state?.imageList.map((image) => ({
      ...image,
      isSelected: false,
    })) || [];
  const [imageList, setImageList] = useState(initialImageList);
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [previewUrlIndex, setPreivewUrlIndex] = useState(null);

  const handleDownloadAll = async () => {
    setProcessing(true);
    const selectedImages = imageList.filter((img) => img.isSelected);

    if (selectedImages.length === 1) {
      const image = selectedImages[0];
      const imageUrl = `${import.meta.env.VITE_APP_S3_URL}/originals/${
        image.originalFileName
      }`;
      const response = await fetch(imageUrl, {
        mode: "cors",
        cache: "no-cache",
      });
      const blob = await response.blob();
      saveAs(blob, image.originalFileName);
      setProcessing(false);
    } else {
      const zip = new JSZip();
      const imagesToDownload =
        selectedImages.length > 0 ? selectedImages : imageList;

      for (const [index, file] of imagesToDownload.entries()) {
        const imageUrl = `${import.meta.env.VITE_APP_S3_URL}/originals/${
          file.originalFileName
        }`;
        const response = await fetch(imageUrl, {
          mode: "cors",
          cache: "no-cache",
        });
        const blob = await response.blob();
        zip.file(file.originalFileName, blob);
        setProgress(Math.round(((index + 1) / imagesToDownload.length) * 100));
      }

      zip
        .generateAsync({ type: "blob" }, (metadata) => {
          setProgress(metadata.percent);
        })
        .then((content) => {
          saveAs(content, "images.zip");
          setProcessing(false);
          setProgress(0);
          setTimeout(() => {
            navigate("/thank-you");
          }, 2000);
        });
    }
  };

  const selectedCount = imageList.filter((img) => img.isSelected).length;
  const downloadButtonText =
    selectedCount > 0 ? `Download ${selectedCount} Images` : "Download All";

  const magnifyImageSlider = (imageName, index) => {
    setPreviewImageUrl(imageName);
    setPreivewUrlIndex(index);
  };

  const nextImage = () => {
    const newIndex = previewUrlIndex + 1;
    if (newIndex < imageList.length) {
      const nextImage = imageList[newIndex].originalFileName;
      setPreviewImageUrl(nextImage);
      setPreivewUrlIndex(newIndex);
    }
  };

  const prevImage = () => {
    const newIndex = previewUrlIndex - 1;
    if (newIndex >= 0) {
      const prevImage = imageList[newIndex].originalFileName;
      setPreviewImageUrl(prevImage);
      setPreivewUrlIndex(newIndex);
    }
  };

  const handleDownloadSingle = async () => {
    const imageUrl = `${
      import.meta.env.VITE_APP_S3_URL
    }/originals/${previewImageUrl}`;
    const response = await fetch(imageUrl, { mode: "cors", cache: "no-cache" });
    const blob = await response.blob();
    saveAs(blob, previewImageUrl);
  };

  return (
    <>
      <div className="homeIconContainerFinal">
        <img
          src={backB}
          alt="backB"
          onClick={() => {
            navigate("/click-selfie");
          }}
        />
        <img
          src={homeB}
          alt="homeB"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="selfieInstruction">Click on an Image to Preview</div>

      <div className="image-grid-container">
        {imageList.map((file, index) => (
          <div className="image-box" key={index}>
            <img
              src={`${import.meta.env.VITE_APP_S3_URL}/thumbnails/${
                file.thumbnailFileName
              }`}
              className="thumbnail"
              alt="thumbnail"
              onClick={() => magnifyImageSlider(file.originalFileName, index)}
            />
          </div>
        ))}
      </div>
      {processing && (
        <div className="progress-bar-background">
          <div className="progress-bar-foreground">
            <div className="process">Processing, please wait...</div>
            <div className="process-count">{progress.toFixed(0)}%</div>
          </div>
        </div>
      )}

      <div className="download-footer">
        <button onClick={handleDownloadAll}>{downloadButtonText}</button>
      </div>
      {previewImageUrl && (
        <div className="popup-container">
          <div className="popupInnerBox">
            <div className="closeBtn">
              <IoClose
                onClick={() => {
                  setPreviewImageUrl(null);
                  setPreivewUrlIndex(null);
                }}
              />
            </div>
            <div className="imageContainer">
              <img
                src={
                  import.meta.env.VITE_APP_S3_URL +
                  "/originals/" +
                  previewImageUrl
                }
                alt="image"
              />
            </div>
            <div className="sliderControl">
              <div>
                {previewUrlIndex > 0 && <MdArrowBackIos onClick={prevImage} />}
              </div>
              <div>
                {previewUrlIndex < imageList.length - 1 ? (
                  <MdArrowForwardIos onClick={nextImage} />
                ) : (
                  <MdArrowForwardIos style={{ opacity: 0.5 }} />
                )}
              </div>
            </div>
            <div className="download-single">
              <button onClick={handleDownloadSingle}>Download</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageOutput;
