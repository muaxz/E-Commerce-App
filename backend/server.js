const express = require("express")
const {ApolloServer} = require("apollo-server-express")
const typeDefs = require("./Schema/TypeDefs")
const resolvers = require("./Schema/resolvers")
const staticProductList = require("./products")
const ProductModel = require("./Models/product")
const User = require("./Models/user")
const userProduct = require("./Models/userProduct")
const DB = require("./DataBase/connection")
const app = express()
const Comment = require("./Models/comment")
const CategoryModel = require("./Models/category")
const cors = require("cors")
const path = require("path")
const port = 3001

app.use(cors({origin:"http://localhost:3000"}))
DB.sync().then(()=>{
  /*
  CategoryModel.bulkCreate([
    {id:1,name:"Home"},
    {id:2,name:"Electronic"},
    {id:3,name:"Toys"},
    {id:4,name:"Games"},
    {id:5,name:"Laptops"},
    {id:6,name:"Cleaning"},
    {id:7,name:"Household"},
    {id:8,name:"Sports & Outdoors"},
    {id:9,name:"Health"},
    {id:10,name:"Computer"},
    {id:11,name:"Household"},
  ]).then(()=>{
    ProductModel.bulkCreate([
      {name:'Monitor',price:'100',starPoint:'4',url:'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-format-1029757.jpg?alt=media&token=5acc5dfb-42d1-4969-841f-10072487c75e',categoryId:2},
      {name:'Keyboard',price:'75',starPoint:'3',url:'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-cottonbro-7578805.jpg?alt=media&token=49c1418e-d7aa-4c3d-b5fc-94ec58f5c8f8',categoryId:2},
      {name:'Camera',price:'75', starPoint:'5',url: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-pixabay-51383.jpg?alt=media&token=5531def9-7371-4df4-bbd5-5e29d3821341', categoryId:2},
      {name:'Cell Phone', price:'75', starPoint:'5', url:'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-gantas-vai%C4%8Diul%C4%97nas-3999536.jpg?alt=media&token=832dd88e-efaf-4847-ab28-f857fb365f9b', categoryId:2},
      {name:'Robot Vacuum', price:'75', starPoint:'2',url: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-cottonbro-4112723.jpg?alt=media&token=9c476d14-6b49-4c79-8afa-385df1e701bb', categoryId:11},
      {name:'Watch', price:'75', starPoint:'5',url: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-jatin-anand-125779.jpg?alt=media&token=248bf171-a7de-4a97-90f0-bd2e92afdbce',categoryId:2},
      {name:'Hand Vaccum', price:'75', starPoint:'5', url:'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-cottonbro-4107278.jpg?alt=media&token=4906c6ed-5595-4240-b3bb-da3024b12ec8', categoryId:6},
      {name:'Gaming Chair', price:'220', starPoint:'5',url: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-alena-darmel-7862491.jpg?alt=media&token=a434958b-9e84-45f9-b7af-3637461153de', categoryId:4},
      {name:'Head Set',price: '120', starPoint:'5',url: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-kindel-media-7054716.jpg?alt=media&token=d96b324d-1cda-4c4b-a1c8-642aa6ac7f6f', categoryId:4},
      {name:'Mouse', price:'45', starPoint:'2', url:'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SY450_.jpg',categoryId:4},
      {name:'Home Office Chair', price:'85', starPoint:'4', url:'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-lisa-fotios-1957478.jpg?alt=media&token=3c390287-e47b-42f6-9857-0840780aac03',categoryId:1},
      {name:'Compact Dining Table', price:'125', starPoint:'3', url:'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-photomix-company-932095.jpg?alt=media&token=0a5379df-f41d-4a58-9fb5-c44d6a2930ad', categoryId:1},
      {name:'Mini Fridge', price:'65',starPoint: '5', url:'https://m.media-amazon.com/images/I/615enhJ7bnL._AC_SX679_.jpg', categoryId:1},
      {name:'Toy Car', price:'23', starPoint:'3',url: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-hosein-ashrafosadat-243206.jpg?alt=media&token=fd7a1da0-d4c4-400a-ac10-b2243830e5f4', categoryId:3},
      {name:'Mountain Bike', price:'750', starPoint:'5',url: 'https://m.media-amazon.com/images/I/71tdAQayFFS._AC_UY218_.jpg', categoryId:8},
      {name:'Sunglasses', price:'30', starPoint:'5',url: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-nitin-dhumal-249210.jpg?alt=media&token=3b40b853-591d-4740-803e-f3d7535a71ad', categoryId:8},
      {name:'Nike Cap', price:'25', starPoint:'5',url: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-aman-jakhar-1124465.jpg?alt=media&token=b969d5e2-7c7d-44c5-b646-edfb3ddfd174', categoryId:8},
      {name:'Desk Lamp', price:'15', starPoint:'5', url:'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-eneida-nieves-1112598.jpg?alt=media&token=95f561ac-c867-45d8-9649-5d51b1ff9809', categoryId:11},
      {name:'Winter Boot', price:'100', starPoint:'5', url:'https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-lilartsy-1159670.jpg?alt=media&token=a1262dcf-e114-4562-9594-92d5cccba481', categoryId:8},
     ])
  })
  */

})


//Product.bulkCreate(staticProductList)

//var defaultCategories = [{name:"computer"},{name:"health"},{name:"household"},{name:"electronic"},{name:"game"},{name:"laptop"},{name:"toy"},{name:"sport"},{name:"Pet Supply"}]

//Category.bulkCreate(defaultCategories).then(()=>console.log("inserted"))

async function startApolloServer(){

  const apolloServer =  new ApolloServer({typeDefs,resolvers,csrfPrevention:true,context:({req,res})=>{return{req:req,res}}})

  await apolloServer.start()

  apolloServer.applyMiddleware({app,path:"/graphql"})
}

startApolloServer()


app.use(express.static("public"))

app.get("*",(req,res,next)=>{
  res.sendFile(path.resolve(__dirname,"../public","index.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})