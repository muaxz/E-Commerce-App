const {gql} = require("apollo-server-express")


const typeDefs = gql`
  type Count{
      count:Int!   
  }

  type Result{
     state: String!
     userId: String!
  }

  type Comment{
    id:Int!
    message:String!
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
  }

  type Query {
     getAllProducts : [Product!]!
     getUserProducts(userId:String!) : User!
     getCartCount(userId:String!) : Count!
     getProduct(productId:Int!) : Product!
  }

  type Mutation {
     createNewUser(userId:String!) : Result!
     deleteFromCart(userId:String! productId:Int!) : Result!
     addToCart(userId:String! productId:Int!) : Result!
     
  }

` 



module.exports = typeDefs