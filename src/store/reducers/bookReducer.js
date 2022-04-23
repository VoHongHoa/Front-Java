const initState = {
  allCategoriesBooks: [],
};
const bookReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_CATEGORIES_BOOKS_SUCCESS":
      state.allCategoriesBooks = action.data;
      //console.log(state);
      return { ...state };
    default:
      return state;
  }
};
export default bookReducer;
