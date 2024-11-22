import React from 'react';
import { MdOutlineEmail } from "react-icons/md";
import Swal from "sweetalert2";

const pdfUrl=(data)=>{
  return(
    <embed 
    src={`data:application/pdf;base64,${data}`} height={80} width={80} />
  )
}


const Base64ToPDFUrl = ({ pdfData,consentpop }) => {


  const handleShareByEmail = () => {
    if(consentpop === true){
      const emailSubject = encodeURIComponent('Check out this PDF!');
      const emailBody = (`Here is the PDF you wanted to see: ${pdfUrl(pdfData)}`);
      const emailAddress = 'recipient@example.com';
      const mailtoUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

      window.location.href = mailtoUrl;
    }else{
      Swal.fire({
        icon: "warning",
        title: "",
        text: 'Please give your consent to share the certificate',
        confirmButtonText: "OK", 
        confirmButtonColor: "#154272",
      });
    }
  };
  return (
    <div style={{marginLeft:'30px'}}>
      <button onClick={handleShareByEmail}><MdOutlineEmail style={{fontSize:'50px',color:'black',marginTop:'-3%',marginBottom:'3%'}}/></button>
    </div>
  );
};

export default Base64ToPDFUrl;
