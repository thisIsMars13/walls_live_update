const express = require("express");
const router = require("./router/router");
const session = require("express-session");
const cookie_parse = require("cookie-parser");
const flash = require("connect-flash");

const app = express();

let server = app.listen(8000, function () {
    console.log("app listening on port 8000");
});

const io = require("socket.io")(server);

io.on("connect", function (socket) {
    socket.on("new_post_comment", function (data) {
        socket.broadcast.emit("post_post_comment", data);
    });
});

app.use(cookie_parse());
app.use(
    session({
        secret: "sessionsecretv**",
        saveUninitialized: true,
        resave: true,
        cookie: { maxAge: 6000 },
    })
);
app.use(flash());

app.use(express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
