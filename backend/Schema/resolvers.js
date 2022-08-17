const User = require("../Models/user")
const Product = require("../Models/product")
const Comment = require("../Models/comment")
const UserProduct = require("../Models/userProduct")
const {v4} = require("uuid")


const resolvers = {
    Query : {
        async getAllProducts(parent,args,context,info){

            const allProducts = await Product.findAll();

            return allProducts
        },
        async getUserProducts(parent,args,context,info){
           
            const allProducts = await User.findOne({
                where:{
                    id:args.userId
                },
                include:{
                    model:Product,
                }
            });

            return allProducts
        },
        async getProduct(parent,args,context,info){

            const ProductSingle = await Product.findOne({
                where:{
                    id:args.productId
                },
                include:{
                    model:Comment
                }
            });
            
            return ProductSingle
        },
        async getCartCount(parent,args,context,info){
            
            const count = await UserProduct.count({
                where:{
                    UserId:args.userId
                }
            })

            return {count:count}
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

                await UserProduct.create({
                    UserId:args.userId,
                    ProductId:args.productId
                })

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
        }
    }
}


module.exports = resolvers