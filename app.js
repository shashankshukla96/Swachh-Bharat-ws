var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var reportsRouter = require("./routes/reports");
var collectorsRouter = require("./routes/collectors");
var supervisorRouter = require("./routes/supervisor");
var adminRouter = require("./routes/admin");
const makeDbConnection = require("./utils/db");

makeDbConnection();
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    console.log(req.url, req.body);
    next();
});

app.use("/reports", reportsRouter);
app.use("/collector", collectorsRouter);
app.use("/supervisor", supervisorRouter);
app.use("/admin", adminRouter);

//fallback Route
app.use("/**", (req, res) => {
    res.status(200).json({
        response: {
            messsage: "Request API Not Found",
            status: 400,
        },
    });
});

module.exports = app;
