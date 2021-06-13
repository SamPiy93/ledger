const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./app/routes/ledger.routes.js")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ledger :Different." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
