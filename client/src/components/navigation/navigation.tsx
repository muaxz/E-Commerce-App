import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCartShopping} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import {actions} from "../../state/slices/product"
import {RootState} from "../../state/store"


function NavigationBar(){
  
  const productList = useSelector((state: RootState)=>state.product.list)

  return (
    <div className='w-full pr-10 pl-10 bg-red-200 mb-10 h-20 flex items-center justify-center'>
      <div className="w-full  flex justify-between">
        <Link to={"/"}>
           <h1 className='text-2xl'>Navigation Part</h1>
        </Link>
        <Link to={"/cart"}>
            <button className='relative'>
              My Cart
              <FontAwesomeIcon fontSize="20px" className='z-100 pl-2 text-white text-red-400' icon={faCartShopping} />
              <div className='absolute bg-red-700 text-white -top-1 -right-2 w-4 h-4 rounded-xl leading-4 text-xs'>{productList.length}</div>
            </button>
        </Link>
      </div>
    </div>   
  )
}


export default NavigationBar;

