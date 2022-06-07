import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";
import { addNewBlog, getAllBlog } from "../../../services/BlogService";
const mdParser = new MarkdownIt();
class BlogManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedBlog: "",
      action: "",
      allBlog: [],
    };
  }
  componentDidMount() {
    this.handleGetAllBlog();
  }
  componentDidUpdate() {}

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleGetAllBlog = async () => {
    try {
      let res = await getAllBlog();
      console.log(res);
      this.setState({
        allBlog: res,
      });
    } catch (e) {
      console.log(e);
    }
  };
  // builDataSelect = (allBlog) => {
  //   let dataSelect = []
  //   for (let index = 0; index < allBlog.length; index++) {
  //     let obj = {}
  //     obj.value = allBlog[index].blogId
  //     obj.label = allBlog[index]
  //     const element = array[index];

  //   }
  // };
  handleAddNewBlog = async () => {
    this.setState({
      action: "ADD_BLOG",
    });
    try {
      let data = {
        content: this.state.contentHTML,
      };
      let res = await addNewBlog(data);
      if (res === "successful") {
        toast.success("Thêm Blog thành công");
      }
      console.log(res);
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  handleOnchangeSelect = (selectedOption, id) => {
    let name = id.name;
    let copyState = { ...this.state };
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  render() {
    let allCategoriesBooks = [];
    return (
      <div className="container">
        <AdminHeader></AdminHeader>
        <h2 className="title mt-3">Quản lý các Blog</h2>
        <div className="row">
          <div className="col-3">
            <div className="form-group">
              <label>Chọn blog</label>
              <Select
                type="text"
                options={allCategoriesBooks}
                onChange={this.handleOnchangeSelect}
                value={this.state.selectedCategory}
                name={"selectedCategory"}
              ></Select>
            </div>
          </div>
          <div className="col-9">
            <MdEditor
              style={{ height: "550px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={() => this.handleAddNewBlog()}
            >
              Thêm Blog
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { userInfor: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogManage)
);
