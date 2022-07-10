import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCartPlus} from "@fortawesome/free-solid-svg-icons"
import {useDispatch,useSelector} from "react-redux"
import {actions} from "../../../state/slices/product"

interface Props{
    ProductName : string,
    ProductPrice : number | string,
    ProductImage : string,
}

function SlickCard(props : Props){
    const reduxState = useSelector((state : {counter:number})=>state.counter)
    const dispatch = useDispatch();

    const addProductToCart=()=>{
        console.log("sa")
    }

    return (
        <div className='mr-5 bg-red-400 rounded-xl cursor-pointer relative'>
            <img className='rounded-xl' src={props.ProductImage}></img>
            <div className='.absolute bottom-16 left-5 z-100 absolute text-white'>{props.ProductName}</div>
            <div className='.absolute bottom-10 left-5 z-100 absolute text-white'>{props.ProductPrice}$</div>
            <button onClick={addProductToCart} className="absolute pl-20 bottom-0  left-0 bg-gray-300 w-full hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <FontAwesomeIcon  fontSize="20px" className='z-100 absolute left-5 text-white text-red-400' icon={faCartPlus} />
                <span>Add to Cart</span>
            </button>
           
        </div>
    )
}


export default SlickCard;