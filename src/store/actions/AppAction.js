import {
  handleLogin,
  getUserInfor,
  editUserInfor,
} from "../../services/userService";
import { toast } from "react-toastify";
//------------------cart action------------------------------
export const addToCart = (item) => {
  //console.log("check user:", user);
  return async (dispatch, getState) => {
    item.quantity = 1;
    dispatch(addToCartSuccess(item));
  };
};
export const addToCartFailded = () => ({
  type: "ADD_TO_CART_FAILED",
  item: [],
});
export const addToCartSuccess = (item) => ({
  type: "ADD_TO_CART_SUCCESS",
  item: item,
});

export const changeInputItem = (allItems) => {
  return async (dispatch, getState) => {
    dispatch(changeInputItemSuccess(allItems));
  };
};
export const changeInputItemFailded = () => ({
  type: "CHANGE_INPUT_ITEM_FAILED",
  allItems: [],
});
export const changeInputItemSuccess = (allItems) => ({
  type: "CHANGE_INPUT_ITEM_SUCCESS",
  allItems: allItems,
});

export const deleteItem = (item) => {
  return async (dispatch, getState) => {
    dispatch(deleteItemSuccess(item));
  };
};
export const deleteItemFailded = () => ({
  type: "DELETE_ITEM_FAILED",
  itemDelete: [],
});
export const deleteItemSuccess = (item) => ({
  type: "DELETE_ITEM_SUCCESS",
  itemDelete: item,
});
export const deleteCart = () => ({
  type: "DELETE_CART",
});
//----------------------------------------------------------

//------------------user action------------------------------

export const handleLoginRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      let respone = await handleLogin(data);
      // console.log(respone);
      if (respone) {
        localStorage.setItem("token", respone.accessToken);
        let userInfor = await getUserInfor();
        // console.log("check userinfor", userInfor);
        dispatch(loginSuccess(userInfor));
      } else {
        toast.success("Tên Đăng nhập hoặc mật khẩu không chính xác!!");
        dispatch(loginFailed());
      }
    } catch (e) {
      toast.error("Lỗi server!!!");
      console.error(e);
      dispatch(loginFailed());
    }
  };
};

export const loginSuccess = (userInfor) => ({
  type: "LOGIN_SUCCESS",
  userInfor: userInfor,
});
export const loginFailed = () => ({
  type: "LOGIN_FAILED",
  userInfor: {},
});

export const logOutSuccess = () => ({
  type: "LOGOUT_SUCCESS",
  userInfor: {},
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let respone = await editUserInfor(data);
      console.log("check res", respone);
      if (respone) {
        toast.success("Thay đổi thông tin  thành công");
        dispatch(editUserSuccess(respone));
      } else {
        toast.error("Thay đổi không thành công!!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      console.error(e);
      toast.error("Lỗi server!!");
      dispatch(editUserFailed());
    }
  };
};
export const editUserSuccess = (data) => ({
  type: "EDIT_USER_SUCCESS",
  userData: data,
});
export const editUserFailed = () => ({
  type: "EDIT_USER_FAILED",
  userData: {},
});
