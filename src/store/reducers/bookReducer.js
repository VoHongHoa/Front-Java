const initState = {
  allCategoriesBooks: [],
};
const bookReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_CATEGORIES_BOOKS_SUCCESS":
      state.allCategoriesBooks = action.item;
      return state;
    default:
      return state;
  }
};
export default bookReducer;
