const sequelize = require("../DataBase/connection")
const Sequelize = require("sequelize")
const Product = require("./product")

const Comment = sequelize.define("Comment",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    message:{
        type:Sequelize.TEXT,
    },

})

Comment.belongsTo(Product)
Product.hasMany(Comment)


module.exports = Comment