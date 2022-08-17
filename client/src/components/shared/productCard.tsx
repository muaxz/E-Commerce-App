import React, {useEffect} from 'react';
import {useMutation} from "@apollo/client"
import {useDispatch,useSelector} from "react-redux"
import {handleActiveness} from "../../state/slices/windowActive"
import {Link} from "react-router-dom"
import {incrementListCount,decrementListCount,deleteFromList} from "../../state/slices/product"
import {addProductToCart,deleteProductFromCart} from "../../GraphQL/Mutations"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar,faCartPlus} from "@fortawesome/free-solid-svg-icons"

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
        <div className="flex w-100  flex-wrap justify-center z-10">
                <div className="w-64 mr-10 mb-10 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <Link to={`/product/${props.product.id}`}>
                            <div className="w-full h-44">
                                <img className='rounded w-full object-cover h-44' src={props.product.url}></img>
                            </div>
                        </Link>
                        <a href="#">
                            <Link to={`/product/${props.product.id}`}>
                                <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.product.name}</h5>
                            </Link>
                        </a>
                        <div>
                            {[0,0,0,0,0].map((item,index)=>(
                                <FontAwesomeIcon color={index+1 <= props.product.starPoint ? '#e76f51' : "white"} icon={faStar}></FontAwesomeIcon>
                            ))}
                        </div>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.product.price}$</p>
                        <div onClick={submitToCart} className="cursor-pointer inline-flex w-full justify-space-around items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {props.actionButton}
                            {props.actionButton !== "Delete" && <FontAwesomeIcon style={{marginLeft:"5px"}} icon={faCartPlus}></FontAwesomeIcon>}
    
                        </div>
                    </div>
                </div>
            </div>
    )

}