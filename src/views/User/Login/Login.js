import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../../assets/images/img_avatar2.png";
import { withRouter } from "react-router";
import "./Login.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  handleCancelLogin = () => {
    this.props.history.push("/");
    console.log(this.props.history);
  };
  render() {
    return (
      <div className="logincontainer">
        <div className="imgcontainer">
          <img src={logo} alt="Logo" className="avatar" />
        </div>

        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            class="form-control"
            name="uname"
            required
          />
          <div className="form-group mt-2">
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              class="form-control"
              name="psw"
              required
            />
          </div>

          <button type="submit">Đăng nhập</button>
          {/* <label>
            <input type="checkbox" checked="checked" name="remember" />
            Lưu thông tin
          </label> */}
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button
            type="button"
            className="cancelbtn"
            onClick={() => this.handleCancelLogin()}
          >
            Hủy
          </button>
          <span className="psw">
            Quên <a href="#">mật khẩu?</a>
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
