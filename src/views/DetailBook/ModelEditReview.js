import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModelEditReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      commentId: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.review !== this.props.review) {
      this.setState({
        content: this.props.review.content,
        commentId: this.props.review.commentId,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSubmitEdit = () => {
    let data = {
      content: this.state.content,
    };
    let commentId = this.state.commentId;
    console.log(data);
    this.props.doeditComment(commentId, data);
    this.setState({
      content: "",
      commentId: "",
    });
  };

  render() {
    let { content } = this.state;
    //console.log(review);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-product-container"}
        size="sm"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Chỉnh sửa bình luận
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-product-container row">
            <div className="form-group mt-2 col-12">
              <label>Chỉnh sửa bình luận</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter product name"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "content");
                }}
                value={content}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSubmitEdit()}
          >
            Lưu thay đổi
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

export default ModelEditReview;
