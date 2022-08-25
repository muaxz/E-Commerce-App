const sequelize = require("../DataBase/connection")
const Sequelize = require("sequelize")
const Product = require("../Models/product")

const Category = sequelize.define("category",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    name:{
        type:Sequelize.STRING
    }
})

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = Category