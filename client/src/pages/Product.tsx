import React, { useState } from 'react';
import {useDispatch,useSelector} from "react-redux"
import {useQuery,useMutation} from "@apollo/client"
import {} from "../GraphQL/Queries"
import {addProductToCart} from "../GraphQL/Mutations"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar ,faAngleDown, faCartPlus} from '@fortawesome/free-solid-svg-icons';


export default function Product(){
    const [isDetailOpen,setIsDetailOpen] = useState(false)
    const [addToCart,{error,data}] = useMutation(addProductToCart)


    var productDetail = "Model Number: M232-Orange;Item Shape:Round;Band Material:Leather;Band Colour:Orange;Band Material:Leather;Dial Colour:Blue"
    var splittedDetail = productDetail.split(";")
    

    const addToCartHandler=async ()=>{
        /*
        await addToCart({
            variables:{
                userId:localStorage.getItem("sessionId"),
                productId:
            }
        })
        */



    }
    return(
        <div className='pt-40'>
            <div className='w-full max-w-7xl shadow-2xl m-auto p-9'>
                <div className="flex ">
                    <div className="w-80 h-96 bg-yellow-400 text-center">
                        <img className="w-full object-cover h-full" src="https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-jatin-anand-125779.jpg?alt=media&token=248bf171-a7de-4a97-90f0-bd2e92afdbce"></img>
                        <div onClick={()=>setIsDetailOpen(!isDetailOpen)} className="cursor-pointer hover:bg-red-700 hover:text-white  mt-1">
                            <span className="pr-2" >Product Detail</span>
                            <FontAwesomeIcon className="pt-2" icon={faAngleDown}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="pl-64 w-full">
                        <h2 className="text-3xl font-bold mb-2">Watch</h2>
                        <div>
                            {[0,0,0,0,0].map((item,index)=>(
                                <FontAwesomeIcon color={'#e76f51'} icon={faStar}></FontAwesomeIcon>
                            ))}
                        </div>
                        <p className="semibold">430$</p>
                        <div  className="mt-10 cursor-pointer inline-flex w-full justify-space-around items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Add To Cart
                          <FontAwesomeIcon className="ml-2" icon={faCartPlus}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
                <div className={`pt-20 duration-200 ${isDetailOpen ? "h-128" : "h-0"} ${isDetailOpen ? "overflow-visible": "overflow-hidden"}`}>
                    {splittedDetail.map((item)=>(
                        <div className="pb-10">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )

}