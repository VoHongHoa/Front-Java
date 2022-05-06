import React, { Component } from "react";
import "./SectionProduct.css";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import sach1 from "../../assets/images/sach1.jpg";
import sach2 from "../../assets/images/sach2.webp";
import sach3 from "../../assets/images/sach3.jpg";
import { toast } from "react-toastify";
import { getBooksLibrary } from "../../services/BookService";
import { addToCart } from "../../store/actions/AppAction";
class SectionProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
    };
  }
  getAllBook = async () => {
    try {
      let res = await getBooksLibrary();
      //console.log(res);
      if (res) {
        this.setState({
          allBooks: res.bookList.bookList,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server!!");
    }
  };
  handleAddToCart = (item) => {
    //console.log(item);
    this.props.addToCart(item);
  };
  componentDidMount() {
    this.getAllBook();
  }
  render() {
    let { allBooks } = this.state;
    return (
      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row">
          {allBooks &&
            allBooks.length > 0 &&
            allBooks.map((item, index) => {
              return (
                <div className="col-md-4 mt-2" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <div className="card-img-actions">
                        <img
                          src={item.image}
                          className="card-img img-fluid"
                          width="96"
                          height="350"
                          alt="item.nameBook"
                        />
                      </div>
                    </div>
                    <div className="card-body bg-light text-center">
                      <div className="mb-2">
                        <h6 className="font-weight-semibold mb-2">
                          <a
                            href="#"
                            className="text-default mb-2"
                            data-abc="true"
                          >
                            {item.description}
                          </a>
                        </h6>
                        <a href="#" className="text-muted" data-abc="true">
                          {item.nameBook}
                        </a>
                      </div>
                      <h3 className="mb-0 font-weight-semibold">
                        {item.price}
                      </h3>
                      <div>
                        <i className="fa fa-star star"></i>
                        <i className="fa fa-star star"></i>
                        <i className="fa fa-star star"></i>
                        <i className="fa fa-star star"></i>
                      </div>
                      <div className="text-muted mb-3">34 reviews</div>
                      <button
                        type="button"
                        className="btn bg-cart"
                        onClick={() => this.handleAddToCart(item)}
                      >
                        <i className="fa fa-cart-plus mr-2"></i> Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SectionProduct);
