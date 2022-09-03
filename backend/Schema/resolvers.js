const User = require("../Models/user")
const Product = require("../Models/product")
const Comment = require("../Models/comment")
const UserProduct = require("../Models/userProduct")
const Category = require("../Models/category")
const db = require("../DataBase/connection")
const {Op} = require("sequelize")
const {v4} = require("uuid")
const {GraphQLScalarType} = require("graphql")



const GraphQLDateType = new GraphQLScalarType({
    name:"Date",
    description:"valid",
    serialize:(value)=>value,
    parseValue:(value)=>value,
    parseLiteral:(ast)=>ast.value
}) 

const resolvers = {
    Query : {
        
        async getAllProducts(parent,args,context,info){
            
            var allProducts = []
           
            if(args.categoryId === 90){

                allProducts = await Product.findAll({
                    limit:8,
                    offset:args.offset
                })
                return allProducts;

            }

            allProducts = await Product.findAll({
                where:{
                    CategoryId:args.categoryId   
                },
                limit:10,
                offset:args.offset
            });

            return allProducts
        },
        async getUserProducts(parent,args,context,info){
           
            const allProducts = await User.findOne({
                where:{
                    id:args.userId
                },
                include:{
                    model:Product,
                    through:{
                        attributes:["quantity"]
                    }
                }
            });

            return allProducts.toJSON()
        },
        async getProduct(parent,args,context,info){

            const ProductSingle = await Product.findOne({
                where:{
                    id:args.productId
                }
            });

            const Comments = await Comment.findAll({
                where:{
                    ProductId:args.productId
                },
                order:[["createdAt","DESC"]]
            })
            
            ProductSingle.Comments = Comments
        
            return ProductSingle
        },
        async getCartCount(parent,args,context,info){
            
            const count = await UserProduct.count({
                where:{
                    UserId:args.userId
                }
            })

            return {count:count}
        },
        async searchProduct(parent,args,context,info){

            const categories = await Category.findAll({
                where:{
                    name:{
                        [Op.startsWith]:args.searchValue
                    }
                }
            })

            return categories
        }

    },
    Mutation : {
        async createNewUser(parent,args,context,info){
          
            const isUserAvailable = await User.findOne({where:{id:args.userId}})
       
            if(isUserAvailable){
                return {state:"success",userId:""}
            }
            const v4Id = v4()
            await User.create({
                id:v4Id
            })

            return {state:"success",userId:v4Id}
        },
        async addToCart(parent,args,context,info){
            
            try {

                const isProductAvailable = await UserProduct.findOne({
                    where:{
                        UserId:args.userId,
                        ProductId:args.productId
                    }
                })
             
                if(!isProductAvailable){
                    
                    await UserProduct.create({
                        UserId:args.userId,
                        ProductId:args.productId
                    })

                }else{

                    await UserProduct.update({
                        quantity:isProductAvailable.quantity + 1
                    },{where:{UserId:args.userId,ProductId:args.productId}})

                }


            } catch (error) {

                return {state:"failed",userId:""}

            }

            return {state:"success",userId:""}
        },
        async deleteFromCart(parent,args,context,info){

            await UserProduct.destroy({
                where:{
                    UserId:args.userId,
                    ProductId:args.productId
                }
            })

            return {state:"success",userId:""}
        }, 
        async createComment(parent,args,context,info){

            const commentObject = await Comment.create({
                message:args.message,
                ProductId:args.productId,
                star:args.star
            })

            return commentObject
        },
        async changeQuantity(parent,args,context,info){
          
            try {

                await UserProduct.update({
                    quantity:args.quantity
                },{where:{UserId:args.userId,ProductId:args.productId,}})
    
                return {state:"success"}

            } catch (error) {

                return {state:"error"}

            }
          
        },

    },
    Date:GraphQLDateType
}


module.exports = resolvers