import React, { useState, useEffect } from "react";
import ModalData from "./Modal";
import ModalData1 from "./Modal1";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import ButtonFill from "../component/UI/ButtonFill";
import { getCertData, getCertificates } from "../store/esevai/action";
import axios from "axios";
import Swal from "sweetalert2";
import { Buffer } from "buffer";
import { BASE_URL } from "../utilities/config";
import loader from "../../Assets/Loading_2.gif";
import { useTranslation } from "react-i18next";

const UpdateModal = (props) => {
  const { t, i18n } = useTranslation();
  const [open] = useState(true);

  const dispatch = useDispatch();
  const services = useSelector((store) => store.esevai);
  let loginData = useSelector((store) => store.certificate.otp_verification);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedData] = useState(0);
  const [repeatloop, setrepeatloop] = useState(0);
  const [selctValue, setselctValue] = useState("");
  const [pdfUrlData, setpdfData] = useState(undefined);
  const [consent, setconsent] = useState();
  const navigate = useNavigate();

  const handleconsent = () => {
    if (consent === true) {
      setconsent(false);
    } else {
      setconsent(true);
    }
  };

  useEffect(() => {
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 502) {
          window.location.href = "/service-unavailable"; 
        }
        return Promise.reject(err);
      }
    );
    if (selectedIndex === 0) {
      setSelectedIndex(1);
      const data123 = {
        url: props.certificate[0]?.data.OUTPUTURL[0],
      };
      axios
        .post(`${BASE_URL}esevai/getpdf`, data123, {
          responseType: "arraybuffer",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          const url = Buffer.from(res.data).toString("base64");
          setpdfData(url);
        })
        .catch((err) => {
        });
    }
  }, [props.certificate, props.selectData, selectedIndex]);

  const handleDaata = () => {
    setrepeatloop(0);
  };
  const datahandle = () => {
    setrepeatloop(1);
  };

  if (repeatloop === 1) {
    const body = {
      certificateno: props.certificate[0]?.data.APPNO[0],
    };
    dispatch(getCertData(body, loginData?.data?.token));
    setrepeatloop(2);
  }
  const AddToWallet = () => {
    if (consent === true) {
      const body = {
        certificatedetails: {
          SERVICENAME:
            services.certData["SERVICE NAME"] !== undefined
              ? services.certData["SERVICE NAME"][0]
              : "NA",
          APPLICANTNAME:
            services.certData["APPLICANT NAME"] !== undefined
              ? services.certData["APPLICANT NAME"][0]
              : "NA",
          FATHERHUSNAME:
            services.certData["FATHER/HUSBAND NAME"] !== undefined
              ? services.certData["FATHER/HUSBAND NAME"][0]
              : "NA",
          ADDRESS:
            services.certData.ADDRESS !== undefined
              ? services.certData.ADDRESS[0]
              : "NA",
          VILLTOWN:
            services.certData["VILLAGE/TOWN"] !== undefined
              ? services.certData["VILLAGE/TOWN"][0]
              : "NA",
          TALUK:
            services.certData.TALUK !== undefined
              ? services.certData.TALUK[0]
              : "NA",
          DISTRICT:
            services.certData.DISTRICT !== undefined
              ? services.certData.DISTRICT[0]
              : "NA",
          PINCODE:
            services.certData.PINCODE !== undefined
              ? services.certData.PINCODE[0]
              : "NA",
          OCCUPATION:
            services.certData.OCCUPATION !== undefined
              ? services.certData.OCCUPATION[0]
              : "NA",
          ANNUALINCOME:
            services.certData["ANNUAL INCOME"] !== undefined
              ? services.certData["ANNUAL INCOME"][0]
              : "NA",
          ISSUINGAUTHORITY:
            services.certData["ISSUING AUTHORITY"] !== undefined
              ? services.certData["ISSUING AUTHORITY"][0]
              : "NA",
          AADHAARNO:
            services.certData["AADHAR NO."] !== undefined
              ? services.certData["AADHAR NO."][0]
              : "NA",
          DATEOFISSUE:
            services.certData["DATE OF ISSUE"] !== undefined
              ? services.certData["DATE OF ISSUE"][0]
              : "NA",
          DATEOFEXPIRY:
            services.certData["DATE OF EXPIRY"] !== undefined
              ? services.certData["DATE OF EXPIRY"][0]
              : "NA",
          CERTIFICATENO:
            services.certData.CERTIFICATENO !== undefined
              ? services.certData.CERTIFICATENO[0]
              : "NA",
        },
        certificatelink:
          services.certData.OUTPUTPDF !== undefined
            ? services.certData.OUTPUTPDF[0]
            : "NA",
        certificateno:
          services.certData.CERTIFICATENO !== undefined
            ? services.certData.CERTIFICATENO[0]
            : "NA",
      };
      axios
        .post(`${BASE_URL}esevai/addtowallet`, body, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          if (res.data.status === true) {
            props.handleUpdate();
            Swal.fire({
              icon: "success",
              title: "",
              text: "Certificate add to blockchain successfully",
              confirmButtonText: "OK",
              confirmButtonColor: "#154272",
            }).then(function () {
              navigate("/OurServices/esevai/addDocument");
            });
          }
        })
        .catch((err) => {
          props.handleUpdate();
          Swal.fire({
            icon: "error",
            title: "",
            text: err.response.data.message,
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          });

          if (err?.response?.status === 401) {
            const data = {
              makkalid: sessionStorage.user,
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios
              // eslint-disable-next-line no-useless-concat
              .post(`${BASE_URL}` + `user/token`, data)
              .then((res) => {
                sessionStorage.setItem("authtoken", res.data.data.token);
                sessionStorage.setItem(
                  "refreshToken",
                  res.data.data.refreshToken
                );
                window.location.reload();
              })
              .catch((err) => {
                const data = {
                  refreshToken: sessionStorage.getItem("refreshToken"),
                };
                // eslint-disable-next-line no-useless-concat
                axios.post(`${BASE_URL}` + "user/logout", data).then((res) => {
                  Swal.fire({
                    icon: "error",
                    title: "Session Expired",
                    text: "",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#154272",
                  }).then(function () {
                    window.location.href = "/";
                  });
                });
              });
          }
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please give your consent to share the certificate",
        text: "",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      }).then(function () {
        window.location.href = "/";
      });
    }
  };

  let ListData = [];
  if (props.selectData.length !== 0) {
    for (var i = 0; i < props.selectData.length; i++) {
      for (var k = 0; k < props.services.length; k++) {
        if (props.selectData[i] == props.services[k].servicecode) {
          ListData.push(props.services[k]);
        }
      }
    }
  }

  const handleselect = (e) => {
    setselctValue(e.target.value);
    props.handleSubmit(e.target.value);
  };

  return (
    <div>
      {props?.certificate[0]?.data?.APPNO.length !== 0 ? (
        <ModalData open={open} onClick={() => props.onCloseModal()} center>
          <div style={{ height: "100%", overflowY: "scroll" }}>
            <div style={{ display: "flex" }}>
              <a
                href
                onClick={props.handleUpdate}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginLeft: "93%",
                  marginTop: "1%",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              >
                X
              </a>
            </div>
            <div>
              <div
                className="justify-center text-xl font-bold"
                style={{ marginLeft: "21%", marginBottom: "20px" }}>
                <p className="justify-center">{t("fetch_cert")}</p>
              </div>
              <div>
                <center>
                  {props.fetchCert === false ? (
                    <select
                      onChange={handleselect}
                      value={selctValue}
                      style={{
                        padding: "10px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                        marginBottom: "1rem",
                        width: "300px",
                      }}
                    >
                      <option>Select</option>
                      {ListData.length !== 0 &&
                        ListData.map((item) => (
                          <option value={item.servicecode}>
                            {item.service}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <img src={loader} style={{ width: "50px" }} />
                  )}
                </center>
              </div>
              <div className="flex justify-center">
                <a
                  href
                  onClick={handleDaata}
                  style={{ cursor: "pointer" }}
                  disabled
                >
                  <ChevronLeftIcon className="w-8 h-8 text-blue-500" />
                </a>
                <p className="ml-6 font-bold">Certificate</p>
                <a href onClick={datahandle} style={{ cursor: "pointer" }}>
                  <ChevronRightIcon className="w-8 h-8 ml-6 text-blue-500" />
                </a>
              </div>

              {repeatloop === 0 ? (
                <>
                  <div
                    className="justify-center"
                    style={{
                      marginLeft: "4%",
                      height: "300px",
                      overflowY: "scroll",
                      overflowX: "hidden",
                      border: "2px solid black",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <embed
                      src={`data:application/pdf;base64,${pdfUrlData}`}
                      width={600}
                      height={1000}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <div
                    className="grid justify-center grid-cols-2 gap-8 mt-6 "
                    style={{ display: "flex", width: "70%", marginLeft: "27%" }}
                  >
                    <div
                      className="justify-center font-bold"
                      style={{ width: "35%" }}
                    >
                      {t("Name")}
                    </div>
                    <div
                      className="justify-center font-bold"
                      style={{ width: "10%" }}
                    >
                      :
                    </div>
                    <div className="justify-center" style={{ width: "45%" }}>
                      {services?.certData !== undefined && (
                        <>{services?.certData["APPLICANT NAME"][0]}</>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid justify-center grid-cols-2 gap-8 mt-6 "
                    style={{ display: "flex", width: "70%", marginLeft: "15%" }}
                  >
                    <div
                      className="justify-center font-bold"
                      style={{ width: "35%" }}
                    >
                      {t("DO")}
                    </div>
                    <div
                      className="justify-center font-bold"
                      style={{ width: "10%" }}
                    >
                      :
                    </div>
                    <div className="justify-center">
                      {services.certData !== undefined && (
                        <>{services.certData["FATHER/HUSBAND NAME"][0]}</>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid justify-center grid-cols-2 gap-8 mt-6 "
                    style={{ display: "flex", width: "70%", marginLeft: "27%" }}
                  >
                    <div
                      className="justify-center font-bold"
                      style={{ width: "35%" }}
                    >
                      {t("No")}
                    </div>
                    <div
                      className="justify-center font-bold"
                      style={{ width: "10%" }}
                    >
                      :
                    </div>
                    <div className="justify-center" style={{ width: "45%" }}>
                      {services.certData !== undefined && (
                        <>{services.certData.CERTIFICATENO[0]}</>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid justify-center grid-cols-2 gap-8 mt-6 "
                    style={{ display: "flex", width: "70%", marginLeft: "27%" }}
                  >
                    <div
                      className="justify-center font-bold"
                      style={{ width: "35%" }}
                    >
                      Date Of Issue
                    </div>
                    <div
                      className="justify-center font-bold"
                      style={{ width: "10%" }}
                    >
                      :
                    </div>
                    <div className="justify-center" style={{ width: "45%" }}>
                      {services.certData !== undefined && (
                        <>{services.certData["DATE OF ISSUE"][0]}</>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid justify-center grid-cols-2 gap-8 mt-6 "
                    style={{ display: "flex", width: "70%", marginLeft: "27%" }}
                  >
                    <div
                      className="justify-center font-bold"
                      style={{ width: "35%" }}
                    >
                      District
                    </div>
                    <div
                      className="justify-center font-bold"
                      style={{ width: "10%" }}
                    >
                      :
                    </div>
                    <div className="justify-center" style={{ width: "45%" }}>
                      {services.certData !== undefined && (
                        <>{services.certData.DISTRICT[0]}</>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid justify-center grid-cols-2 gap-8 mt-6 "
                    style={{ display: "flex", width: "70%", marginLeft: "27%" }}
                  >
                    <div
                      className="justify-center font-bold"
                      style={{ width: "35%" }}
                    >
                      Issuing Authority
                    </div>
                    <div
                      className="justify-center font-bold"
                      style={{ width: "10%" }}
                    >
                      :
                    </div>
                    <div className="justify-center" style={{ width: "45%" }}>
                      {services.certData !== undefined && (
                        <>{services.certData["ISSUING AUTHORITY"][0]}</>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center mt-10"></div>
              {repeatloop !== 0 && (
                <>
                  <div className="flex justify-center m-12 space-x-2">
                    <input
                      type="checkbox"
                      className="self-center"
                      onClick={() => handleconsent()}
                    />
                    <p className="font-bold">{t("IConfirm")}</p>
                  </div>
                  <div
                    style={{
                      marginLeft: "25%",
                      width: "40%",
                      marginBottom: "1rem",
                    }}
                  >
                    <ButtonFill onClick={AddToWallet}>{t("add")}</ButtonFill>
                  </div>
                </>
              )}
            </div>
          </div>
        </ModalData>
      ) : (
        <ModalData1 open={open} onClick={() => props.onCloseModal()} center>
          <div>
            <div style={{ height: "100%", overflowY: "scroll" }}>
              <div style={{ display: "flex" }}>
                <a
                  href
                  onClick={props.handleUpdate}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    marginLeft: "93%",
                    marginTop: "1%",
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                >
                  X
                </a>
              </div>

              <div
                className="justify-center text-xl font-bold"
                style={{marginBottom: "20px" }}
              >
                <center>
                  {props.certificate[0].message ===
                    "No data found for respective serivce" && (
                    <h3
                      style={{
                        fontSize: "20px",
                        marginTop: "4rem",
                        fontWeight: "bold",
                        color: "rgb(73, 132, 202)",
                      }}
                    >
                      {" "}
                      {t("noDataFound")}
                    </h3>
                  )}
                </center>
              </div>
            </div>
          </div>
        </ModalData1>
      )}
    </div>
  );
};
export default UpdateModal;
