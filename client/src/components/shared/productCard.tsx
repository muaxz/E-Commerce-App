import React, { MouseEvent, useEffect } from 'react';
import {useMutation} from "@apollo/client"
import {useDispatch,useSelector} from "react-redux"
import {handleActiveness} from "../../state/slices/windowActive"
import {incrementListCount,decrementListCount,deleteFromList} from "../../state/slices/product"
import {addProductToCart,deleteProductFromCart} from "../../GraphQL/Mutations"

interface productFields{
    id:number,
    name:string,
    price:number,
    starPoint:number,
    url:string
}

interface Props{
    actionButton:string,
    product:productFields,
    index:number
}


export default function ProductCard(props:Props){
    const dispatch = useDispatch();
    const [addToCart,{error:addError,data:addtData}] = useMutation(addProductToCart)
    const [deleteFromCart,{error:deleteError,data:deleteData}] = useMutation(deleteProductFromCart)

    const submitToCart = async ()=>{

        if(props.actionButton === "Delete"){

               deleteFromCart({
                    variables:{
                        userId:localStorage.getItem("sessionId"),
                        productId:props.product.id
                    }
                 })

            dispatch(decrementListCount())
            dispatch(deleteFromList(props.index))
            return
        }

        await addToCart({
            variables:{
                userId:localStorage.getItem("sessionId"),
                productId:props.product.id
            }
        })

        dispatch(handleActiveness())
        dispatch(incrementListCount(1))
    }
  
    return(
    
        <div className="flex w-100  p-10 flex-wrap justify-center">
                    <div className="w-64 mr-10 mb-10 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                        </a>
                        <div className="p-5">
                            <div className="w-full h-44">
                                <img className='rounded w-full object-cover h-44' src={"https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-junior-teixeira-2047905.jpg?alt=media&token=1977916d-a387-46e2-b8c2-c85dfee88d04"}></img>
                            </div>
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.product.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.product.price}$</p>
                            <div onClick={submitToCart} className="cursor-pointer inline-flex w-full justify-space-around items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {props.actionButton}
                                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>
        </div>
    )

}