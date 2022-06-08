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
          <h1 className="tittle-blog">Cập nhật tin tức</h1>
          <h5 className="h5">Tin tức:</h5>
          <NavLink exact to="./blog/blogId">
            <div class="blog-card container">
              <p class="card-tittle">
                Biến thể dùng chip Dimensity 9000 của Xiaomi 12S Pro vừa đạt
                chứng nhận 3C, sắp sửa ra mắt?
              </p>
              <div className="row">
                <p className="card-user col-md-6">
                  Người đăng: Nguyễn Thị Thiên
                </p>
                <p className="card-date col-md-6">Ngày 1/6/2022</p>
              </div>
            </div>
          </NavLink>
        </section>
        <div className="mt-2">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Blog);
