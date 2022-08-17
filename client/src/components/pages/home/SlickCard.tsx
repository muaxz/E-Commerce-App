import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCartPlus} from "@fortawesome/free-solid-svg-icons"
import {useDispatch,useSelector} from "react-redux"
import {handleActiveness} from "../../../state/slices/windowActive"
import {useMutation} from "@apollo/client"
import {addProductToCart} from "../../../GraphQL/Mutations"

interface Props{
    ProductName : string,
    ProductPrice : number | string,
    ProductImage : string,
    ProductId?: number
}

function SlickCard(props : Props){

    const [addToCart,{error,data}] = useMutation(addProductToCart)
    const reduxState = useSelector((state : {counter:number})=>state.counter)
    const dispatch = useDispatch();

    const submitCart = async ()=>{
    
       const userId = localStorage.getItem("sessionId")
       
       await addToCart({
            variables:{
                userId,
                productId:props.ProductId
            }
        })
        
    }

    return (
        <div className='rounded-md mr-5 rounded-xl cursor-pointer relative -z-10 h-64'>
            <img className="rounded-md w-full h-full object-cover" src={props.ProductImage}></img>
            <div className='absolute bottom-16 left-5  text-white'>{props.ProductName}</div>
            <div className='absolute bottom-10 left-5  text-white'>{props.ProductPrice}$</div>
            <div  onClick={submitCart} className="absolute left-24 bottom-5 z-10 cursor-pointer inline-flex w-30 justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add To Cart
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </div>
        </div>
    )
}


export default SlickCard;