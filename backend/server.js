const express = require("express")
const {ApolloServer} = require("apollo-server-express")
const typeDefs = require("./Schema/TypeDefs")
const resolvers = require("./Schema/resolvers")
const staticProductList = require("./products")
const Product = require("./Models/product")
const User = require("./Models/user")
const userProduct = require("./Models/userProduct")
const DB = require("./DataBase/connection")
const app = express()
const Comment = require("./Models/comment")
const Category= require("./Models/category")
const cors = require("cors")
const port = 3001

app.use(cors({origin:"http://localhost:3000"}))
DB.sync().then(()=>console.log("changed"))

//Product.bulkCreate(staticProductList)

//var defaultCategories = [{name:"computer"},{name:"health"},{name:"household"},{name:"electronic"},{name:"game"},{name:"laptop"},{name:"toy"},{name:"sport"},{name:"Pet Supply"}]

//Category.bulkCreate(defaultCategories).then(()=>console.log("inserted"))

async function startApolloServer(){

  const apolloServer =  new ApolloServer({typeDefs,resolvers,csrfPrevention:true,context:({req,res})=>{return{req:req,res}}})

  await apolloServer.start()

  apolloServer.applyMiddleware({app,path:"/graphql"})
}

startApolloServer()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})