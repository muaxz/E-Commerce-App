import React, {useEffect,useState} from 'react';
import {useMutation} from "@apollo/client"
import {useDispatch,useSelector} from "react-redux"
import {handleActiveness} from "../../state/slices/windowActive"
import {Link} from "react-router-dom"
import {incrementListCount,decrementListCount,deleteFromList} from "../../state/slices/product"
import {addProductToCart,quantityChange,deleteProductFromCart} from "../../GraphQL/Mutations"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar,faCartPlus, faAngleUp, faAngleDown,faTrash,faSearch} from "@fortawesome/free-solid-svg-icons"


interface productFields{
    id:number,
    name:string,
    price:number,
    starPoint:number,
    url:string,
    quantity?:number,
    detail?:string
}

interface Props{
    actionButton:string,
    product:productFields,
    index:number
}


export default function ProductCard(props:Props){
    const dispatch = useDispatch();
    const quantity = props.product.quantity == undefined ? 0 : props.product.quantity
    const [productQuantity,setProductQuantity] = useState<number>(quantity)
    const [addToCart,{error:addError,data:addtData}] = useMutation(addProductToCart)
    const [changeQuantity,{error:quantityError,data:quantityData}] = useMutation(quantityChange)
    const [deleteFromCart,{error:deleteError,data:deleteData}] = useMutation(deleteProductFromCart)

    const sessionId = localStorage.getItem("sessionId")
    
    var iconStyling = props.actionButton === "Delete" ? "flex bottom-5 right-14 w-8 h-8" : "hidden  w-16 h-16 top-16 right-24  right-24";
    var icondDirectionStyling = props.actionButton === "Delete" ? "flex bottom-5 right-24 w-8 h-8" : "hidden  w-16 h-16  right-24 top-40 right-24";
    useEffect(()=>{

        if(productQuantity !== 0 && props.actionButton === "Delete"){
            console.log("inside")
            changeQuantity({
                variables:{
                    productId:props.product.id,
                    userId:sessionId,
                    quantity:productQuantity
                }
           })

        }

    },[productQuantity])

    const submitToCart = async ()=>{

        if(props.actionButton === "Delete"){

               deleteFromCart({
                    variables:{
                        userId:sessionId,
                        productId:props.product.id
                    }
                 })

            dispatch(decrementListCount())
            dispatch(deleteFromList(props.index))
            return
        }

        await addToCart({
            variables:{
                userId:sessionId,
                productId:props.product.id
            }
        })

        dispatch(handleActiveness())
        dispatch(incrementListCount(1))
    }

    const QuantityHandler=(isAdding : boolean)=>{

       if(productQuantity !== 1 || isAdding){

          setProductQuantity(prev=>prev + (isAdding ? 1 : -1))

       }
    
    }
  
    return(
        <div className="flex w-100  flex-wrap justify-center z-10 relative">
                <div className="w-64 mr-10 mb-10 max-w-sm bg-white rounded-lg border relative border-gray-200 shadow-md ">
                    <div className='group'>
                        <div className={`absolute  duration-200 ${props.actionButton === "Delete" ? "hidden" : "block"} group-hover:opacity-70 w-full h-full z-10 bg-slate-700 opacity-0`}></div>
                        <div onClick={submitToCart} className={`cursor-pointer ${iconStyling} group-hover:flex  rounded absolute  z-20 bg-red-400 flex justify-center items-center`}>
                            {props.actionButton !== "Delete" ? <FontAwesomeIcon size="2x" icon={faCartPlus}></FontAwesomeIcon> : 
                                (<FontAwesomeIcon size={props.actionButton === "Delete" ? "1x" : "2x"} icon={faTrash}></FontAwesomeIcon>)
                            }   
                        </div>
                        <Link to={`/product/${props.product.id}`}>
                            <div className={`cursor-pointer ${icondDirectionStyling} group-hover:flex rounded absolute  z-20 bg-red-400 flex justify-center items-center`}>
                                <FontAwesomeIcon size={props.actionButton === "Delete" ? "1x" : "2x"} icon={faSearch}></FontAwesomeIcon> 
                            </div>
                        </Link>
                    </div>
                    <div className="p-5">
                        <div className="w-full h-44">
                            <img className='rounded w-full object-cover h-44' src={props.product.url}></img>
                        </div>
                        <a href="#">
                            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">{props.product.name}</h5>
                            <p>{props.product.detail}</p>
                        </a>
                        {
                            props.actionButton === "Delete" && 
                            (<div className="absolute mt-10 right-5 top-40 text-center">
                                <div className='cursor-pointer' onClick={()=>QuantityHandler(true)}>
                                   <FontAwesomeIcon  color="#ef476f" className="ml-2 transform relative top-4" size="2x" icon={faAngleUp}></FontAwesomeIcon>
                                </div>
                                <p className='pl-2 text-lg font-medium text-#6c757d'>{productQuantity}</p>
                                <div className="cursor-pointer" onClick={()=>QuantityHandler(false)}>
                                   <FontAwesomeIcon color="#ef476f" className="ml-2 relative bottom-4" size="2x" icon={faAngleDown}></FontAwesomeIcon>
                                </div>
                            </div>)
                        }
                        <div>
                            {[0,0,0,0,0].map((item,index)=>(
                                <FontAwesomeIcon key={index} color={index+1 <= props.product.starPoint ? '#e76f51' : "white"} icon={faStar}></FontAwesomeIcon>
                            ))}
                        </div>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{props.product.price}$</p>
                    </div>
                </div>
            </div>
    )

}