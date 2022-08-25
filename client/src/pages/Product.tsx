import React, { useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {useNavigate,useParams} from "react-router-dom"
import {useQuery,useMutation} from "@apollo/client"
import {getSingleProduct} from "../GraphQL/Queries"
import {addProductToCart} from "../GraphQL/Mutations"
import {RootState} from "../state/store"
import {addToList,populateList} from "../state/slices/comment"
import CommentSection from "../components/pages/Product/comment_section"
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar ,faAngleDown, faCartPlus,faAngleUp} from '@fortawesome/free-solid-svg-icons';


export default function Product(){
    const [isDetailOpen,setIsDetailOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    //const [addToCart,{error,data}] = useMutation(addProductToCart)
    const {id} = useParams()
    const paramId: string = id !== undefined ? id : '';
    const {error,loading,data }  = useQuery(getSingleProduct,{variables:{productId:parseInt(paramId)}})

    var productDetail = "Model Number: M232-Orange;Item Shape:Round;Band Material:Leather;Band Colour:Orange;Band Material:Leather;Dial Colour:Blue"
    var splittedDetail = productDetail.split(";")

    useEffect(()=>{

        if(data){
            dispatch(populateList(data.getProduct.Comments))
        }

    },[data])
    
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
        <>
        {loading ? "loading" : ( <div className='pt-40 pb-20 rounded-mb'>
            <div className='w-full max-w-7xl shadow-2xl m-auto rounded-xl'>
                <div className="flex ">
                    <div className="w-100 h-96 bg-yellow-400 text-center rounded-2xl">
                        <img className="w-full object-cover h-full rounded-tl-2xl" src={data.getProduct.url}></img>
                        <div onClick={()=>setIsDetailOpen(!isDetailOpen)} className="cursor-pointer mt-1">
                            <span className="pr-2 text-white" >Product Detail</span>
                            <FontAwesomeIcon className={`pt-2 relative text-white ${isDetailOpen ? "rotate-180 top-2" : "rotate-0"}`} icon={faAngleDown}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="pl-64 w-full pr-9">
                        <h2 className="text-3xl font-bold mb-2">{data.getProduct.name}</h2>
                        <div>
                            {[0,0,0,0,0].map((item,index)=>(
                                <FontAwesomeIcon color={index+1 <= data.getProduct.starPoint ? '#e76f51' : "white"} icon={faStar}></FontAwesomeIcon>
                            ))}
                        </div>
                        <p className="semibold">430$</p>
                        <div className="mt-10 cursor-pointer w-36 text-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Add To Cart
                          <FontAwesomeIcon className="ml-2" icon={faCartPlus}></FontAwesomeIcon>
                        </div>
                        <div  className="mt-10 cursor-pointer text-center w-36 justify-space-around items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                           Buy Now
                          <FontAwesomeIcon className="ml-2" icon={faCartPlus}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
                <div className={`pt-10 pl-9 text-white rounded-bl-xl rounded-br-xl duration-200 bg-red-400 ${isDetailOpen ? "h-96 min-h-full" : "h-0"} ${isDetailOpen ? "overflow-visible": "overflow-hidden"}`}>
                    <div className="pt-10">
                        {splittedDetail.map((item)=>(
                            <div className="pb-10">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>         
            </div>
            <CommentSection></CommentSection>
          </div>)}
        </>
    )

}