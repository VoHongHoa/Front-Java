import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.css";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="header-dark">
        <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
          <div className="container">
            <NavLink to="/" exact={true} className="navbar-brand">
              UITBOOKS
            </NavLink>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="nav navbar-nav">
                <li className="nav-item" role="presentation">
                  <NavLink to="/" exact={true} className="nav-link">
                    Trang chủ
                  </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                  <NavLink to="/" exact={true} className="nav-link">
                    Liên hệ
                  </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                  <NavLink to="/quydinh" exact={true} className="nav-link">
                    Quy định
                  </NavLink>
                </li>
                <li className="dropdown">
                  <a
                    className="dropdown-toggle nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    href="#"
                  >
                    Loại sách
                  </a>
                  <div className="dropdown-menu" role="menu">
                    <a className="dropdown-item" role="presentation" href="#">
                      Loại 1
                    </a>
                    <a className="dropdown-item" role="presentation" href="#">
                      Loại 2
                    </a>
                    <a className="dropdown-item" role="presentation" href="#">
                      Loại 3
                    </a>
                  </div>
                </li>
              </ul>
              <form className="form-inline mr-auto" target="_self">
                <div className="form-group">
                  <label htmlFor="search-field">
                    <i className="fa fa-search"></i>
                  </label>
                  <input
                    className="form-control search-field"
                    type="search"
                    name="tìm kiếm"
                    id="search-field"
                  />
                </div>
              </form>
              <span className="navbar-text">
                <NavLink to="/login" exact={true} className="login">
                  Đăng nhập
                </NavLink>
              </span>
              <NavLink
                to="/sign-up"
                exact
                className="btn btn-light action-button"
              >
                Đăng kí
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);