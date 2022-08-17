import React, { useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCartShopping} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import {incrementListCount,productSlice,decrementListCount} from "../../state/slices/product"
import {useQuery} from "@apollo/client"
import {getCartCount} from "../../GraphQL/Queries"
import {RootState} from "../../state/store"


function NavigationBar(){
  
  const cartCount = useSelector((state: RootState)=>state.product.listCount)
  const dispatch = useDispatch()
  const {data,loading,error} = useQuery(getCartCount,{variables:{userId:localStorage.getItem("sessionId")}})

  useEffect(()=>{

    if(data) dispatch(incrementListCount(data.getCartCount.count))

  },[data])

  return (
    <div className='w-full fixed pr-10 pl-10 bg-slate-200 mb-10 h-20 flex items-center justify-center z-40'>
      <div className="w-full  flex justify-between">
        <Link to={"/"}>
           <h1 className='text-2xl'>Navigation Part</h1>
        </Link>
        <Link to={"/cart"}>
            <button className='relative'>
              My Cart
              <FontAwesomeIcon fontSize="20px" className='z-100 pl-2 text-white text-red-400' icon={faCartShopping} />
              <div className='absolute border-solid border-2 border-white bg-red-700 text-white -top-3 -right-2 w-5 h-5 rounded-xl leading-4 text-xs'>{cartCount}</div>
            </button>
        </Link>
      </div>
    </div>   
  )
}


export default NavigationBar;

