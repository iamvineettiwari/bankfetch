const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routeHandler = require("./routes/index");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/branches", routeHandler);

app.listen(PORT);
