const sequelize = require("../DataBase/connection")
const Sequelize = require("sequelize")

const Product = sequelize.define("Product",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    name:{
        type:Sequelize.STRING,
    },
    price:{
        type:Sequelize.INTEGER
    },
    starPoint:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    url:{
        type:Sequelize.TEXT,
    }

})


module.exports = Product