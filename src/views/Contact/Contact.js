import React, { Component } from "react";
import "./Contact.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";

class Contact extends Component {
  render() {
    return (
      <React.Fragment>
        <HomeHeader />
        <div className="container-contact">Contact here</div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Contact;
