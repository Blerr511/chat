const config = require("./config");
const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
require("colors");
//----------------------------------------------------------//
const connectMongo = require("./mongodb/mongooseConnect");
const responseMiddleware = require("./middleware/response.middleware");
const loginApi = require("./api/login.api");
const registerApi = require("./api/register.api");
const authMiddleware = require("./middleware/auth.middleware");
const { verify } = require("jsonwebtoken");
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
    delete io.sockets.connected[socket.id];
    const verifyOptions = {
        timeout: 3000,
        token: config.jwtSecret,
    };

    const tmr = setTimeout(() => {
        socket.disconnect("unauthorized");
    }, verifyOptions.timeout);

    const auth = (data) => {
        clearTimeout(tmr);
        verify(data.token, verifyOptions.token, (err, decoded) => {
            if (err) {
                return socket.disconnect("unauthorized");
            }
            if (decoded) {
                io.sockets.connected[socket.id] = socket;
                socket.user = decoded;
                socket.connectedAt = new Date();
                socket.emit("authenticated");
                console.info(`SOCKET ${socket.id} ` + "AUTHENTICATED".green);
            }
        });
    };

    socket.on("disconnect", () => {
        console.info(`SOCKET ${socket.id} ` + "DISCONNECTED".red);
    });

    socket.on("auth", auth);
});

server.listen(config.PORT, () => {
    console.info("Listening to port - " + config.PORT.toString().blue);
});
