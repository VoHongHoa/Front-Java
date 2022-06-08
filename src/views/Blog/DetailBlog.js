import React, { Component } from "react";
import { withRouter } from "react-router";
import "./DetailBlog.scss";
import { NavLink } from "react-router-dom";

class Blog extends Component {
  render() {
    return (
      <React.Fragment>
        <Homeheader />
        <section id="sidebar">
          <p>
            <NavLink to="/" style={{ color: "black" }}>
              Trang chủ
            </NavLink>{" "}
            | <b>Blog</b>
          </p>
        </section>
        <h1 className="title-blog">Cập nhật tin tức công nghệ</h1>
        <h5 className="h5">Tin tức:</h5>
        <NavLink exact to="./blog/blog1">
          <div class="blog-card">
            <img className="blog-img" src={blog1} alt="blog-img" />
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

        <NavLink exact="true" to="./blog/blog2">
          <div class="blog-card">
            <img className="blog-img" src={blog2} alt="blog-img" />
            <div class="card-body">
              <p class="card-text">
                Galaxy XCover6 Pro lộ ảnh render chính thức kèm cấu hình chi
                tiết
              </p>
              <br />
              <br />
              <p className="date">Ngày 30/5/2022</p>
            </div>
          </div>
        </NavLink>

        <NavLink to="./blog/blog3">
          <div class="blog-card">
            <img className="blog-img" src={blog3} alt="blog-img" />
            <div class="card-body">
              <p class="card-text">
                WWDC 2022: Điều gì sẽ xảy ra, iOS 16, macOS 13, MacBook Air được
                thiết kế lại và còn gì nữa?
              </p>
              <br />
              <p className="date">Ngày 24/5/2022</p>
            </div>
          </div>
        </NavLink>

        <NavLink to="./blog/blog4">
          <div class="blog-card">
            <img className="blog-img" src={blog4} alt="blog-img" />
            <div class="card-body">
              <p class="card-text">
                ASUS Republic of Gamers ra mắt loạt sản phẩm Laptop mới sử dụng
                AMD Ryzen 6000 Series tại Việt Nam
              </p>
              <br />
              <p className="date">Ngày 10/5/2022</p>
            </div>
          </div>
        </NavLink>
        <HomeFooter />
      </React.Fragment>
    );
  }
}

export default withRouter(Blog);
