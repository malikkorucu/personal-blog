const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./helpers/db/connectDatabase");
const router = require("./router");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");

const PORT = process.env.PORT || 5000;

//cors configure
app.use(cors());
app.options("*", cors());

//for post body reading
app.use(express.json());

//dotenv configuration
dotenv.config({
    path: "./config.env",
});

//static files
app.use(express.static(path.join(__dirname, "static")));

//database connection
connectDatabase();

app.use("/api", router);

//error handler
app.use(customErrorHandler);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + '/public/'))

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}


app.listen(PORT, () => {
    console.log(`server ${PORT}. portta başarıyla başlatıldı`);
});