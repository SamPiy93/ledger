module.exports = app => {
  const ledgers = require("../controllers/ledger.controller.js");

  app.get("/ledgers", ledgers.getLedgerRecordsByFilterCriteria);
};