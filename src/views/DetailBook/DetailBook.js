import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { findBooksByBookId } from "../../services/BookService";
import "./DetailBook.scss";

class DetailBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      newReview: "",
      allReview: [],
      isShowComment: true,
      curentReview: {},
      isOpenModal: false,
      showHide: false,
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.id;
    let res = await findBooksByBookId(id);
    console.log("book:", res);
    // this.getAllReviews(id);
    if (res) {
      this.setState({
        book: res ? res : {},
      });
    }
  }
  handleAddToCart = book => {
    this.props.addToCart(book);
  };
  handleReturnHome = () => {
    this.props.history.push("/");
  };
  handleReturnCate = cateId => {
    this.props.history.push("/");
  };
  render() {
    let { book, allReview, isShowComment } = this.state;
    let isEmptyObj = Object.keys(book).length === 0;
    return (
      <React.Fragment>
        <div className="container">
          <section className="homepage-header-container">
            <HomeHeader />
          </section>
          <section id="sidebar">
            <p>
              <span
                onClick={() => this.handleReturnHome()}
                style={{ cursor: "pointer" }}
              >
                Trang chủ
              </span>{" "}
              |{" "}
              <span
                onClick={() => this.handleReturnCate(book.category?.categoryId)}
                style={{ cursor: "pointer" }}
              >
                {book.category?.nameCate}
              </span>
              | <b>{book.nameBook}</b>
            </p>
          </section>
          <div className="detail-body row">
            <img
              className="detail-img col-xs-6 col-md-4"
              src={book.image}
              alt="book-img"
            />
            <div className="col-xs-12 col-md-8">
              <h3>{book.nameBook}</h3>
              <p className="gia">
                {" "}
                Giá: <p className="detail-price">{book.price} đ</p>
              </p>
              <p className="info">
                Nhà xuất bản: <span className="info2">{book.publishCom}</span>{" "}
              </p>
              <p className="info">
                {" "}
                Tác giả: <span className="info2">{book.author}</span>{" "}
              </p>
              <p className="info">
                {" "}
                Năm xuất bản: <span className="info2">
                  {book.publishYear}
                </span>{" "}
              </p>
              <p className="info">
                {" "}
                Loại sách:{" "}
                <span className="info2">{book.category?.nameCate}</span>
              </p>
              <p className="info">
                {" "}
                Số lượng còn lại: <span className="info2">{book.count}</span>
              </p>
            </div>
          </div>
          <div className="description">
            <h4>Mô tả:</h4>
            <p>{book.description}</p>
          </div>

          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(DetailBook);
