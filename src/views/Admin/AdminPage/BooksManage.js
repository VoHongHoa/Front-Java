import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import {
  addNewCategoriesBooks,
  deleteCategories,
  getAllCategoriesBooks,
} from "../../../services/CategoriesBooksService";
import ModalAddNewBook from "./ModalAddNewBook";
class BooksManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   newCategories: "",
      //   allCategories: [],
      //   currentPage: 0,
      //   numOfCategories: 0,
      //   numOfPage: 0,
      isOpenModal: false,
    };
  }
  //   getCategoriesPaging = async (currentPage) => {
  //     let res = await getAllCategoriesBooks(currentPage);
  //     // console.log(res);
  //     if (res) {
  //       let numOfPage = 0;
  //       if (res.count % 4 === 0) {
  //         numOfPage = res.count / 4;
  //       } else {
  //         numOfPage = (res.count - (res.count % 4)) / 4 + 1;
  //       }
  //       this.setState({
  //         numOfCategories: res.count,
  //         allCategories: res.categoriesList,
  //         numOfPage: numOfPage,
  //       });
  //     } else {
  //       this.setState({
  //         ...this.state,
  //       });
  //     }
  //   };
  componentDidMount() {
    // this.getCategoriesPaging(0);
  }
  //   handleChangePage = (item) => {
  //     this.getCategoriesPaging(item);
  //     this.setState({
  //       currentPage: item,
  //     });
  //   };
  //   handleDeleteUser = async (userId) => {
  //     let res = await deleteCategories(userId);
  //     console.log(res);
  //     if (res) {
  //       toast.success("Xóa thành công!");
  //     }
  //     this.getCategoriesPaging(0);
  //   };
  //   handleOnchangeInput = (event) => {
  //     this.setState({
  //       newCategories: event.target.value,
  //     });
  //   };
  //   handleAddNewCategoriesBook = async () => {
  //     let data = {
  //       nameCate: this.state.newCategories,
  //     };
  //     let res = await addNewCategoriesBooks(data);
  //     if (res) {
  //       toast.success("Thêm thành công");
  //       this.setState({
  //         newCategories: "",
  //       });
  //       this.getCategoriesPaging(0);
  //     } else {
  //       toast.error("Thêm không thành công");
  //     }
  //   };
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
  render() {
    // let { numOfPage, allCategories, currentPage } = this.state;
    // let arr = [];
    // for (let i = 0; i < numOfPage; i++) {
    //   arr.push(i);
    // }
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

        {/* <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Loại sách và Tên</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {allCategories &&
                allCategories.length > 0 &&
                allCategories.map((item, index) => {
                  return (
                    <tr key={item.categoryId}>
                      <th scope="row">{index}</th>
                      <td>{item.nameCate}</td>
                      <td>
                        <i
                          className="fas fa-trash "
                          onClick={() => this.handleDeleteUser(item.categoryId)}
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
        </div> */}
        <ModalAddNewBook
          isOpenModal={this.state.isOpenModal}
          toggle={this.toggle}
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
