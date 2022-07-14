import React, { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import Slick from "../components/pages/home/Slick"
import {loadProducts} from "../GraphQL/Queries"
import {useQuery,useMutation} from "@apollo/client"
import ProductList from "../components/shared/productList";
import {addProductToCart} from "../GraphQL/Mutations"
import {useDispatch,useSelector} from "react-redux"
import {handleActiveness} from "../state/slices/windowActive"
import {incrementListCount, populateList} from "../state/slices/product"
import { RootState } from '../state/store';


function Home(){
   const {error,loading,data} = useQuery(loadProducts)  
   const products = useSelector((state:RootState)=>state.product.list)
   const dispatch = useDispatch();
   
   useEffect(()=>{

      if(data){
         console.log(data)
         dispatch(populateList(data.getAllProducts))

      }

   },[data])

   return (
      <div className='pt-40'>
        <Slick></Slick>
        <ProductList buttonAction="Add To Cart" list={products} loading={loading}/>
      </div>
   )
}


export default Home;