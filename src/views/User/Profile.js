import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { editUser } from "../../store/actions/AppAction";
import HomeHeader from "../Homepage/HomeHeader";
import "./Profile.css";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      img: "",
      gender: "",
      userId: "",
    };
  }
  componentDidMount() {
    if (this.props.userInfor) {
      this.setState({
        email: this.props.userInfor.email,
        userName: this.props.userInfor.nameUser,
        fullName: this.props.userInfor.fullName,
        address: this.props.userInfor.address,
        phoneNumber: this.props.userInfor.telephone,
        img: this.props.userInfor.image,
        gender: this.props.userInfor.sex,
        userId: this.props.userInfor.userId,
      });
    }
  }
  handleCancelProfile = () => {
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
  handleChangeProfile = () => {
    let data = {
      userId: this.state.userId,
      nameUser: this.state.userName,
      email: this.state.email,
      address: this.state.address,
      telephone: this.state.phoneNumber,
      sex: this.state.gender,
      fullName: this.state.fullName,
    };
    this.props.editUser(data);
  };
  render() {
    // console.log(this.state);
    return (
      <>
        <HomeHeader />
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  height="150px"
                  src={this.state.img}
                  alt="Avatar"
                />
                <span className="font-weight-bold">{this.state.userName}</span>
                <span className="text-black-50">{this.state.email}</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      defaultValue={this.state.fullName}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "fullName")
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter email id"
                      defaultValue={this.state.email}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "email")
                      }
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter phone number"
                      defaultValue={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "phoneNumber")
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="labels">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      defaultValue={this.state.address}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "address")
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="labels">Gender</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="education"
                      defaultValue={this.state.gender}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "gender")
                      }
                    />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => this.handleChangeProfile()}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience">
                  <span>Edit Experience</span>
                  <span className="border px-3 p-1 add-experience">
                    <i className="fa fa-plus"></i>&nbsp;Experience
                  </span>
                </div>
                <br />
                <div className="col-md-12">
                  <label className="labels">Experience in Designing</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="experience"
                  />
                </div>{" "}
                <br />
                <div className="col-md-12">
                  <label className="labels">Additional Details</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="additional details"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (data) => dispatch(editUser(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
