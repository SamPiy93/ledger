const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const sequelize = require("./app/utils/database");
const ledger = require("./app/models/ledger")
const db = require('./app/models');
const app = express();
db.sequelize.sync({ force: true }).then(() => {
  console.log("DB initialized");
});

// var corsOptions = {
//   origin: "http://localhost:3001"
// };

// app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ledger :Different." });
});

require("./app/routes/ledger.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Server up on port ${PORT}.`);
    })
  } catch (error) {
    console.log('Error initializing DB # ', error);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
