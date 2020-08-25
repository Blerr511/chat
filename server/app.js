const config = require("./config/config.json");
const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
//----------------------------------------------------------//
const connectMongo = require("./mongodb/mongooseConnect");
const responseMiddleware = require("./middleware/response.middleware");
const loginApi = require("./api/login.api");
const registerApi = require("./api/register.api");
const authMiddleware = require("./middleware/auth.middleware");
connectMongo();
//----------------------------------------------------------//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-------------------------------//

app.post("/api/register", registerApi, responseMiddleware);
app.get("/api/login", loginApi, responseMiddleware);
app.get("/api/test", authMiddleware, responseMiddleware);

//----------------------------------------------------------//
io.on("connect", (socket) => {
    console.log("socket hello");
});

server.listen(config.dev.PORT, () => {
    console.log(`Listening port - ${config.dev.PORT}`);
});
