import { getAllCategoriesBooks } from "../../services/CategoriesBooksService";
import { toast } from "react-toastify";
//------------------cart action------------------------------
export const getAllCategoriesBooksRedux = (page) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCategoriesBooks(page);
      if (res) {
        dispatch(getAllCategoriesBooksSuccess(res));
      } else {
        dispatch(getAllCategoriesBooksFailed());
      }
    } catch (e) {
      toast.error("Lỗi server!!!");
      console.error(e);
      dispatch(getAllCategoriesBooksFailed());
    }
  };
};
export const getAllCategoriesBooksFailed = () => ({
  type: "GET_ALL_CATEGORIES_BOOKS_FAILED",
  item: [],
});
export const getAllCategoriesBooksSuccess = (item) => ({
  type: "GET_ALL_CATEGORIES_BOOKS_SUCCESS",
  item: item,
});
