import { combineReducers } from "redux";
import shop from "./shop";
import orders from "./orders";
import auth from "./auth";

const rootReducer = combineReducers({ shop, orders, auth });

export default rootReducer;
