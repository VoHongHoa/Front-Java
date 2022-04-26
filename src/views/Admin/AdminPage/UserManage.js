import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getAllUser,
  deleteUser,
  getAllUserByLibrarian,
  deleteUserByLibrarian,
} from "../../../services/userService";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import "./UserManage.css";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfUser: 0,
      allUser: [],
      numOfPage: 0,
      currentPage: 0,
      isOpenModal: false,
      currentUserEdit: {},
    };
  }
  checkAdminOrLibrarian = () => {
    let isValid = true; // admin: true , librarian: false
    if (
      this.props.userInfor &&
      this.props.userInfor.role.nameRole === "LIBRARIAN"
    ) {
      isValid = false;
    }
    return isValid;
  };
  getUserPaging = async (currentPage) => {
    try {
      let res;
      if (this.checkAdminOrLibrarian()) {
        res = await getAllUser(currentPage);
      } else {
        res = await getAllUserByLibrarian(currentPage);
      }
      if (res) {
        let numOfPage = 0;
        if (res.count % 4 === 0) {
          numOfPage = res.count / 4;
        } else {
          numOfPage = (res.count - (res.count % 4)) / 4 + 1;
        }
        this.setState({
          numOfUser: res.count,
          allUser: res.userList,
          numOfPage: numOfPage,
        });
      } else {
        this.setState({
          ...this.state,
        });
      }
    } catch (e) {
      toast.error("Lỗi server");
    }
  };
  componentDidMount() {
    this.getUserPaging(0);
  }
  handleChangePage = (item) => {
    this.getUserPaging(item);
    this.setState({
      currentPage: item,
    });
  };
  handleDeleteUser = async (userId) => {
    try {
      let res;
      if (this.checkAdminOrLibrarian()) {
        res = await deleteUser(userId);
      } else {
        res = await deleteUserByLibrarian(userId);
      }
      if (res) {
        toast.success("Xóa thành công!");
        this.setState({
          currentPage: 0,
        });
      } else {
        toast.error("Xóa không thành công");
      }
      this.getUserPaging(0);
    } catch (e) {
      toast.error("Xóa không thành công!!!");
    }
  };
  render() {
    let { numOfPage, allUser, currentPage } = this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    //console.log(arr);
    return (
      <div className="container">
        <AdminHeader></AdminHeader>
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Họ và Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {allUser &&
                allUser.length > 0 &&
                allUser.map((item, index) => {
                  return (
                    <tr key={item.userId}>
                      <th scope="row">{index}</th>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td className="">
                        <i
                          className="fas fa-trash "
                          onClick={() => this.handleDeleteUser(item.userId)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className="pagination">
            <p>&laquo;</p>
            {arr &&
              arr.length &&
              arr.map((item, index) => {
                return (
                  <p
                    onClick={() => this.handleChangePage(item)}
                    className={currentPage === item ? "active" : ""}
                    key={index}
                  >
                    {item}
                  </p>
                );
              })}
            <p>&raquo;</p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { userInfor: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
