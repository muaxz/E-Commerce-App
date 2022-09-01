const sequelize = require("../DataBase/connection")
const Sequelize = require("sequelize")
const Product = require("../Models/product")

const User = sequelize.define("user",{
    id:{
        primaryKey:true,
        unique:true,
        type:Sequelize.STRING
    }
})

User.belongsToMany(Product,{through:"userProduct"})
Product.belongsToMany(User,{through:"userProduct"})

module.exports = User