import React, { Component } from "react";
import "./Order.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { getOrder } from "../../services/OrderService";
import moment from "moment";
import { toast } from "react-toastify";
import { formatPrice } from "../../constants/format";
import { getDetailOrderById } from "../../services/OrderService";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrder: [],
      detailOrder: [],
    };
  }
  componentDidMount() {
    this.fetchGetOrder();
  }
  fetchGetOrder = async () => {
    let data = {
      keysearch: this.props.userInfor.userId,
    };
    try {
      let res = await getOrder(data);
      // console.log("Check res: ", res);
      if (res) {
        this.setState({
          allOrder: res,
        });
        this.pushDetailOrder();
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  pushDetailOrder = async () => {
    let allOrder = this.state.allOrder;
    allOrder.map((item, index) => {
      let Detail = getDetailOrderById(item.orderssId);
      this.setState({
        detailOrder: this.state.detailOrder.push(Detail),
      });
    });
  };
  render() {
    let Orders = this.state;
    console.log("Check orders: ", Orders);
    return (
      <React.Fragment>
        <div className="mb-2">
          <HomeHeader />
        </div>
        <h2>Đơn hàng</h2>
        {Orders &&
        Orders.allOrder.length > 0 &&
        Orders.detailOrder.length > 0 ? (
          Orders.map((item, index) => {
            let detailOrder = item.detailOrder;
            return (
              <div>
                <p>
                  ID đơn hàng: <span>{item.allOrder.orderssId}</span>
                </p>
                <p>
                  Tên khách hàng: <span>{item.allOrder.fullName}</span>{" "}
                </p>
                <p>
                  Số điện thoại: <span>{item.allOrder.telephone}</span>{" "}
                </p>
                <p>
                  Địa chỉ: <span>{item.allOrder.address}</span>{" "}
                </p>
                <p>
                  Trị giá đơn hàng:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item.allOrder.totalPrice
                      ? formatPrice(item.allOrder.totalPrice)
                      : item.allOrder.totalPrice}
                  </span>{" "}
                </p>
                <p>
                  Trạng thái đơn hàng: <span>{item.allOrder.status}</span>{" "}
                </p>
                <p>
                  Ngày hóa đơn:
                  <span>
                    {moment(item.allOrder.orderssDate).format("MM/DD/YYYY")}
                  </span>
                </p>
                <h3 style={{ textAlign: "center" }}>Danh sách sản phẩm</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên sách</th>
                      <th scope="col">Tác giả</th>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailOrder &&
                      detailOrder.length > 0 &&
                      detailOrder.map((item, index) => {
                        return (
                          <tr key={item.orderssDeId}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.book.nameBook}</td>
                            <td>{item.book.author}</td>
                            <td>
                              <div
                                className="img-product"
                                style={{
                                  backgroundImage: `url(${item.book.image})`,
                                  backgroundRepeat: "none",
                                  backgroundSize: "cover",
                                  width: "50px",
                                  height: "60px",
                                  backgroundPosition: "center",
                                }}
                              ></div>
                            </td>
                            <td>{item.count}</td>
                            <td>
                              {item?.book && item?.book.price
                                ? formatPrice(item?.book.price)
                                : item?.book.price}
                            </td>
                            <td>
                              {item?.total
                                ? formatPrice(item.total)
                                : item.total}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            );
          })
        ) : (
          <div>Không có đơn hàng nào</div>
        )}
        <div className="mt-2">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
