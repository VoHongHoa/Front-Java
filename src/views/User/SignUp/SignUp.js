import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Select from "react-select";
import CommonUtils from "../../../utils/CommonUtils";
import { handleSignUp } from "../../../services/userService";
import "./SignUp.scss";
import { toast } from "react-toastify";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repeatPassword: "",
      userName: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      img: "",
      gender: "",
    };
  }
  componentDidMount() {}
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "fullName",
      "userName",
      "gender",
      "password",
      "repeatPassword",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      // console.log(this.state[arrInput[i]]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error(`Vui lòng điền thông tin ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };

  // checkPassword = (password) => {
  //   let isValid = true;
  //   if (password.length < 8) {
  //     isValid = false;
  //   } else {
  //     isValid = true;
  //   }
  //   return isValid;
  // };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeImage = async (event) => {
    let filedata = event.target.files;
    let file = filedata[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        img: base64,
      });
    }
  };
  handleOnchangeSelect = (selectedOption, id) => {
    let name = id.name;
    let copyState = { ...this.state };
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleCancelSignUp = () => {
    this.props.history.push("/");
  };
  handleSignUpUser = async () => {
    try {
      if (this.checkValidateInput()) {
        if (this.state.password === this.state.repeatPassword) {
          let data = {
            nameUser: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            address: this.state.address,
            telephone: this.state.phoneNumber,
            sex: this.state.gender.value,
            image: this.state.img,
            fullName: this.state.fullName,
          };
          let res = await handleSignUp(data);
          if (res) {
            toast.success("Đăng kí thành công! Vui lòng đăng nhập");
            this.props.history.push("/login");
          } else {
            toast.error("Đăng kí không thành công! Vui lòng kiểm tra lại");
          }
        } else {
          toast.error("Mật khẩu và mật khẩu lặp lại không trùng nhau!!!");
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi đăng kí!!");
    }
  };
  render() {
    const options = [
      { value: "Nam", label: "Nam" },
      { value: "Nữ", label: "Nữ" },
      { value: "Khác", label: "Khác" },
    ];
    return (
      <div className="sign-up-container container">
        <h1>Đăng kí</h1>
        <p>Điền đầy đủ thông tin để đăng kí tài khoản</p>
        <hr />
        <div className="row">
          <div className="col-6 emailInput">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              required
              onChange={(event) => this.handleOnchangeInput(event, "email")}
            />
          </div>
          <div className="col-6 fullNameInput">
            <label htmlFor="fullName">
              <b>FullName</b>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Fullname"
              name="fullName"
              required
              onChange={(event) => this.handleOnchangeInput(event, "fullName")}
            />
          </div>
          <div className="col-6 nameInput mt-2">
            <label htmlFor="username">
              <b>UserName</b>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="form-control"
              name="username"
              onChange={(event) => this.handleOnchangeInput(event, "userName")}
              required
            />
          </div>
          <div className="col-6 genderInput mt-2">
            <label htmlFor="gender">
              <b>Gender</b>
            </label>

            <Select
              type="text"
              options={options}
              onChange={this.handleOnchangeSelect}
              name={"gender"}
            />
          </div>
          <div className="col-6 passwordInput mt-2">
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              name="psw"
              onChange={(event) => this.handleOnchangeInput(event, "password")}
              required
            />
          </div>

          <div className="col-6 pswRepeat mt-2">
            <label htmlFor="psw-repeat">
              <b>Repeat Password</b>
            </label>
            <input
              type="password"
              placeholder="Repeat Password"
              className="form-control"
              name="psw-repeat"
              onChange={(event) =>
                this.handleOnchangeInput(event, "repeatPassword")
              }
              required
            />
          </div>
          <div className="col-6 addressInput mt-2">
            <label htmlFor="address">
              <b>Address</b>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="form-control"
              name="address"
              onChange={(event) => this.handleOnchangeInput(event, "address")}
              required
            />
          </div>
          <div className="col-6 phonenumberInput mt-2">
            <label htmlFor="phonenumber">
              <b>PhoneNumber</b>
            </label>
            <input
              type="text"
              placeholder="Enter PhoneNumber"
              className="form-control"
              name="phonenumber"
              onChange={(event) =>
                this.handleOnchangeInput(event, "phoneNumber")
              }
              required
            />
          </div>
          <div className="col-6 imgInput mt-2">
            <label htmlFor="imgavatar">
              <b>Avatar</b>
            </label>
            <input
              type="file"
              className="form-control"
              htmlFor="imgavatar"
              onChange={(event) => {
                this.handleOnchangeImage(event);
              }}
            />
            <div
              className="useravatar mt-2 mb-2"
              style={{
                backgroundImage: `url(${this.state.img})`,
                backgroundRepeat: "none",
                backgroundSize: "cover",
                width: "80px",
                height: "100px",
                backgroundPosition: "center",
                margin: "0 auto",
                border: " 1px solid black",
              }}
            ></div>
          </div>
        </div>

        <p>
          By creating an account you agree to our{" "}
          <a href="/regulation" style={{ color: "dodgerblue" }}>
            Terms & Privacy
          </a>
          .
        </p>

        <div className="clearfix">
          <button
            type="submit"
            className="signupbtn"
            onClick={() => this.handleSignUpUser()}
          >
            Đăng kí
          </button>
          <button
            type="button"
            className="cancelSignUpbtn"
            onClick={() => this.handleCancelSignUp()}
          >
            Cancel
          </button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
