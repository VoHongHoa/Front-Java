import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import "./AdminHeader.css";
class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReponsesive: false,
    };
  }
  componentDidMount() {}
  myFuntion = () => {
    this.setState({
      isReponsesive: !this.state.isReponsesive,
    });
  };
  render() {
    let { isReponsesive } = this.state;
    // console.log;
    return (
      <div
        className={isReponsesive === false ? "topnav" : "topnav responsive "}
        id="myTopnav"
      >
        {this.props.userInfor &&
          this.props.userInfor.role.nameRole === "ADMIN" && (
            <NavLink to={"/admin"} exact={true} activeClassName="active">
              Disbash
            </NavLink>
          )}
        <NavLink to={"/admin/user"} exact={true} activeClassName="active">
          Người dùng
        </NavLink>
        <NavLink to={"/admin/categories"} exact={true} activeClassName="active">
          Loại sách
        </NavLink>
        <NavLink to={"/admin/books"} exact={true} activeClassName="active">
          Sách
        </NavLink>
        <NavLink to={"/borrow"} exact={true} activeClassName="active">
          Phiếu mượn
        </NavLink>
        <a className="icon" onClick={() => this.myFuntion()} href="#">
          <i className="fa fa-bars"></i>
        </a>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminHeader)
);
