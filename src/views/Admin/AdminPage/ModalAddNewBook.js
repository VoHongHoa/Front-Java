import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import CommonUtils from "../../../utils/CommonUtils";
import { getAllCategoriesBooksRedux } from "../../../store/actions/CategoriesAction";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
class ModalAddNewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: "",
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
    if (prevProps.action !== this.props.action) {
      this.setState({
        action: this.props.action,
      });
      if (this.props.action === "ADD_NEW_BOOK") {
        this.setState({
          bookId: "",
          nameBook: "",
          author: "",
          publishYear: "",
          publishCom: "",
          price: "",
          count: "",
          description: "",
          image: "",
          selectedCategory: "",
        });
      }
    }
    if (prevProps.currentBook !== this.props.currentBook) {
      //console.log(this.props.currentBook);
      this.setState({
        currentBook: this.props.currentBook,
        bookId: this.props.currentBook.bookId,
        nameBook: this.props.currentBook.nameBook,
        author: this.props.currentBook.author,
        publishYear: this.props.currentBook.publishYear,
        publishCom: this.props.currentBook.publishCom,
        price: this.props.currentBook.price,
        count: this.props.currentBook.count,
        description: this.props.currentBook.description,
        image: this.props.currentBook.image,
        selectedCategory: {
          value: this.props.currentBook.category,
          label: this.props.currentBook.category.nameCate,
        },
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
    //console.log(file);
    if (file) {
      const storageRef = ref(storage, `/books/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("check url", url);
            this.setState({
              image: url,
            });
          });
        }
      );
    }
  };
  handleSubmitAdd = () => {
    if (this.checkValidateInput()) {
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
      let dataEdit = {
        bookId: this.state.bookId,
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
      let bookId = this.state.bookId;
      if (this.state.action === "EDIT_BOOK") {
        this.props.doEditBook(dataEdit, bookId);
      } else {
        this.props.doAddNewBook(data);
      }
      this.setState({
        nameBook: "",
        author: "",
        publishYear: "",
        publishCom: "",
        price: "",
        count: "",
        description: "",
        image: "",
        selectedCategory: "",
      });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      { value: "nameBook", label: "T??n s??ch" },
      { value: "author", label: "T??c gi???" },
      { value: "publishYear", label: "N??m xu???t b???n" },
      { value: "publishCom", label: "Nh?? xu???t b???n" },
      { value: "price", label: "Gi??" },
      { value: "count", label: "S??? l?????ng" },
      { value: "image", label: "H??nh ???nh" },
      { value: "selectedCategory", label: "Lo???i s??ch" },
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i].value]) {
        isValid = false;
        toast.error(`Vui l??ng ??i???n th??ng tin: ${arrInput[i].label}`);
        break;
      }
    }
    return isValid;
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
    let { allCategoriesBooks, action } = this.state;
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
          {action === "EDIT_BOOK" ? "Ch???nh s???a s??ch" : "Th??m m???i s??ch"}
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-product-container row">
            <div className="form-group mt-2 col-6">
              <label>T??n s??ch</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nh???p t??n s??ch"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "nameBook");
                }}
                value={this.state.nameBook}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>T??c gi???</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nh???p t??n t??c gi???"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "author");
                }}
                value={this.state.author}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>M?? t???</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Nh???p m?? t???"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "description");
                }}
                value={this.state.description}
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label>Gi??</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nh???p gi??"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "price");
                }}
                value={this.state.price}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>N??m xu???t b???n</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nh???p gi?? s??ch"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "publishYear");
                }}
                value={this.state.publishYear}
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label>Nh?? xu???t b???n</label>
              <input
                type="text"
                className="form-control"
                placeholder="N??m xu???t b???n"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "publishCom");
                }}
                value={this.state.publishCom}
              />
            </div>
            <div className="form-group mt-2 col-6">
              <label>S??? l?????ng s??ch</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nh???p s??? l?????ng s??ch"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "count");
                }}
                value={this.state.count}
              />
            </div>

            <div className="form-group mt-2 col-6">
              <label>Lo???i s??ch</label>
              <Select
                type="text"
                options={allCategoriesBooks}
                onChange={this.handleOnchangeSelect}
                value={this.state.selectedCategory}
                name={"selectedCategory"}
              ></Select>
            </div>
            <div className="form-group mt-2 col-6">
              <label>H??nh ???nh</label>
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
            {action === "EDIT_BOOK" ? "L??u thay ?????i" : "Th??m m???i"}
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            H???y
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
