import React,{useEffect,useRef, useState} from 'react';
import axios from "axios"
import {useSelector,useDispatch} from "react-redux"
import {populateList} from "../state/slices/product"
import {useMutation, useQuery} from "@apollo/client"
import {getUserProducts} from "../GraphQL/Queries"
import ProductList from "../components/shared/productList";
import { RootState } from '../state/store';


function DisplayCart(){

    const preventDouble = useRef(true)
    const dispatch = useDispatch()
    const {data,error,loading} = useQuery(getUserProducts,{variables:{userId:localStorage.getItem("sessionId")}})
    const products = useSelector((state:RootState)=>state.product.list)
    const [currentCount,setCurrentCount] = useState<number>(0)
    const [loading2,setLoading2] = useState<boolean>(true)

    useEffect(()=>{
        
        if(data){
           
            dispatch(populateList(data.getUserProducts.Products))
            setLoading2(false)
        }

    },[data])


    useEffect(()=>{

        const productCount = products.reduce((previousValue,currentValue)=>{
            return previousValue+currentValue.price
        },0)
        
        setCurrentCount(productCount)

    },[products])

    return (
        <div className='pt-40'>
          <div className="text-xl pl-44">
            Total Amount ({currentCount}$) ({products.length})
          </div>
          <ProductList buttonAction="Delete" list={products} loading={loading2}></ProductList>
        </div>
    )

}



export default DisplayCart;