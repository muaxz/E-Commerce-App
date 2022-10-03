const {Sequelize} = require("sequelize")


const sequelizeBase = new Sequelize("heroku_b90041b976bbb35","bee24fb0efc68b","8468f771",{host:"us-cdbr-east-06.cleardb.net",dialect:"mysql",pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 60000
  }})

sequelizeBase.authenticate().then(()=>console.log("connected!"))

module.exports = sequelizeBase;