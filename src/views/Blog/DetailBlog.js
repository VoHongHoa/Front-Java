import React, { Component } from "react";
import "./DetailBlog.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

class DetailBlog extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="mb-2">
          <HomeHeader></HomeHeader>
        </div>
        <section id="sidebar">
          <p>
            <NavLink to="/" style={{ color: "black", cursor: "pointer" }}>
              Trang chủ
            </NavLink>{" "}
            | <b>Blog</b>
          </p>
          <h1 className="tittle-blog">Cập nhật tin tức</h1>
          <h5 className="h5">Tin tức:</h5>
        </section>
        <h2 className="content-blog"> Detail Blog here</h2>
        <div className="mt-2">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default DetailBlog;
