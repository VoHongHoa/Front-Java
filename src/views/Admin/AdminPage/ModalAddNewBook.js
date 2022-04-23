import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import CommonUtils from "../../../utils/CommonUtils";
import { getAllCategoriesBooksRedux } from "../../../store/actions/CategoriesAction";
class ModalAddNewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameBook: "",
      author: "",
      publishYear: "",
      publishCom: "",
      price: "",
      count: "",
      description: "",
      image: "",
      allCategoriesBooks: [],
      selectedCategory: "",
    };
  }
  componentDidMount() {
    this.props.getAllCategoriesBooksRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allCategoriesBooks !== this.props.allCategoriesBooks) {
      this.setState({
        allCategoriesBooks: this.buildDataCateGories(
          this.props.allCategoriesBooks
        ),
      });
    }
  }
  toggle = () => {
    this.props.toggle();
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeSelect = (selectedOption, id) => {
    let name = id.name;
    let copyState = { ...this.state };
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeImage = async (event) => {
    let filedata = event.target.files;
    let file = filedata[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      //console.log(base64);
      //let objectUrl = URL.createObjectURL(file);
      this.setState({
        //priviewImgURL: objectUrl,
        image: base64,
      });
    }
  };
  handleSubmitAdd = () => {
    let data = {
      nameBook: this.state.nameBook,
      author: this.state.author,
      publishYear: this.state.publishYear,
      publishCom: this.state.publishCom,
      price: this.state.price,
      count: this.state.count,
      description: this.state.description,
      image: this.state.image,
      category: this.state.selectedCategory.value,
    };
    console.log(data);
    this.props.doAddNewBook(data);
    this.setState({
      nameBook: "",
      author: "",
      publishYear: "",
      publishCom: "",
      price: "",
      count: "",
      description: "",
      image: "",
      allCategoriesBooks: [],
      selectedCategory: "",
    });
  };
  buildDataCateGories = (listCategories) => {
    let arrCategories = [];
    for (let index = 0; index < listCategories.length; index++) {
      let objData = {};
      objData.label = listCategories[index].nameCate;
      let category = {};
      category.categoryId = listCategories[index].categoryId;
      category.nameCate = listCategories[index].nameCate;
      objData.value = category;
      arrCategories.push(objData);
    }
    return arrCategories;
  };
  render() {
    //console.log(this.state);
    let { allCategoriesBooks } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpenModal}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-product-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Thêm mới sản phẩm
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-product-container row">
            <div className="form-group mt-2 col-6">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "nameBook");
                }}
                value={this.state.nameBook}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Tác giả</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product descriptions"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "author");
                }}
                value={this.state.author}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Mô tả</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book descriptions"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "description");
                }}
                value={this.state.description}
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label>Giá</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product price"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "price");
                }}
                value={this.state.price}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Năm xuất bản</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product price"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "publishYear");
                }}
                value={this.state.publishYear}
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label>Nhà xuất bản</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product price"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "publishCom");
                }}
                value={this.state.publishCom}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>Số lượng sách</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product price"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "count");
                }}
                value={this.state.count}
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label>loại sách</label>
              <Select
                type="text"
                options={allCategoriesBooks}
                onChange={this.handleOnchangeSelect}
                name={"selectedCategory"}
              ></Select>
            </div>
            <div className="form-group mt-2 col-6">
              <label>Hình ảnh</label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => {
                  this.handleOnchangeImage(event);
                }}
              />

              <div
                className="mt-2"
                style={{
                  backgroundImage: `url(${this.state.image})`,
                  backgroundRepeat: "none",
                  backgroundSize: "cover",
                  width: "80px",
                  height: "100px",
                  backgroundPosition: "center",
                  margin: "0 auto",
                  border: " 1px solid black",
                }}
              ></div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSubmitAdd()}
          >
            Thêm mới
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { allCategoriesBooks: state.books.allCategoriesBooks };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategoriesBooksRedux: () => dispatch(getAllCategoriesBooksRedux()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddNewBook);
