import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { logOutSuccess } from "../../store/actions/AppAction";
import { getAllCategoriesBooksRedux } from "../../store/actions/CategoriesAction";
import defaultAvatar from "../../assets/images/avatar.jpg";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategoriesBooks: [],
    };
  }
  componentDidMount() {
    this.props.getAllCategoriesBooksRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allCategoriesBooks !== this.props.allCategoriesBooks) {
      this.setState({
        allCategoriesBooks: this.props.allCategoriesBooks,
      });
    }
  }

  render() {
    let { allCategoriesBooks } = this.state;
    //console.log(allCategoriesBooks);
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
                  <NavLink to="/lienhe" exact={true} className="nav-link">
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
                    href="false"
                  >
                    Loại sách
                  </a>
                  <div className="dropdown-menu" role="menu">
                    {allCategoriesBooks &&
                      allCategoriesBooks.length > 0 &&
                      allCategoriesBooks.map((item, index) => {
                        return (
                          <a
                            className="dropdown-item"
                            role="presentation"
                            href="false"
                            key={item.categoryId}
                          >
                            {item.nameCate}
                          </a>
                        );
                      })}
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
              {this.props.isLogin === true ? (
                <span className="user-infor d-flex">
                  {this.props.userInfor && this.props.userInfor.image ? (
                    <div
                      className="avatar"
                      style={{
                        backgroundImage: `url(${this.props.userInfor.image})`,
                        backgroundRepeat: "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "25px",
                        width: "25px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  ) : (
                    <div
                      className="avatar"
                      style={{
                        backgroundImage: `url(${defaultAvatar})`,
                        backgroundRepeat: "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "25px",
                        width: "25px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}

                  <li className="dropdown">
                    <span
                      className="dropdown-toggle  dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {this.props.userInfor && this.props.userInfor.fullName
                        ? this.props.userInfor.fullName
                        : ""}
                    </span>
                    <div className="dropdown-menu" role="menu">
                      <NavLink
                        to="/profile"
                        exact={true}
                        className="dropdown-item"
                        role="presentation"
                      >
                        Thông tin cá nhân
                      </NavLink>

                      <NavLink
                        to="/cart"
                        exact={true}
                        className="dropdown-item"
                        role="presentation"
                      >
                        Giỏ hàng
                      </NavLink>
                      <NavLink
                        to="/changepassword"
                        exact={true}
                        className="dropdown-item"
                        role="presentation"
                      >
                        Đổi mật khẩu
                      </NavLink>
                      <a
                        className="dropdown-item"
                        role="presentation"
                        href="#"
                        onClick={() => this.props.handleLogOutRedux()}
                      >
                        Đăng xuất
                      </a>
                    </div>
                  </li>
                </span>
              ) : (
                <>
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
                </>
              )}
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
    allCategoriesBooks: state.books.allCategoriesBooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogOutRedux: () => dispatch(logOutSuccess()),
    getAllCategoriesBooksRedux: () => dispatch(getAllCategoriesBooksRedux()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
