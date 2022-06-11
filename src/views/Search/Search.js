import React, { Component } from "react";
import "./SectionBook.scss";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addToCart } from "../../store/actions/AppAction";
import Fade from "react-reveal/Fade";
import Footer from "../Homepage/Footer";
class SectionProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
    };
  }

  componentDidMount() {}
  render() {
    return (
      <div className="search container-fluid">
        <HomeHeader></HomeHeader>
        <p>Sanr phaamr owr day</p>
        <Footer></Footer>
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
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SectionProduct)
);
