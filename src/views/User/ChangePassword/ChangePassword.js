import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { changePassword } from "../../../services/userService";
import { logOutSuccess } from "../../../store/actions/AppAction";
import "./ChangePassword.scss";
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    };
  }
  componentDidMount() {}
  handleCancelChangePassword = () => {
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
  handleChangePassword = async () => {
    try {
      if (this.state.newPassword !== this.state.repeatNewPassword) {
        toast.error("Mật khẩu mới và lặp lại mật khẩu không trùng nhau!!! ");
      } else {
        let data = {
          oldPassword: this.state.curentPassword,
          newPassword: this.state.newPassword,
        };
        let res = await changePassword(data);
        //console.log(res);
        if (res) {
          toast.success("Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại");
          this.props.logOutUser();
        } else {
          toast.error("Thay đổi không thành công!");
        }
      }
    } catch (e) {
      toast.error("Lỗi sever!");
    }
  };
  render() {
    return (
      <div className="logincontainer">
        <div className="imgcontainer">
          <img src={this.props.userInfor.image} alt="Logo" className="avatar" />
        </div>

        <div className="container">
          <div className="form-group mt-2">
            <label htmlFor="psw">
              <b>Mật khẩu hiện tại</b>
            </label>
            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              onChange={(event) =>
                this.handleOnchangeInput(event, "curentPassword")
              }
              className="form-control"
              name="psw"
              required
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="psw">
              <b>Mật khẩu mới</b>
            </label>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              onChange={(event) =>
                this.handleOnchangeInput(event, "newPassword")
              }
              className="form-control"
              name="psw"
              required
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="psw">
              <b>Nhập lại mật khẩu mới</b>
            </label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              onChange={(event) =>
                this.handleOnchangeInput(event, "repeatNewPassword")
              }
              className="form-control"
              name="psw"
              required
            />
          </div>

          <button type="submit" onClick={() => this.handleChangePassword()}>
            Thay đổi
          </button>
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button
            type="button"
            className="cancelbtn"
            onClick={() => this.handleCancelChangePassword()}
          >
            Hủy
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { userInfor: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutSuccess()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
);
