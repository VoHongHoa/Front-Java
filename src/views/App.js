import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./Homepage/HomePage.js";
import Login from "./User/Login/Login";
import SignUp from "./User/SignUp/SignUp";
import Profile from "./User/Profile";
import Adminpage from "./Admin/AdminPage/Adminpage";
import UserManage from "./Admin/AdminPage/UserManage";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    let { isLogin } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/login" exact>
              {isLogin === true ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/sign-up" exact>
              {isLogin === true ? <Redirect to="/" /> : <SignUp />}
            </Route>

            <Route path="/profile" exact>
              {isLogin === false ? <Redirect to="/login" /> : <Profile />}
            </Route>

            <Route path="/admin" exact>
              {isLogin === false ? <Redirect to="/login" /> : <Adminpage />}
            </Route>
            <Route path="/admin/user" exact>
              {isLogin === false ? <Redirect to="/login" /> : <UserManage />}
            </Route>
          </Switch>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
