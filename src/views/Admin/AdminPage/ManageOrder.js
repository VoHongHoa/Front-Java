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
  getDetailOrderById,
} from "../../../services/OrderService";
import moment from "moment";
import ModalViewDetailOrder from "./ModalViewDetailOrder";
class OrderManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfUser: 0,
      allOrder: [],
      numOfPage: 0,
      currentPage: 0,
      isOpenModalView: false,
    };
  }
  checkAdminOrLibrarian = () => {
    let isValid = true; // admin: true , librarian: false
    if (
      this.props.userInfor &&
      this.props.userInfor.role.nameRole === "SELLER"
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
      if (res === "successful") {
        toast.success("Xóa thành công!");
        this.getOrderPaging(0);
        this.setState({
          currentPage: 0,
        });
      } else {
        toast.error("Xóa không thành công");
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  handleViewDetailOrder = async (orderssId) => {
    try {
      let res = await getDetailOrderById(orderssId);
      console.log(res);
      this.setState({
        isOpenModalView: true,
      });
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  toggleCloseModalViewDetail = () => {
    this.setState({
      isOpenModalView: false,
    });
  };
  render() {
    let { numOfPage, allOrder, currentPage } = this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
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
                <th scope="col">Địa chỉ giao hàng</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Tống số sách</th>
                <th scope="col">Ngày hóa đơn</th>
                <th scope="col">Trạng thái</th>
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
                      <td>{item.fullName}</td>
                      <td>{item.address}</td>
                      <td>{item.telephone}</td>
                      <td>{item.totalBook}</td>
                      <td>{moment(item.orderssDate).format("MM/DD/YYYY")}</td>
                      <td>{item.status}</td>
                      <td className="">
                        <i
                          className="fa-solid fa-eye"
                          style={{ margin: "3px", cursor: "pointer" }}
                          onClick={() =>
                            this.handleViewDetailOrder(item.orderssId)
                          }
                        ></i>
                        <i
                          className="fas fa-pencil"
                          style={{ margin: "3px", cursor: "pointer" }}
                          onClick={() => this.handleEditUser(item)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          style={{ margin: "3px", cursor: "pointer" }}
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
        <ModalViewDetailOrder
          toggle={this.toggleCloseModalViewDetail}
          isOpenModalView={this.state.isOpenModalView}
        />
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
