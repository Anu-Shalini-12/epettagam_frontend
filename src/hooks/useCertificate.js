import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../components/utilities/config";
const API_URL = `${BASE_URL}edu/`;

const body = {
  fullname: "A K MANU ARERAA",
  rollno: "508668",
  year: "2017",
  dob: "12-06-2000",
  certificatetype: "REGULAR",
  flag: "XII",
  month: "MAR",
  digilockerid: "sample11-1aa1-11a1-10a0-digilockerid",
  format: "xml",
};

function useCertificate(dept) {
  const [certificate, setCertificate] = useState();
  useEffect(() => {
    axios
      .post(API_URL + `${dept}/getcerts`, body)
      .then((response) => {
        return response.data;
      })
      .then((res) => {
        if (res.statusCode === true) {
          setCertificate(res);
        } else {
        }
      })
      .catch((err) => {
      });
  }, []);
  return certificate;
}

export default useCertificate;
