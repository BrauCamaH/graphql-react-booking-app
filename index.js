const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("Hello Wordl!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
