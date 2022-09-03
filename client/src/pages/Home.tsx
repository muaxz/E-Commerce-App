import React, { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import Slick from "../components/pages/home/Slick"
import {loadProducts} from "../GraphQL/Queries"
import {useQuery,useMutation} from "@apollo/client"
import ProductList from "../components/shared/productList";
import {addProductToCart} from "../GraphQL/Mutations"
import {useDispatch,useSelector} from "react-redux"
import {handleActiveness} from "../state/slices/windowActive"
import product, {incrementListCount, populateList} from "../state/slices/product"
import { RootState } from '../state/store';
import HeaderImage from '../components/pages/home/headerImage';
import {useSearchParams} from "react-router-dom"


function Home(){

   const products = useSelector((state:RootState)=>state.product.list)
   const dispatch = useDispatch();
   const currentProductsCount = useRef<number>(0)
   const allowPaignation = useRef(true)
   const [paignationLoading,setPaignationLoading] = useState(false);
   const isPaignation = useRef(false)
   const [searchParams,setSearchParams] = useSearchParams()
   var categoryParam = searchParams.get("category")
   var paramValue = categoryParam == null ? "90" : categoryParam
   const {error,loading,data,refetch} = useQuery(loadProducts,{variables:{categoryId:parseInt(paramValue),offset:0}})  

   useEffect(()=>{   
      
      if(data){
   
         dispatch(populateList({list:data.getAllProducts,isPaignation:isPaignation.current}))
         currentProductsCount.current = (products.length+data.getAllProducts.length)
      }

   },[data])
 
   useEffect(()=>{

        if(data){

            window.addEventListener("scroll",()=>{
               
               if((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight && allowPaignation.current){
                  setPaignationLoading(true)
                  setTimeout(() => {
                     refetch({categoryId:90,offset:currentProductsCount.current})
                     setPaignationLoading(false)
                     isPaignation.current = true;
                  },1000);
                  allowPaignation.current = false
               }
           })
        }
   
        return window.removeEventListener("scroll",()=>console.log("removed"));

   },[data])
   
   useEffect(()=>{

      if(paramValue !== "90"){
         refetch({categoryId:parseInt(paramValue),offset:0})
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
        {paignationLoading ? 
         <div role="status" className="pb-20 flex justify-center pt-0 relative bottom-10">
            <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
               <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
         </div> : ""
       }
      </div>
   )
}


export default Home;