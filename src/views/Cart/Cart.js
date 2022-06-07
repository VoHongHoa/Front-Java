import React, { Component } from "react";
import "./Cart.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeInputItem, deleteItem } from "../../store/actions/AppAction";
import { toast } from "react-toastify";
import { buyBooks } from "../../services/userService";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItemInCart: [],
    };
  }
  componentDidMount() {
    this.setState({
      allItemInCart: this.props.allItemInCart,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allItemInCart !== this.props.allItemInCart) {
      this.setState({
        allItemInCart: this.props.allItemInCart,
      });
    }
  }
  handleOnchangeInput = (event, item) => {
    let copyState = { ...this.state };
    let quantity = event.target.value;
    for (let index = 0; index < copyState.allItemInCart.length; index++) {
      if (copyState.allItemInCart[index]._id === item._id) {
        copyState.allItemInCart[index].quantity = quantity;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
    this.props.changeInputItem(this.state.allItemInCart);
  };
  handleIncreaseQuantity = (item) => {
    let copyState = { ...this.state };
    for (let index = 0; index < copyState.allItemInCart.length; index++) {
      if (copyState.allItemInCart[index].bookId === item.bookId) {
        copyState.allItemInCart[index].quantity =
          parseInt(copyState.allItemInCart[index].quantity) + 1;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
    this.props.changeInputItem(this.state.allItemInCart);
  };
  handleDeleteBook = (item) => {
    this.props.deleteItem(item);
  };

  handleDecreaseQuantity = (item) => {
    let copyState = { ...this.state };
    for (let index = 0; index < copyState.allItemInCart.length; index++) {
      if (
        copyState.allItemInCart[index].bookId === item.bookId &&
        copyState.allItemInCart[index].quantity > 1
      ) {
        copyState.allItemInCart[index].quantity =
          parseInt(copyState.allItemInCart[index].quantity) - 1;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
    this.props.changeInputItem(this.state.allItemInCart);
  };
  handleBorrowBooks = async () => {
    let cart = [];
    if (this.state.allItemInCart && this.state.allItemInCart.length > 0) {
      for (let index = 0; index < this.state.allItemInCart.length; index++) {
        let obj = {};
        obj.quantity = this.state.allItemInCart[index].quantity;
        obj.books = this.state.allItemInCart[index].bookId;
        obj.total = this.state.allItemInCart[index].price * obj.quantity;
        cart.push(obj);
      }
      let res = await buyBooks(cart);
      console.log(res);
    } else {
      toast.error("Vui lòng chọn thêm sản phẩm");
    }
    // try {
    //   let res = await borrowBooks(data);
    //   console.log(res);
    // } catch (e) {
    //   console.log(e);
    //   toast.error("Lỗi server!!Vui lòng thử lại sau");
    // }
  };
  render() {
    //console.log(this.state.allItemInCart);
    let { allItemInCart } = this.state;
    let { userInfor } = this.props;
    let total = 0;
    return (
      <div className="container CartContainer">
        <section
          className="h-100 h-custom"
          style={{ backgroundColor: "#d2c9ff" }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12">
                <div
                  className="card card-registration card-registration-2"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-lg-8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <h1 className="fw-bold mb-0 text-black">
                              Giỏ sách
                            </h1>
                            <h6 className="mb-0 text-muted">
                              {allItemInCart.length} sách
                            </h6>
                          </div>
                          {allItemInCart &&
                            allItemInCart.length > 0 &&
                            allItemInCart.map((item, index) => {
                              total = total + item.price * item.quantity;
                              return (
                                <div
                                  className="row mb-4 d-flex justify-content-between align-items-center cart"
                                  key={index}
                                >
                                  <div className="col-md-2 col-lg-2 col-xl-2">
                                    <img
                                      src={item.image}
                                      className="img-fluid rounded-3"
                                      alt="Cotton T-shirt"
                                    />
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-3">
                                    <h6 className="text-muted">Sách</h6>
                                    <h6 className="text-black mb-0">
                                      {item.nameBook}
                                    </h6>
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <button
                                      className="btn btn-link px-2"
                                      onClick={() =>
                                        this.handleDecreaseQuantity(item)
                                      }
                                    >
                                      <i className="fas fa-minus"></i>
                                    </button>

                                    <input
                                      id="form1"
                                      name="quantity"
                                      value={item.quantity}
                                      type="number"
                                      className="form-control form-control-sm"
                                      onChange={(event) =>
                                        this.handleOnchangeInput(event, item)
                                      }
                                    />

                                    <button
                                      className="btn btn-link px-2"
                                      onClick={() =>
                                        this.handleIncreaseQuantity(item)
                                      }
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>
                                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h6 className="mb-0">{item.price}</h6>
                                  </div>
                                  <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                    <a href="#!" className="text-muted">
                                      <i
                                        className="fas fa-times"
                                        onClick={() =>
                                          this.handleDeleteBook(item)
                                        }
                                      ></i>
                                    </a>
                                  </div>
                                </div>
                              );
                            })}

                          <div className="pt-5">
                            <h6 className="mb-0">
                              <Link to="/" className="text-body">
                                <i className="fas fa-long-arrow-alt-left me-2"></i>
                                Tiếp tục mượn sách
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 bg-grey">
                        <div className="p-5">
                          <h3 className="fw-bold mb-5 mt-2 pt-1">Phiếu mượn</h3>
                          <hr className="my-4" />

                          <div className="d-flex justify-content-between mb-4">
                            <h5 className="text-uppercase">
                              {allItemInCart.length} sách
                            </h5>
                            {/* <h5>€ 132.00</h5> */}
                          </div>

                          {/* <h5 class="text-uppercase mb-3">Shipping</h5> */}

                          <div className="mb-4 pb-2">
                            <label
                              className="form-label"
                              htmlFor="form3Examplea2"
                            >
                              Họ và tên
                            </label>
                            <input
                              type="text"
                              id="form3Examplea2"
                              className="form-control form-control-lg"
                              defaultValue={userInfor.fullName}
                              readOnly
                            />
                          </div>

                          {/* <h5 className="text-uppercase mb-3">Give code</h5> */}

                          <div className="mb-5">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                htmlFor="form3Examplea2"
                              >
                                Địa chỉ
                              </label>
                              <input
                                type="text"
                                id="form3Examplea2"
                                className="form-control form-control-lg"
                                defaultValue={userInfor.address}
                                readOnly
                              />
                            </div>
                          </div>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between mb-5">
                            <h5 className="text-uppercase">Total price</h5>
                            <h5>{total}</h5>
                          </div>

                          <button
                            type="button"
                            className="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark"
                            onClick={() => this.handleBorrowBooks()}
                          >
                            Mượn sách
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
    allItemInCart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (item) => dispatch(deleteItem(item)),
    changeInputItem: (allItems) => dispatch(changeInputItem(allItems)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
