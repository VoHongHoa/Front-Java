import React, { Component } from "react";
import "./Book.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addToCart } from "../../store/actions/AppAction";
import HomeHeader from "../Homepage/HomeHeader";
import { getCateBook } from "../../services/BookService";
import Footer from "../Homepage/Footer";
import Fade from "react-reveal/Fade";
import { formatPrice } from "../../constants/format";
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      currentPage: 0,
      numOfPage: 0,
      numofBooks: 0,
      windowWidth: window.innerWidth,
    };
  }
  checkScreen = () => {
    // this.setState({
    //   windowWidth: window.innerWidth,
    // });
    if (this.state.windowWidth > 768) {
      return true;
    } else {
      return false;
    }
  };
  getAllBooksByCate = async (categoryId, page) => {
    try {
      let res = await getCateBook(categoryId, page);
      console.log(res);
      if (res) {
        let numOfPage = 0;
        if (res.count % process.env.REACT_APP_PAGING_LIMIT_PRODUCT === 0) {
          numOfPage = res.count / process.env.REACT_APP_PAGING_LIMIT_PRODUCT;
        } else {
          numOfPage =
            (res.count -
              (res.count % process.env.REACT_APP_PAGING_LIMIT_PRODUCT)) /
              process.env.REACT_APP_PAGING_LIMIT_PRODUCT +
            1;
        }
        this.setState({
          allBooks: res.bookList,
          numOfPage: numOfPage,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getAllBooksByCate(this.props.match.params.cateId, 0);
  }
  componentDidUpdate(preProps) {
    if (preProps.match.params !== this.props.match.params) {
      this.getAllBooksByCate(this.props.match.params.cateId, 0);
    }
  }
  handleAddToCart = item => {
    this.props.addToCart(item);
  };
  handleChangePage = item => {
    this.getAllBooksByCate(this.props.match.params.cateId, item);
    this.setState({
      currentPage: item,
    });
  };
  handleDetailBook = item => {
    this.props.history.push(`/book/${item.bookId}`);
  };
  render() {
    let { numOfPage, currentPage, allBooks } = this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    return (
      <div className="product-container">
        <HomeHeader></HomeHeader>
        <div className="container d-flex justify-content-center mt-3 mb-3">
          <div className="row">
            {allBooks &&
              allBooks.length > 0 &&
              allBooks.map((item, index) => {
                return (
                  <div className="col-md-3 mt-2" key={index}>
                    <Fade bottom delay={150}>
                      <div className="card" style={{ height: "500px" }}>
                        <div onClick={() => this.handleDetailBook(item)}>
                          <div className="card-body">
                            <div className="card-img-actions">
                              <img
                                src={item.image}
                                className="card-img img-fluid"
                                width="96"
                                height="200"
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
                          <h3
                            className={
                              this.checkScreen()
                                ? "hide price mb-0 font-weight-semibold"
                                : "price mb-0 font-weight-semibold"
                            }
                          >
                            {formatPrice(item.price)}
                          </h3>
                          <button
                            type="button"
                            className={
                              this.checkScreen()
                                ? "hide btn-add btn bg-cart"
                                : "btn-add btn bg-cart"
                            }
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
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: item => dispatch(addToCart(item)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Book));
