const sequelize = require("../DataBase/connection")
const Sequelize = require("sequelize")

const UserProduct = sequelize.define("userProduct",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    UserId:{
        type:Sequelize.STRING
    },
    ProductId:{
        type:Sequelize.INTEGER
    }
},{freezeTableName:true})


module.exports = UserProduct