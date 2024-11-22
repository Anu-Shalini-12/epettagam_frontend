import React from "react";
import { Component } from "react";
import Swal from "sweetalert2";
import { user_login, verify_otp_func } from "../store/certificates/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { BsEye ,BsEyeSlash} from "react-icons/bs";
import ValidatePassword from "validate-password";


class LoginAdmin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      otp: null,
      showOtp: false,
      time : new Date(),
      eye: false,
      eye1: false,
      errors:'',
      newPassword:'',
      rePassword:'',
    };
  }

  componentDidMount(){
  }

  componentDidUpdate(prev){}

  
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

 
  handleValidation() {
    const errors = {};
    let formIsValid = true;

    if (this.state.newPassword === undefined || this.state.newPassword === "") {
      formIsValid = false;
      errors.newPassword = "This is a required field";
    }

    var validator = new ValidatePassword();
    var passwordData = validator.checkPassword(this.state.newPassword);
    if (passwordData.isValid === false) {
      formIsValid = false;
      errors.newPassword =
        "Password should contain 1 number 1 special character 1 upper case alphabet";
    } else if (this.state.newPassword.length < 8) {
      formIsValid = false;
      errors.newPassword =
        "Set minimum password length to at least a value of 8";
    } else {
      formIsValid = true;
    }

    if (this.state.rePassword === undefined || this.state.rePassword === "") {
      formIsValid = false;
      errors.rePassword = "This is a required field";
    }
    if (this.state.rePassword !== this.state.newPassword) {
      formIsValid = false;
      errors.rePassword = "Password does not match";
    }

    this.setState({ errors });
    return formIsValid;
  }
 

  restPassword=()=>{
    if(this.handleValidation()){
      const body={
        email : sessionStorage.getItem("email"),
        password :this.state.newPassword,
        confirmpassword: this.state.rePassword,
        token: sessionStorage.getItem("passToken")
      }
      axios.post('https://www.epettagam.tn.gov.in/wallet/ad/resetpassword',body)
      .then((res)=> {
        sessionStorage.setItem("email", this.state.email)
        Swal.fire({
            icon: "success",
            title: "",
            text: "password reset successful",
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          }).then(function () {
            window.location.href=('/admin')
          });
       
      }).catch((err)=>{})
    }    
  }
  
  handleEye=()=>{
    this.setState({
        eye: !this.state.eye
    })
  }

  handleEye1=()=>{
    this.setState({
        eye1: !this.state.eye1
    })
  }


  render() {
        
    return (
      <>
        <div className="login-form-layout">
          <div className="login-form">
            <div className="row">
              <div className="col-md-12">
                <h5>Reset Password</h5>
              </div>
              <div className="mt-10 col-md-10">
                <div className="form-group">
                  <label for="exampleInputEmail1">Enter the new password</label>
                  <input
                    type= {this.state.eye === false ? "password" : "text" }
                    name="newPassword"
                    onChange={this.handleOnChange}
                    value={this.state.newPassword}
                    className="mt-2 form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="New password"
                  />
                  <div >{this.state.eye === false ? <BsEye id="eyeSymbol" style={{cursor:'pointer'}} onClick={this.handleEye}/> : <BsEyeSlash id="eyeSymbol" style={{cursor:'pointer'}} onClick={this.handleEye}/> }</div>

                  {this.state.errors !== "" && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {this.state.errors.newPassword}
                      </p>
                    )}
                    {this.state.ErrPass !== undefined && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {this.state.ErrPass}
                      </p>
                    )}
                </div>
                <div className="mt-4 form-group">
                  <label for="exampleInputPassword">Enter the confirm password</label>
                  <input
                    type= {this.state.eye1 === false ? "password" : "text" }
                    name="rePassword"
                    onChange={this.handleOnChange}
                    value={this.state.rePassword}
                    className="mt-2 form-control"
                    id="exampleInputPassword"
                    placeholder="Confirm Password"
                  />
                  <div >{this.state.eye1 === false ? <BsEye id="eyeSymbol" style={{cursor:'pointer'}} onClick={this.handleEye1}/> : <BsEyeSlash id="eyeSymbol" style={{cursor:'pointer'}} onClick={this.handleEye1}/> }</div>
                  {this.state.errors !== "" && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {this.state.errors.rePassword}
                      </p>
                    )}
                </div>
                  <button
                    onClick={this.restPassword}
                    className="mt-5 btn btn-secondary"
                  >
                    Submit
                  </button>
                
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
