import {gql} from "@apollo/client"


export const loadProducts = gql`
    query {
        getAllProducts{
            id
            name
            price
            starPoint
            url
        }
    }
`

export const getUserProducts = gql`
    query GetUserProducts($userId:String!){
        getUserProducts(userId:$userId){
            Products{
                id
                name
                price
                starPoint
                url
            }
        }
    }
`

export const getCartCount = gql`
    query GetCartCount($userId:String!){
        getCartCount(userId:$userId){
            count
        }
    }
`