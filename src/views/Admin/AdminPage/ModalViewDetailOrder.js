import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
class ModalViewDetailOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {}
  toggle = () => {
    this.props.toggle();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpenModalView}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-product-container"}
        size="md"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          <p>Chi tiết đơn hàng</p>
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-product-container row">
            <p style={{ textAlign: "center" }}>Thông tin đơn hàng</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Chuyển trạng thái đơn hàng</Button>
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

export default ModalViewDetailOrder;
