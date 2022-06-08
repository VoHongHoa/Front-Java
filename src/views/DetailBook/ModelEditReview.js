import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModelEditReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      reviewId: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.review !== this.props.review) {
      this.setState({
        review: this.props.review.review,
        reviewId: this.props.review._id,
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
      review: this.state.review,
      reviewId: this.state.reviewId,
    };
    this.props.doEditReview(data);
    this.setState({
      review: "",
      reviewId: "",
    });
  };

  render() {
    let { review } = this.state;
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
                onChange={event => {
                  this.handleOnchangeInput(event, "review");
                }}
                value={this.state.review}
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
