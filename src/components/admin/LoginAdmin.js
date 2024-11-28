import React from "react";
import { Component } from "react";
import Swal from "sweetalert2";
import { user_login, verify_otp_func } from "../store/certificates/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TimerComp from "./TimerComp"
import axios from "axios";
import { BsEye ,BsEyeSlash} from "react-icons/bs";


class LoginAdmin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      otp: null,
      showOtp: false,
      time : new Date(),
      eye: false
    };
  }

  componentDidMount(){
    sessionStorage.clear() 
  }

  componentDidUpdate(prev) { 
    if (prev.login_message !== this.props.login_message) {
      if (this.props.login_message.status === true) {
        this.setState({ ...this.state, showOtp: true,time : new Date() });
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: 'Please check your email.',
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
        });
      } else {
        this.setState({ ...this.state, showOtp: false });
        Swal.fire({
          icon: "error",
          title: "OTP Error",
          text: 'Some issue has been occured.',
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
        });
      }
    }

    if(prev.loginErr !== this.props.loginErr){
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: this.props.loginErr?.response?.data?.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
    }

    if (prev.verify_otp !== this.props.verify_otp) {
      sessionStorage.setItem("authToken", this.props.verify_otp.user.token);
      sessionStorage.setItem(
        "refreshToken",
        this.props.verify_otp.user.refreshToken
      );
      sessionStorage.setItem("urlData", "/dashboard/");
      const data = "";
    
        Swal.fire({
          icon: "success",
        title: "Login successful",
        text: '',
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      }).then(function() {
              (window.location.href = "/dashboard/" + data)
      });
    }
  }
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleOTPVerify = () => {
    if (this.state.otp.length === 6)
      this.props.verify_otp_func(this.state.email, this.state.otp);
    else 
    Swal.fire({
      icon: "error",
      title: "OTP Error",
      text: 'Please check the OTP',
      confirmButtonText: "OK",
      confirmButtonColor: "#154272",
    });
  };

  handleGenerateOtp = () => { debugger;
    this.setState({
      showOtp: false
    })
    this.props.user_login(this.state.email, this.state.password);
  };

  handleTimer=(data)=>{
  }

  handleforgot=()=>{
    if(this.state.email !== undefined){
      const body={
        email:this.state.email
      }
      axios.post('https://www.epettagam.tn.gov.in/wallet/ad/forgotpassword',body)
      .then((res)=> {
        sessionStorage.setItem("email", this.state.email)
        Swal.fire({
          icon: "success",
          title: "",
          text: "Otp sent to your registered emailId",
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
        })
        window.location.href=('/forgot-password')
      }).catch((err)=>{
        Swal.fire({
          icon: "error",
          title: "",
          text: err.response.data.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
        });
    })
    }else{
      Swal.fire({
        icon: "error",
        title: "",
        text: 'Please enter the email',
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
    }
  }

  handleEye=()=>{
    this.setState({
        eye: !this.state.eye
    })
  }

  render() {
        
    return (
      <>
        <div className="login-form-layout">
          <div className="login-form">
            <div className="row">
              <div className="col-md-12">
                <h5>Welcome! Login to the admin portal</h5>
              </div>
              <div className="mt-10 col-md-10">
                <div className="form-group">
                  <label for="exampleInputEmail1">Email Id</label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleOnChange}
                    value={this.state.email}
                    className="mt-2 form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="mt-4 form-group">
                  <label for="exampleInputPassword">Password</label>
                  <input
                    type={this.state.eye === false ? "password" : "text"}
                    name="password"
                    onChange={this.handleOnChange}
                    value={this.state.password}
                    className="mt-2 form-control"
                    id="exampleInputPassword"
                    placeholder="Enter Password"
                  />
                  <div >{this.state.eye === false ? <BsEye id="eyeSymbol" style={{cursor:'pointer'}} onClick={this.handleEye}/> : <BsEyeSlash id="eyeSymbol" style={{cursor:'pointer'}} onClick={this.handleEye}/> }</div>
                </div>
                {this.state.showOtp && (
                  <div className="mt-4 form-group">
                    <label for="exampleInputOtp">OTP</label>
                    <input
                      type="otp"
                      name="otp"
                      onChange={this.handleOnChange}
                      value={this.state.otp}
                      className="mt-2 form-control"
                      id="exampleInputOtp"
                      placeholder="Enter OTP"
                    />
                  </div>
                )}
                {this.state.showOtp === false &&
                  <a href className="" style={{marginTop:'20px',color:'#03596e',cursor:'pointer',fontWeight:'bold'}} onClick={this.handleforgot}> <br/>Forgot Password ? <br/></a>
                }
                {this.state.showOtp && (
                  <a href style={{color:'#03596e',cursor:'pointer',fontWeight:'bold'}} onClick={this.handleGenerateOtp}>Resend OTP?</a>
                )}
                {this.state.showOtp && (
                 <TimerComp time={this.state.time.setSeconds(this.state.time.getSeconds() + 180)}/>)}
                {this.state.showOtp === false && (
                  <button
                    onClick={this.handleGenerateOtp}
                    className="mt-5 btn btn-secondary"
                  >
                    Submit
                  </button>
                )}
                {this.state.showOtp && (
                  <>
                    <button
                      onClick={this.handleOTPVerify}
                      className="mt-5 btn btn-secondary"
                    >
                      Verify
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login_message: state.certificate.login_message,
    verify_otp: state.certificate.verify_otp,
    loginErr: state.certificate.errorLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      user_login,
      verify_otp_func,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginAdmin);
