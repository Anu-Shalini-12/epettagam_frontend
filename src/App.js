import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./components/Home/Home";
import AuthScreen from "./components/Home/AuthScreen"
import Esevai from "./components/Esevai/Esevai";
import EsevaiOtp from "./components/Esevai/EsevaiOtp";
import AddDoument from "./components/Esevai/AddDoument";
import LoginHeader from "./components/Layout/LoginHeader";
import MainLogin from "./components/Login/MainLogin";
import MainOTP from "./components/Login/Otp";
import ECertificatesHome from "./components/CertificateScreen/ECertificatesHome";
import AddEcertificates from "./components/CertificateScreen/AddEcertificates";
import RegistrationOtp from "./components/Modal/Registration/RegistrationOtp";
import HomeMyDoc from "./components/MyDocument/index";
import "./style/style.css";
import FullLayoutComponent from "./components/admin/FullLayoutComponent";
import LoginAdmin from "./components/admin/LoginAdmin";
import ResetPasswordScreen from "./components/admin/ResetPasswordScreen"
import ForgotpasswordScreen from "./components/admin/ForgotpasswordScreen";
import DocumentScreen from "./components/component/DocumentScreen"
import AdminDashboard from "./components/admin/AdminDashboard";
import "./AppMain.scss";
import AdminLayout from "./components/admin/AdminLayout";
import UserManagement from "./components/admin/UserManagement";
import AllDepartment from "./components/admin/AllDepartment";
import PrivacyPolicy from "./components/Login/PrivacyPolicy";
import "./i18n";
import WorkInProgress from "./components/Layout/WorkInProgress";
import RegistrationScreen from "./components/CertificateScreen/RegistrationScreen"
import RegistrationMCertScreen from "./components/CertificateScreen/RegistrationFormScreen"
import RegistrationDCertScreen from "./components/CertificateScreen/RegistrationDCertScreen"
import RegistrationBCertScreen from "./components/CertificateScreen/RegistrationBCertScreen"
import RegisterDocument from "./components/CertificateScreen/RegisterDocument"
import RegisterDocumentMcert from "./components/CertificateScreen/RegisterDocumentMcert"
import RegisterDocumentDcert from "./components/CertificateScreen/RegisterDocumentDcert"
import RegisterDocumentRegCert from "./components/CertificateScreen/RegisterDocumentRegCert"
import RegisterDocumentEduCert from "./components/CertificateScreen/RegisterDocumentEduCert"
import RegisterDocumentDMECert from "./components/CertificateScreen/RegisterDocumentDMECert"
import RegisterDocumentDMECertTab from "./components/CertificateScreen/RegisterDocumentDMECertTab"
import RegisterDocumentEsevaiCertTab from "./components/CertificateScreen/RegisterDocumentEsevaiCertTab"
import DiplomaCertTab from "./components/CertificateScreen/DiplomaCertTab";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginHeader />}>
          <Route index element={<MainLogin />} />
          <Route path="/Admin" element={<MainLogin />} />
          <Route path="Otp" element={<MainOTP />} />
          <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="auth/dashboard" element={<AuthScreen />} />
        </Route>
        <Route path="/OurServices/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="Registration" element={<RegistrationScreen />} />
          <Route path="eCertificates" element={<ECertificatesHome />} />
          <Route path="eCertificates/addDocument" element={<AddEcertificates />} />
          <Route path="eCertificates/otp" element={<RegistrationOtp />} />
          <Route path="esevai" element={<Esevai />} />
          <Route path="esevai/otp" element={<EsevaiOtp />} />
          <Route path="esevai/addDocument" element={<AddDoument />} />
          <Route path="Register_document_EduCertTab" element={<RegisterDocumentDMECertTab />} />
          <Route path="Register_document_DiplomaCertTab" element={<DiplomaCertTab />} />
          <Route path="Register_document_EsevaiCertTab" element={<RegisterDocumentEsevaiCertTab />} />
          <Route path="Register_document_MCert" element={<RegisterDocumentMcert />} />
          <Route path="Register_document_DCert" element={<RegisterDocumentDcert />} />
          <Route path="Register_document_BCert" element={<RegisterDocument />} />
        </Route>
        <Route path="/Diploma/" element={<Header />}>
          <Route index element={<RegistrationOtp />} />
        </Route>
        <Route path="/MyDocument/" element={<Header />}>
          <Route index element={<HomeMyDoc />} />
          <Route path="Register_document_RegCert" element={<RegisterDocumentRegCert />} />
          <Route path="Register_document_EduCert" element={<RegisterDocumentEduCert />} />
          <Route path="Register_document_DmeCert" element={<RegisterDocumentDMECert />} />
        </Route>
        <Route path="/Document/Certificate" element={<Header />}>
          <Route index element={<DocumentScreen />} />
        </Route>
        <Route path="`/Certificate/MCert`" element={<Header />}>
          <Route index element={<RegistrationMCertScreen />} />
        </Route>
        <Route path="/Certificate/DCert" element={<Header />}>
          <Route index element={<RegistrationDCertScreen />} />
        </Route>
        <Route path="/Certificate/BCert" element={<Header />}>
          <Route index element={<RegistrationBCertScreen />} />
        </Route>



        <Route path="/admin" element={<FullLayoutComponent />}>
          <Route index element={<LoginAdmin />} />
          <Route path="reset-password" element={<ResetPasswordScreen />} />
          <Route path="forgot-password" element={<ForgotpasswordScreen />} />
        </Route>


        <Route path="/dashboard/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="all_department" element={<AllDepartment />} />
        </Route>
        <Route path="/service-unavailable" element={<WorkInProgress />} />
      </Routes>
    </Router>
  );
}

export default App;
