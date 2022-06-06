import React, { Component } from "react";
import "./Term.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../../components/Footer";

class Term extends Component {
  render() {
    return (
      <React.Fragment>
        <HomeHeader />
        <div className="container-contact">term here</div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Term;
