import { combineReducers } from "redux";
import auth from "./auth.reducer";
import rooms from "./room.reducer";
import server from "./server.reducer";
import users from "./users.reducer";

const reducer = combineReducers({
    auth,
    rooms,
    users,
    server,
});

export default reducer;
