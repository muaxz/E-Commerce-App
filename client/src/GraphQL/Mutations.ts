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

export const produceComment = gql`
    mutation CreateComment($message:String! $productId:Int! $star:Int!){
        createComment(message:$message productId:$productId star:$star){
            id
            message
            star
            createdAt
        }
    }
`

export const quantityChange = gql`
    mutation ChangeQuantity($userId:String! $quantity:Int! $productId:Int!){
        changeQuantity(userId:$userId productId:$productId quantity:$quantity){
            state
        }
    }
`