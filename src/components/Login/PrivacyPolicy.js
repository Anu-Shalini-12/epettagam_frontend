import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import logo from "../../Assets/Mask_Group_1.png";
import "../../style/style.css";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Document, Page } from 'react-pdf';
import play from '../../Assets/google-play.svg'
import Scanner from '../../Assets/adobe_express.png'
import samplePDF from '../../Assets/Privacy Policy (1) (1).pdf';

function PrivacyPolicy() {

  return (
    <div className="Area">
        <div style={{marginLeft:'10%'}}>
            <iframe
              style={{ display: "block", width: "90%",height:'90vh'}}
              title="PdfFrame"
              src={samplePDF}
              frameborder="0"
              type="application/pdf"
            ></iframe>
        </div>
    </div>
  );
}

export default PrivacyPolicy;
