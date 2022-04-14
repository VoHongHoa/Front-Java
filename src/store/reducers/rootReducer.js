import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import cartreducer from "../reducers/cartReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartreducer,
});
export default persistReducer(persistConfig, rootReducer);
