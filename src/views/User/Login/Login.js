import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../../assets/images/img_avatar2.png";
import { withRouter } from "react-router";
// import { handleLogin } from "../../../services/userService";
import "./Login.scss";
import { handleLoginRedux } from "../../../store/actions/AppAction";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameUser: "",
      password: "",
    };
  }
  componentDidMount() {}
  handleCancelLogin = () => {
    this.props.history.push("/");
    // console.log(this.props.history);
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleLogin = () => {
    let data = {
      nameUser: this.state.nameUser,
      password: this.state.password,
    };
    this.props.handleLoginRedux(data);
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
            className="form-control"
            name="uname"
            onChange={(event) => this.handleOnchangeInput(event, "nameUser")}
            required
          />
          <div className="form-group mt-2">
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(event) => this.handleOnchangeInput(event, "password")}
              className="form-control"
              name="psw"
              required
            />
          </div>

          <button type="submit" onClick={() => this.handleLogin()}>
            Đăng nhập
          </button>
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
  return { handleLoginRedux: (data) => dispatch(handleLoginRedux(data)) };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
