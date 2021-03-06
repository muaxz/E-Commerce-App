import {gql} from "@apollo/client"

export const createUser = gql`
    mutation CreateUser($userId:String!){
        createNewUser(userId:$userId){
            state
            userId       
        }
    }
`

export const addProductToCart = gql`
    mutation AddToCart($userId:String! $productId:Int!){
        addToCart(userId:$userId productId:$productId){
            state
            userId
        }
    }
`

export const deleteProductFromCart = gql`
    mutation DeleteFromCart($userId:String! $productId:Int!){
        deleteFromCart(userId:$userId productId:$productId){
            state
            userId
        }
    }
`