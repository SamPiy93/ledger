const db = require("../models");
const Ledger = db.ledgers
const Op = db.Sequelize.Op

exports.findAll = (req, res) => {
  console.log('inside controller')
  Ledger.findAll().then(data => {
    console.error('data => ', data);
    res.send(data);
  }).catch(error => {
    console.error('error => ', error)
    res.status(500).send({
      message: 'error db querying...'
    })
  })
}
