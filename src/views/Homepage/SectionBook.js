import React, { Component } from "react";
import "./SectionBook.scss";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { formatPrice } from "../../constants/format";
import { addToCart } from "../../store/actions/AppAction";
import Fade from "react-reveal/Fade";
import { getBookHomePage } from "../../services/HomeService";
class SectionProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
      bookOrder: [],
      bookRating: [],
    };
  }
  getAllBook = async () => {
    try {
      let res = await getBookHomePage(0);
      console.log(res);
      this.setState({
        bookList: res.bookList.bookList,
        bookOrder: res.bookOder,
        bookRating: res.bookRating,
      });
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server!!");
    }
  };
  handleDetailBook = (item) => {
    this.props.history.push(`/book/${item.bookId}`);
  };
  handleAddToCart = (item) => {
    //console.log(item);
    this.props.addToCart(item);
  };
  componentDidMount() {
    this.getAllBook();
  }
  render() {
    let { bookList, bookOrder, bookRating } = this.state;
    console.log(bookOrder);
    return (
      <div className="section-book">
        <h2 className="mt-3 mb-3" style={{ textAlign: "center" }}>
          Danh sách sách ở cửa hàng
        </h2>
        <div className="container d-flex justify-content-center mt-50 mb-50">
          <div className="row">
            {bookList &&
              bookList.length > 0 &&
              bookList.map((item, index) => {
                return (
                  <div className="col-md-3 mt-2" key={index}>
                    <Fade bottom delay={150}>
                      <div className="card">
                        <div onClick={() => this.handleDetailBook(item)}>
                          <div className="card-body">
                            <div className="card-img-actions">
                              <img
                                src={item.image}
                                className="card-img img-fluid"
                                width="96"
                                height="350"
                                alt="item.nameBook"
                              />
                            </div>
                          </div>
                          <div className="card-body show bg-light text-center">
                            <div className="mb-2">
                              <a
                                href="#"
                                className="text-muted name"
                                data-abc="true"
                              >
                                {item.nameBook}
                              </a>
                            </div>

                            {item.rating === 1 && (
                              <div>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 2 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 3 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 4 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 5 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            <div className="text-muted mb-3">
                              {item.cmt} đánh giá
                            </div>
                          </div>
                        </div>
                        <Fade top delay={-200}>
                          <h3 className="hide mb-0 font-weight-semibold">
                            {formatPrice(item.price)}
                          </h3>
                          <button
                            type="button"
                            className="hide btn bg-cart"
                            onClick={() => this.handleAddToCart(item)}
                          >
                            <i className="fa fa-cart-plus mr-2"></i> Add to cart
                          </button>
                        </Fade>
                      </div>
                    </Fade>
                  </div>
                );
              })}
          </div>
        </div>

        <h2 className="mt-3 mb-3" style={{ textAlign: "center" }}>
          Danh sách sách bán chạy ở cửa hàng
        </h2>
        <div className="container d-flex justify-content-center mt-50 mb-50">
          <div className="row">
            {bookOrder &&
              bookOrder.length > 0 &&
              bookOrder.map((item, index) => {
                return (
                  <div className="col-md-3 mt-2" key={item.bookId}>
                    <Fade bottom delay={150}>
                      <div className="card">
                        <div onClick={() => this.handleDetailBook(item)}>
                          <div className="card-body">
                            <div className="card-img-actions">
                              <img
                                src={item.image}
                                className="card-img img-fluid"
                                width="96"
                                height="350"
                                alt="item.nameBook"
                              />
                            </div>
                          </div>
                          <div className="card-body show bg-light text-center">
                            <div className="mb-2">
                              <a
                                href="#"
                                className="text-muted name"
                                data-abc="true"
                              >
                                {item.nameBook}
                              </a>
                            </div>

                            {item.rating === 1 && (
                              <div>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 2 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 3 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 4 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 5 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            <div className="text-muted mb-3">
                              {item.cmt} đánh giá
                            </div>
                          </div>
                        </div>
                        <Fade top delay={-200}>
                          <h3 className="hide mb-0 font-weight-semibold">
                            {formatPrice(item.price)}
                          </h3>
                          <button
                            type="button"
                            className="hide btn bg-cart"
                            onClick={() => this.handleAddToCart(item)}
                          >
                            <i className="fa fa-cart-plus mr-2"></i> Add to cart
                          </button>
                        </Fade>
                      </div>
                    </Fade>
                  </div>
                );
              })}
          </div>
        </div>

        <h2 className="mt-3 mb-3" style={{ textAlign: "center" }}>
          Danh sách sách được đánh giá cao
        </h2>
        <div className="container d-flex justify-content-center mt-50 mb-50">
          <div className="row">
            {bookRating &&
              bookRating.length > 0 &&
              bookRating.map((item, index) => {
                return (
                  <div className="col-md-3 mt-2" key={item.nameBook}>
                    <Fade bottom delay={150}>
                      <div className="card">
                        <div onClick={() => this.handleDetailBook(item)}>
                          <div className="card-body">
                            <div className="card-img-actions">
                              <img
                                src={item.image}
                                className="card-img img-fluid"
                                width="96"
                                height="350"
                                alt="item.nameBook"
                              />
                            </div>
                          </div>
                          <div className="card-body show bg-light text-center">
                            <div className="mb-2">
                              <a
                                href="#"
                                className="text-muted name"
                                data-abc="true"
                              >
                                {item.nameBook}
                              </a>
                            </div>

                            {item.rating === 1 && (
                              <div>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 2 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 3 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 4 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 5 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            <div className="text-muted mb-3">
                              {item.cmt} đánh giá
                            </div>
                          </div>
                        </div>
                        <Fade top delay={-200}>
                          <h3 className="hide mb-0 font-weight-semibold">
                            {formatPrice(item.price)}
                          </h3>
                          <button
                            type="button"
                            className="hide btn bg-cart"
                            onClick={() => this.handleAddToCart(item)}
                          >
                            <i className="fa fa-cart-plus mr-2"></i> Add to cart
                          </button>
                        </Fade>
                      </div>
                    </Fade>
                  </div>
                );
              })}
          </div>
        </div>
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
