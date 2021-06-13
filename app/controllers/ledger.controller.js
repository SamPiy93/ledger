const {processLedgerRequest} = require("../services/ledger.service");

exports.getLedgerRecordsByFilterCriteria = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Filter criteria cannot be empty"
    });
  }
  const { startDate, endDate, frequency, weeklyAmount, timezone } = req.query;
  
  const ledgerRecords = processLedgerRequest(startDate, endDate, frequency, weeklyAmount, timezone) || {}
  
  if (!ledgerRecords) {
    res.status(204).send({
      message: 'no ledger records generated'
    })
  }
  res.status(200).send(ledgerRecords);
}