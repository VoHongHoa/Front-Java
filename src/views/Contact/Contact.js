import React, { Component } from "react";
import "./Contact.scss";
import { withRouter } from "react-router";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import Slider from "../Homepage/Slider";
import { NavLink } from "react-router-dom";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import { AiTwotoneHome } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";

class Contact extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="mb-2">
          <HomeHeader></HomeHeader>
        </div>

        <Slider />

        <div className="mt-2">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default Contact;
