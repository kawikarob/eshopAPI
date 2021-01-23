const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.options("*", cors());

require("dotenv/config");
const api = process.env.API_URL;

const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");

// middleware //
app.use(bodyParser.json());
app.use(morgan("tiny"));

// routers //
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connention is ready");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3210, () => {
  console.log(api);
  console.log("server is running on http://localhost:3210");
});
