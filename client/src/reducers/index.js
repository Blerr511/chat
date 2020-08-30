import { combineReducers } from "redux";
import auth from "./auth.reducer";
import rooms from "./room.reducer";
import users from "./users.reducer";

const reducer = combineReducers({
    auth,
    rooms,
    users,
});

export default reducer;
