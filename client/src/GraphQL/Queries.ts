import {gql} from "@apollo/client"


export const loadProducts = gql`
    query GetAllProducts($categoryId:Int!){
        getAllProducts(categoryId:$categoryId){
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
                userProduct{
                    quantity
                }
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

export const getSingleProduct = gql`
    query GetSingleProduct($productId:Int!){
         getProduct(productId:$productId){
            id
            name
            price
            starPoint
            url
            Comments{
                id
                message
                star
            }
         }
    }

`

export const searchProducts = gql`
        query SearchProduct($searchValue:String!){
            searchProduct(searchValue:$searchValue){
                name
                id
            }
        }
`