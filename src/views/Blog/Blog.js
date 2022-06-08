import React, { Component } from "react";
import "./Blog.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

class Blog extends Component {
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
          <h1 className="title-blog">Cập nhật tin tức</h1>
          <h5 className="h5">Tin tức:</h5>
          <NavLink exact to="./blog/:idblog">
            <div class="blog-card">
              <div class="card-body">
                <p class="card-text">
                  Biến thể dùng chip Dimensity 9000 của Xiaomi 12S Pro vừa đạt
                  chứng nhận 3C, sắp sửa ra mắt?
                </p>
                <br />
                <p className="date">Ngày 1/6/2022</p>
              </div>
            </div>
          </NavLink>
        </section>
        <div className="content-blog"> Blog here</div>
        <div className="mt-2">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Blog);
