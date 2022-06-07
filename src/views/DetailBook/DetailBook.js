import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { findBooksByBookId } from "../../services/BookService";
import { addToCart } from "../../store/actions/AppAction";

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
    console.log("book:", res.category);
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
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(DetailBook);
