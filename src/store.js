import userReducer from "./reducers/userReducer";
import { createStore } from "redux";

export const store = createStore(
    userReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );