import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import ModalAddNewBook from "./ModalAddNewBook";
import {
  addNewBook,
  getAllBooksPaging,
  deleteBook,
} from "../../../services/BookService";
class BooksManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      currentPage: 0,
      numOfBooks: 0,
      numOfPage: 0,
      isOpenModal: false,
    };
  }
  getBooksPaging = async (currentPage) => {
    try {
      let res = await getAllBooksPaging(currentPage);
      //console.log(res);
      if (res) {
        let numOfPage = 0;
        if (res.count % 4 === 0) {
          numOfPage = res.count / 4;
        } else {
          numOfPage = (res.count - (res.count % 4)) / 4 + 1;
        }
        this.setState({
          numOfBooks: res.count,
          allBooks: res.bookList,
          numOfPage: numOfPage,
        });
      } else {
        this.setState({
          ...this.state,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getBooksPaging(0);
  }
  handleChangePage = (item) => {
    this.getBooksPaging(item);
    this.setState({
      currentPage: item,
    });
  };
  handleDeleteBook = async (bookId) => {
    let res = await deleteBook(bookId);
    //console.log(res);
    if (res) {
      toast.success("Xóa thành công!");
    }
    this.getBooksPaging(0);
  };
  // handleOnchangeInput = (event) => {
  //   this.setState({
  //     newCategories: event.target.value,
  //   });
  // };

  handleAddNewBook = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  toggle = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  doAddNewBook = async (data) => {
    let res = await addNewBook(data);
    //console.log(res);
    if (res) {
      this.setState({
        isOpenModal: false,
      });
      toast.success("Thêm thành công !!!");
      this.getBooksPaging(0);
    } else {
      toast.error("Thêm thất bại!Vui lòng kiểm tra lại");
    }
  };
  render() {
    let { numOfPage, allBooks, currentPage } = this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    console.log(this.state);
    return (
      <div className="categories-manage-container container">
        <AdminHeader></AdminHeader>
        <h2 className="title mt-3">Quản lý sách</h2>
        <button
          className="btn btn-primary mt-2"
          onClick={() => this.handleAddNewBook()}
        >
          Thêm mới
        </button>

        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Tác giả</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {allBooks &&
                allBooks.length > 0 &&
                allBooks.map((item, index) => {
                  return (
                    <tr key={item.bookId}>
                      <th scope="row">{index}</th>
                      <td>{item.nameBook}</td>
                      <td>{item.author}</td>
                      <td>{item.count}</td>
                      <td>
                        <i
                          className="fas fa-trash "
                          onClick={() => this.handleDeleteBook(item.bookId)}
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
        <ModalAddNewBook
          isOpenModal={this.state.isOpenModal}
          toggle={this.toggle}
          doAddNewBook={this.doAddNewBook}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BooksManage)
);
