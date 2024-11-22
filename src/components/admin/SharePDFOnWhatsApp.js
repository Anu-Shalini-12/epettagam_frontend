import React from "react";
import { WhatsappShareButton } from "react-share";
import { PiWhatsappLogoFill } from "react-icons/pi";

function base64ToBlob(base64Data, contentType = "application/pdf") {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
}

function generateBlobURL(blob) {
    return window.URL.createObjectURL(blob);
}

const SharePDFOnWhatsApp = (props) => {

  const base64Pdf = props.pdfData;

  const blob = base64ToBlob(base64Pdf);
  const pdfUrl = generateBlobURL(blob);

  return (
    <div>
      <WhatsappShareButton url={pdfUrl}>
        <button style={{marginLeft:'30%'}}><PiWhatsappLogoFill style={{fontSize:'50px',color:'#4bc557',marginTop:'-3%',marginBottom:'3%',marginLeft:'40%'}}/></button>
      </WhatsappShareButton>
    </div>
  );
};

export default SharePDFOnWhatsApp;
