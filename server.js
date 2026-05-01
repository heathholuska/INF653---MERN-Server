const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsoptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

require("dotenv").config();

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resource SHaring - CORS
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(cookieParser());

// Serve from files in the views folder
app.use("/", express.static(path.join(__dirname, "/public")));

//Route for the root URL
app.get("^/$|/index(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 404 Catch-all

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use(("/register", require("./routes/register")));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require(".routes/logout"));

// Connect states routes
app.use("/states", require("./routes/api/states"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
