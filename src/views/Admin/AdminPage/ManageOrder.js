import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import "./CategoriesBook.scss";
import {
  deleteOrder,
  deleteOrderBySeller,
  getAllOrder,
  getAllOrderBySeller,
} from "../../../services/OrderService";
import moment from "moment";
class OrderManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfUser: 0,
      allOrder: [],
      numOfPage: 0,
      currentPage: 0,
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
  getOrderPaging = async (currentPage) => {
    try {
      let res;
      if (this.checkAdminOrLibrarian()) {
        res = await getAllOrder(currentPage);
      } else {
        res = await getAllOrderBySeller(currentPage);
      }
      console.log(res);
      if (res) {
        let numOfPage = 0;
        if (res.count % 4 === 0) {
          numOfPage = res.count / 4;
        } else {
          numOfPage = (res.count - (res.count % 4)) / 4 + 1;
        }
        this.setState({
          numOfUser: res.count,
          allOrder: res.orderssList,
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
    this.getOrderPaging(0);
  }
  handleChangePage = (item) => {
    this.getUserPaging(item);
    this.setState({
      currentPage: item,
    });
  };
  handleDeleteOrder = async (orderssId) => {
    try {
      let res;
      if (this.checkAdminOrLibrarian()) {
        res = await deleteOrder(orderssId);
      } else {
        res = await deleteOrderBySeller(orderssId);
      }
      console.log(res);
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
    let { numOfPage, allOrder, currentPage } = this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    //console.log(arr);
    return (
      <div className="container">
        <AdminHeader></AdminHeader>
        <h2 className="title mt-3">Quản lý đơn hàng</h2>
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Khách hàng</th>
                <th scope="col">Tống số sách</th>
                <th scope="col">Ngày hóa đơn</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {allOrder &&
                allOrder.length > 0 &&
                allOrder.map((item, index) => {
                  return (
                    <tr key={item.orderssId}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.user?.fullName}</td>
                      <td>{item.totalBook}</td>
                      <td>{moment(item.orderssDate).format("MM/DD/YYYY")}</td>
                      <td className="">
                        <i
                          className="fas fa-trash "
                          onClick={() => this.handleDeleteOrder(item.orderssId)}
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
  connect(mapStateToProps, mapDispatchToProps)(OrderManage)
);
