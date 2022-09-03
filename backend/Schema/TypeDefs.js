const {gql} = require("apollo-server-express")


const typeDefs = gql`
  scalar Date

  type Count{
      count:Int!   
  }
  
  type ResponseState{
     state: String!
     userId: String!
  }

  type Category{
      name:String!
      id:Int!
  }

  type UserProduct{
     quantity:Int!
  }


  type Comment{
    id:Int!
    message:String!
    star:Int!
    createdAt:Date!
  }
  
  type User {
     id: String!
     Products:[Product!]!
  }


  type Product {
     id: Int!
     price: Int!
     name : String!
     starPoint: Int!
     url: String!
     Comments:[Comment!]!
     userProduct:UserProduct!
  }

  type Query {
     getAllProducts(categoryId:Int! offset:Int!) : [Product!]!
     getUserProducts(userId:String!) : User!
     getCartCount(userId:String!) : Count!
     getProduct(productId:Int!) : Product!
     searchProduct(searchValue:String!) : [Category!]!
  }

  type Mutation {
     createNewUser(userId:String!) : ResponseState!
     deleteFromCart(userId:String! productId:Int!) : ResponseState!
     addToCart(userId:String! productId:Int!) : ResponseState!
     createComment(message:String! productId:Int! star:Int!) : Comment!
     changeQuantity(userId:String! productId:Int! quantity:Int!) : ResponseState!
  }

` 



module.exports = typeDefs