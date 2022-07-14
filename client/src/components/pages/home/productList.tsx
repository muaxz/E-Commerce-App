import React, { MouseEvent, useEffect } from 'react';
import {useMutation} from "@apollo/client"


interface ListItem{
    id:number,
    name:string,
    price:number,
    starPoint:number,
    url:string
}

interface Props{
 list: ListItem[],
 loading: boolean,
 addToCartFunc:(e:MouseEvent,productId:number)=>void
}

export default function ProductList ({list,loading,addToCartFunc}: Props){
    
    
    return(
    
        <div className="flex w-100  p-10 flex-wrap justify-center">
            {
                !loading ? 

                list.map((item,index)=>(
                    <div key={index} className="w-64 mr-10 mb-10 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                        </a>
                        <div className="p-5">
                            <div className="w-full h-44">
                                <img className='rounded w-full object-cover h-44' src={"https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-junior-teixeira-2047905.jpg?alt=media&token=1977916d-a387-46e2-b8c2-c85dfee88d04"}></img>
                            </div>
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.price}$</p>
                            <div onClick={(e)=>addToCartFunc(e,item.id)} className="cursor-pointer inline-flex w-full justify-space-around items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add To Cart
                                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>
                ))

                : "Loading..."
            }
        </div>
    )

}