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
import HeaderImage from '../components/pages/home/headerImage';
import {useSearchParams} from "react-router-dom"


function Home(){

  
   const products = useSelector((state:RootState)=>state.product.list)
   const dispatch = useDispatch();
   const [searchParams,setSearchParams] = useSearchParams()
   var categoryParam = searchParams.get("category")
   var paramValue = categoryParam == null ? "90" : categoryParam
   const {error,loading,data,refetch} = useQuery(loadProducts,{variables:{categoryId:parseInt(paramValue)}})  

   useEffect(()=>{

      if(data){
         console.log(data)
         dispatch(populateList(data.getAllProducts))
      }

   },[data])

   useEffect(()=>{
      if(paramValue !== "90"){
         refetch({categoryId:parseInt(paramValue)})
      }
   
   },[categoryParam])

   return (
      <div className='pt-20'>
        {
            categoryParam == null && 
            (<React.Fragment>
               <HeaderImage></HeaderImage>
               <Slick></Slick>
            </React.Fragment>)
        }
        <ProductList buttonAction="Add To Cart" list={products} loading={loading}/>
      </div>
   )
}


export default Home;