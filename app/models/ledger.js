module.exports = (sequelize, Sequelize) => {
    const Ledger = sequelize.define("Ledger", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Ledger;
  };