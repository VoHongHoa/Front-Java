import React, { Component } from "react";
import "./Blog.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";

class Blog extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="mb-2">
          <HomeHeader></HomeHeader>
        </div>
        <div className="content-blog"> Blog here</div>
        <div className="mt-2">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
export default Blog;
