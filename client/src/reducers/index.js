import { combineReducers } from "redux";
import auth from "./auth.reducer";
import rooms from "./room.reducer";

const reducer = combineReducers({
    auth,
    rooms,
});

export default reducer;
