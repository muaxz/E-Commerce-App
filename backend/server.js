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
const cors = require("cors")
const port = 3001

app.use(cors({origin:"http://localhost:3000"}))
DB.sync().then(()=>console.log("changed"))

//Product.bulkCreate(staticProductList)

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