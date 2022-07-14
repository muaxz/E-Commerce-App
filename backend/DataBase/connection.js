const sequelize = require("sequelize")
const {Sequelize} = require("sequelize")


const sequelizeBase = new Sequelize("e-commerce","root","2231223122aA",{host:"localhost",dialect:"mysql"})

sequelizeBase.authenticate().then(()=>console.log("connected!"))

module.exports = sequelizeBase;