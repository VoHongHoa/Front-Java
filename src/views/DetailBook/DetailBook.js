import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { findBooksByBookId } from "../../services/BookService";
import "./DetailBook.scss";
import { addToCart } from "../../store/actions/AppAction";
import {
  addComment,
  getComment,
  editComment,
  deleteComment,
} from "../../services/ReviewService";
import moment from "moment";
import { toast } from "react-toastify";
import defaultAvatar from "../../assets/images/avatar.jpg";
import { connect } from "react-redux";
import ModelEditReview from "./ModelEditReview";

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
    //console.log("book:", res);
    this.getAllReviews(id);
    if (res) {
      this.setState({
        book: res ? res : {},
      });
    }
  }

  handleAddToCart = (book) => {
    this.props.addToCart(book);
  };

  handleReturnHome = () => {
    this.props.history.push("/");
  };

  handleReturnCate = (cateId) => {
    this.props.history.push("/");
  };

  getAllReviews = async (bookId) => {
    try {
      let res = await getComment(bookId);
      //console.log(res);
      this.setState({
        allReview: res,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleOnchangeInput = (event) => {
    this.setState({
      newReview: event.target.value,
    });
  };

  checkAddNewComment = () => {
    let isValid = true;
    if (this.props.isLogin === false) {
      toast.error("Vui lòng đăng nhập");
      isValid = false;
      return;
    }
    if (this.state.newReview === "") {
      toast.error("Vui lòng thêm nội dung bình luận!");
      isValid = false;
      return;
    }
    return isValid;
  };

  handleAddNewReview = async () => {
    try {
      if (this.checkAddNewComment()) {
        let data = {
          content: this.state.newReview,
        };
        let bookId = this.props.match.params.id;
        let res = await addComment(data, bookId);
        //console.log(res);
        if (res === "successfull") {
          this.setState({
            newReview: "",
          });
          toast.success("Thêm bình luận thành công!");
          this.getAllReviews(this.props.match.params.id);
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Thêm bình luận không thành công");
    }
  };

  handleShowComment = () => {
    this.setState({
      isShowComment: !this.state.isShowComment,
    });
  };

  handledeleteComment = async (reviewId) => {
    try {
      let res = await deleteComment(reviewId);
      console.log(res);
      // if (res && res.success === true) {
      //   toast.success("Xóa bình luận thành công!");
      //   this.getAllReviews(this.props.match.params.id);
      // }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };

  handleOpenModaleditComment = async (item) => {
    this.setState({
      curentReview: item,
      isOpenModal: true,
    });
  };

  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  doeditComment = async (commentId, data) => {
    try {
      let res = await editComment(commentId, data);
      console.log(res);
      if (res && res === "successfull") {
        toast.success("Chỉnh sửa thành công");
        this.getAllReviews(this.props.match.params.id);
        this.setState({
          isOpenModal: false,
        });
      } else {
        toast.error("Chỉnh sửa thất bại");
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };

  render() {
    let { book, allReview, isShowComment } = this.state;
    let isEmptyObj = Object.keys(book).length === 0;
    //console.log(allReview);
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
              </span>
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
                Giá: <span className="detail-price">{book.price} đ</span>
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
          <div className="comment">
            <h2>Bình luận</h2>
            <div className="form-groud">
              <label>Thêm bình luận</label>

              <textarea
                className="form-control"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.newReview}
              ></textarea>
            </div>
            <button
              className="btn btn-primary mb-2 mt-2"
              onClick={() => this.handleAddNewReview()}
            >
              Thêm bình luận
            </button>
          </div>

          <div className="container mt-5">
            <div className="row  d-flex justify-content-center">
              <div className="col-md-8">
                <div className="headings d-flex justify-content-between align-items-center mb-3">
                  <h5> {allReview.length} Bình luận</h5>

                  <div className="buttons">
                    <span className="badge bg-white d-flex flex-row align-items-center">
                      <span className="text-primary">
                        Hiện bình luận {isShowComment === true ? "ON" : "OFF"}
                      </span>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked={this.state.isShowComment}
                          onChange={() => this.handleShowComment()}
                        />
                      </div>
                    </span>
                  </div>
                </div>
                {isShowComment === true && (
                  <div className="comments-view mb-3">
                    {allReview &&
                      allReview.length > 0 &&
                      allReview.map((item, index) => {
                        return (
                          <div className="card p-3 mt-2" key={item.commentId}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="user d-flex flex-row align-items-center">
                                <img
                                  src={
                                    item.user && item.user.image
                                      ? item.user.image
                                      : defaultAvatar
                                  }
                                  width="30"
                                  className="user-img rounded-circle mr-2"
                                />
                                <span>
                                  <small className="font-weight-bold text-primary">
                                    {item.user && item.user.fullName
                                      ? item.user.fullName
                                      : "Người dùng"}
                                  </small>{" "}
                                  <small className="font-weight-bold">
                                    {item.content}
                                  </small>
                                </span>
                              </div>

                              {/* <small>
                                {moment(item.updatedAt).format("Do MMMM YYYY")}
                              </small> */}
                            </div>

                            {this.props.userInfor &&
                              this.props.userInfor.userId ===
                                item.user.userId && (
                                <div className="action d-flex justify-content-between mt-2 align-items-center">
                                  <div className="reply px-4">
                                    <small
                                      onClick={() =>
                                        this.handledeleteComment(item.commentId)
                                      }
                                    >
                                      Xóa
                                    </small>
                                    <span className="dots"></span>
                                    <small
                                      onClick={() =>
                                        this.handleOpenModaleditComment(item)
                                      }
                                    >
                                      Sửa
                                    </small>
                                  </div>
                                  <div className="icons align-items-center">
                                    <i className="fa fa-check-circle-o check-icon text-primary"></i>
                                  </div>
                                </div>
                              )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <ModelEditReview
            isOpen={this.state.isOpenModal}
            toggleFromParent={this.toggleFromParent}
            review={this.state.curentReview}
            doeditComment={this.doeditComment}
          />

          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { addToCart: (item) => dispatch(addToCart(item)) };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailBook)
);
