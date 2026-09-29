import express from "express";
import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 4001;

const app = express();
const router = express.Router();

router.get("/",(req, res)=> {
    res.send({ response: "I am alive"}).status(200);
});

app.use(router);

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    console.log(response);
    socket.emit("FromApi", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));


