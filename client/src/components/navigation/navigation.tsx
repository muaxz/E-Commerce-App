import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCartShopping,faXmark} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import {incrementListCount,productSlice,populateList} from "../../state/slices/product"
import {useLazyQuery,useQuery} from "@apollo/client"
import {getCartCount,searchProducts} from "../../GraphQL/Queries"
import {RootState} from "../../state/store"


function NavigationBar(){
  
  const cartCount = useSelector((state: RootState)=>state.product.listCount)
  const dispatch = useDispatch()
  const [searchValue,setSearchValue] = useState<string>("")
  const [categoryList,setCategoryList] = useState([])
  const [refetch,{data:searchData,loading:searchLoading,error:searchError}] = useLazyQuery(searchProducts)
  const {data,loading,error} = useQuery(getCartCount,{variables:{userId:localStorage.getItem("sessionId")}})

  useEffect(()=>{

    if(data) dispatch(incrementListCount(data.getCartCount.count))

  },[data])

  useEffect(()=>{
    if(searchData)
    setCategoryList(searchData.searchProduct)
  },[searchData])

  const searchHandler = (e : React.FormEvent<HTMLInputElement>)=>{
     setSearchValue(e.currentTarget.value)
     if(e.currentTarget.value === ""){
        setCategoryList([])
     }
  }

  const linkAction = ()=>{
    dispatch(populateList([]))
    setSearchValue("")
  }

  const submitSearch=()=>{
    if(searchValue.trim() !== "")
    refetch({variables:{searchValue:searchValue}})
  }

  return (
    <div className='w-full fixed pr-10 pl-10 bg-slate-50 mb-10 h-20 flex items-center justify-center z-40 border-b-2 border-slate'>
      <div className="w-full flex justify-between relative ">
        <Link to={"/"}>
           <h1 className='text-2xl'>E-Commerce</h1>
        </Link>
        <div className="w-64 h-10">
          <input onKeyUp={submitSearch} value={searchValue} onChange={searchHandler} placeholder="Search Product..." className="pl-2 h-full border-solid border-2 border-slate-200 w-full rounded-lg" type="text" />
        </div>
        <div className={`w-64 h-64 ${searchValue.length  ?  "block" : "hidden"} overflow-auto pr-2 pl-2 bg-slate-200 rounded absolute top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
            <div onClick={()=>setSearchValue("")} className="text-right p-2 cursor-pointer"><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></div>
            {searchLoading ? <div style={{display:"flex",justifyContent:"center",position:"relative",top:"30px",right:"21px"}}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div> : (
              categoryList.map((item:{name:string,id:number},index:number)=>(
                <Link onClick={linkAction} to={`/?category=${item.id}`}>
                   <div className="hover:bg-red-200 hover:text-white p-2 cursor-pointer rounded" key={index}>{item.name}</div>
                </Link>
              ))
            )}
            {
              !categoryList.length && <div className='pl-5'>There is no such a product...</div>
            }
        </div>
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

