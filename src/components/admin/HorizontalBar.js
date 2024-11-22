import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BsBell, BsChat, BsFillMenuButtonFill } from "react-icons/bs";
import { GiTireIronCross } from "react-icons/gi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { TbBellRingingFilled } from "react-icons/tb";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../utilities/config";

class HorizontalBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
    };
  }

  updateLogout = (dispatch) => {
    const devUrl = BASE_URL;
    const body = { refreshToken: sessionStorage.getItem("refreshToken") };
    axios
      .post(devUrl + "ad/logout", body)
      .then((res) => {
          window.location.href = "/admin";
      })
      .catch((err) => {
        window.location.href = "/admin";
      });
  };

  render() {
    const items = [
      {
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        ),
        key: "0",
      },
      {
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item
          </a>
        ),
        key: "1",
      },
      {
        type: "divider",
      },
      {
        label: "3rd menu item（disabled）",
        key: "3",
        disabled: true,
      },
    ];

    return (
      <div className="header">
        <div className="hamBurgerMenu">
          {!this.state.openDrawer ? (
            <BsFillMenuButtonFill
              color={"white"}
              onClick={this.props.switchDrawerOn}
              size={24}
            ></BsFillMenuButtonFill>
          ) : (
            <GiTireIronCross
              color={"white"}
              onClick={this.props.switchDrawerOff}
            ></GiTireIronCross>
          )}
        </div>
        <div className="bigIcon">
          <span>Hello Admin!</span>
        </div>
        <div className="barTools">
          <ul>
            <li className="myCursor">
            </li>{" "}
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <li style={{ display: "flex" }}>
              <IoIosContact
                className="myCursor"
                color={"#03596E"}
                size={30}
              ></IoIosContact>{" "}
              &nbsp;
            </li>
            &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            <li>
              <span
                onClick={() => this.updateLogout()}
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </li>{" "}
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBar);
