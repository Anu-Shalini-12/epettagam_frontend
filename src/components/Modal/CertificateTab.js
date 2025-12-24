import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import ButtonFill from "../component/UI/ButtonFill";
import { useSelector, useDispatch } from "react-redux";
import { pdfjs } from "react-pdf";
import PdfComponent from "../Layout/MyComponent";
import {
  GetCertificateDetails,
  GetCertificateXml,
} from "../store/certificates/action";
import axios from "axios";
import Swal from "sweetalert2";
import loading from "../../Assets/Loading_2.gif";
import { useTranslation } from "react-i18next";


//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`
function CertificateTab({ certificate, dataRec, urlData, EduCert }, props) {
  const { t, i18n } = useTranslation();
  let certDetails = useSelector((store) => store.certificate.certDetails);
  let certXmlData = useSelector((store) => store.certificate.certDetailsXml);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [walletLoad, setWallet] = useState(false);
  const [repetDta, setRepdata] = useState(false);
  const [wall, setWall] = useState(false);
  const [valueRoll, setRoll] = useState(false);
  const [certificateUrl, setCertificate] = useState("");
  const [consent, setconsent] = useState("");
  const dispatch = useDispatch();

  const handleconsent = () => {
    if (consent == true) {
      setconsent(false);
    } else {
      setconsent(true);
    }
  };
  if (repetDta === false) {
    setCertificate(certDetails);
    setRepdata(true);
  }


  const certPDF = () => {
    const body = {
      fullname: dataRec.fullname,
      rollno: dataRec.rollno,
      year: dataRec.year,
      dob: dataRec.dob,
      certificatetype: dataRec.certificatetype,
      flag: dataRec.flag,
      month: dataRec.month,
      format: "pdf",
    };
    if (dataRec.flag === "X") {
      dispatch(GetCertificateDetails("ssc", body));
    }
    if (dataRec.flag === "XI") {
      dispatch(GetCertificateDetails("hscxi", body));
    }
    if (dataRec.flag === "XII") {
      dispatch(GetCertificateDetails("hsc", body));
    }
  };
  const certData = () => {
    const body = {
      fullname: dataRec.fullname,
      rollno: dataRec.rollno,
      year: dataRec.year,
      dob: dataRec.dob,
      certificatetype: dataRec.certificatetype,
      flag: dataRec.flag,
      month: dataRec.month,
      format: "xml",
    };
    if (dataRec.flag === "X") {
      dispatch(GetCertificateXml("ssc", body));
    }
    if (dataRec.flag === "XI") {
      dispatch(GetCertificateXml("hscxi", body));
    }
    if (dataRec.flag === "XII") {
      dispatch(GetCertificateXml("hsc", body));
    }
  };

  const AddToWallet = () => {
    if (consent == true) {
      setWallet(true);
      var dept = "";
      if (dataRec.flag === "X") {
        dept = "ssc";
      } else if (dataRec.flag === "XI") {
        dept = "hscxi";
      } else {
        dept = "hsc";
      }

      const data = {
        certificatedetails: certXmlData.data.Certificate,
        rollno: certXmlData.data.Certificate.issuedTo.person.roll,
        certificatename: certDetails.data.certificate.filename,
        flag: dataRec.flag,
      };
      axios
        // eslint-disable-next-line no-useless-concat
        .post(`https://www.epettagam.tn.gov.in/wallet/` + `edu/` + dept + `/addtowallet`, data, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "",
            text:
            res.data.message,
            confirmButtonText: "OK",
          });
          setWallet(false);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "",
            text:
            err.response.data.message,
            confirmButtonText: "OK",
          });
          setWallet(false);
        });
    } else {
      alert("Please give your consent to share the certificate");
    }
  };

  if (wall === false) {
    setWall(true);
    for (var i = 0; i <= EduCert.length; i++) {
      if (EduCert[i]?.rollno === dataRec?.rollno) {
        setRoll(true);
      }
    }
  }


  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="w-full h-auto p-8 m-4 ">
        <Tab.Group
          as="div"
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          className="w-full "
        >
          <Tab.List className="flex justify-around w-full">
            <Tab>
              <a href onClick={certPDF}>
                <ChevronLeftIcon className="w-8 h-8 text-blue-500" />
              </a>
            </Tab>
            <div>
              {selectedIndex === 0 ? (
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {t("cert")}
                </p>
              ) : (
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {t("certData")}
                </p>
              )}
            </div>
            <Tab>
              <a href onClick={certData}>
                <ChevronRightIcon className="w-8 h-8 text-blue-500" />
              </a>
            </Tab>
          </Tab.List>
          <Tab.Panels className="flex w-full ">
            <Tab.Panel>
              <div id="pdfshown"
              >
                <PdfComponent pdfData={certificateUrl} />
              </div>
            </Tab.Panel>
            <Tab.Panel className="min-w-full mt-12 d-grid">
              <div className="">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("Name")}</div>
                      </div>
                      <div className="col-md-6">
                        :
                        {certXmlData.data !== undefined &&
                          certXmlData.data.Certificate.issuedTo.person.name}
                      </div>
                    </div>
                    <div className="mt-2 row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("Year_Passing")}</div>
                      </div>
                      <div className="col-md-6">
                          :{" "}
                        {certXmlData.data !== undefined &&
                          certXmlData.data.Certificate.CertificateData.examination
                            .year}
                      </div>
                    </div>
                    <div className="mt-2 row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("date")}</div>
                      </div>
                      <div className="col-md-6">
                          :{" "}
                        {certXmlData.data !== undefined &&
                          certXmlData.data.Certificate.issuedTo.person.dob}
                      </div>
                    </div>
                    <div className="mt-2 row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("permanent")}</div>
                      </div>
                      <div className="col-md-6">
                        : -
                        
                      </div>
                    </div>
                    <div className="mt-2 row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("Medium")}</div>
                      </div>
                      <div className="col-md-6">
                      :{" "}
                        {certXmlData.data !== undefined &&
                          certXmlData.data.Certificate.CertificateData.school
                            .medium}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("Grade")}</div>
                      </div>
                      <div className="col-md-6">
                        : -
                      </div>
                    </div>
                    <div className="mt-2 row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("tmr")}</div>
                      </div>
                      <div className="col-md-6">
                      :{" "}
                      {certXmlData.data !== undefined &&
                        certXmlData.data.Certificate.CertificateData.info.tmrCode}
                      </div>
                    </div>
                    <div className="mt-2 row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("docReg")}</div>
                      </div>
                      <div className="col-md-6">
                          : -
                      </div>
                    </div>
                    <div className="mt-2 row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("tmrdate")}</div>
                      </div>
                      <div className="col-md-6">
                        : {" "}
                        {certXmlData.data !== undefined &&
                          certXmlData.data.Certificate.CertificateData.info.tmrDate}
                        
                      </div>
                    </div>
                    <div className="mt-2 row">
                      <div className="col-md-6">
                        <div className="font-bold">{t("Group_Name")}</div>
                      </div>
                      <div className="col-md-6">
                    :{" "}
                    {certXmlData.data !== undefined &&
                      certXmlData.data.Certificate.CertificateData.info
                        .groupName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-24 h-100" style={{overflowX:'auto'}}>
                <table className="table-auto ">
                  <thead
                    className="bg-white border-b "
                    style={{ backgroundColor: "#902A2B36" }}
                  >
                    <tr>
                      <th className="p-4">{t("Subject")}</th>
                      <th className="p-4">{t("Theory")}</th>
                      <th className="p-4">{t("Practical")}</th>
                      <th className="p-4">{t("Internal")}</th>
                      <th className="p-4">{t("mark")}</th>
                      <th className="p-4">{t("Year_Passing")}</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {certXmlData.data !== undefined &&
                      certXmlData.data.Certificate.CertificateData.performance.subjects.map(
                        (sub, index) => {
                          return (
                            <tr
                              key={index}
                              style={{
                                backgroundColor:
                                  index % 2 !== 0 ? "#FBF8F8" : "",
                              }}
                            >
                              <td className="p-4">{sub.name}</td>

                              <td>
                                <center>
                                  {sub.marksTheory !== undefined ? (
                                    <p>{sub.marksTheory} </p>
                                  ) : (
                                    <p>-</p>
                                  )}
                                </center>
                              </td>
                              <td><center>{sub.marksPractical}</center></td>
                              <td><center>{sub.marksInternal}</center></td>
                              <td><center>{sub.marksTotal}</center></td>
                              <td>
                                <center>
                                  {sub.rollSessionYear !== undefined ? (
                                    <p>{sub.rollSessionYear}</p>
                                  ) : (
                                    <p>-</p>
                                  )}
                                </center>
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
        <div style={{ width: "100%",marginTop:'95px' }}>
          {selectedIndex === 1 && (
            <div className="flex justify-center space-x-2">
              <input
                type="checkbox"
                className="self-center"
                onClick={() => handleconsent()}
              />
              <p className="font-bold">
                {t("IConfirm")}
              </p>
            </div>
          )}
          {selectedIndex === 1 && (
            <div>
            {walletLoad === false ? (
            <div
              className="flex justify-end"
              style={{ marginLeft: "0%" }}
            >
              
                <ButtonFill onClick={AddToWallet}>
                  {t("add")} 
                </ButtonFill>
            </div>
            ) : (
              <img alt='' src={loading} width="50" height="50" style={{marginLeft:'46%'}} />
            )}
            </div>
          )}
        </div>
    </div>
  );
}

export default CertificateTab;
