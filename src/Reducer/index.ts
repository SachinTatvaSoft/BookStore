import { combineReducers } from "redux";
import user from "./users";

export const rootReducer = combineReducers({users:user})