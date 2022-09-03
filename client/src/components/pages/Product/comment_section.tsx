import React, { useEffect, useState } from 'react';
import {TextField,Button} from "@mui/material"
import CommentList from "./comment_list"
import {addToList} from "../../../state/slices/comment"
import {useParams} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useMutation} from "@apollo/client"
import {produceComment} from "../../../GraphQL/Mutations"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';




export default function CommentSection(){
    const [selectedStar,setSelectedStar] = useState<number>(-1)
    const dispatch = useDispatch();
    const [createComment,{error,data}] = useMutation(produceComment)
    const params = useParams()
    const [commentMessage,setCommentMessage] = useState<{value:string,error:boolean}>({
        value:"",
        error:false
    })
    const productId: string = params.id !== undefined ? params.id : '';
    //undefined olsa bile bos string olarak tanimliyoruz

    useEffect(()=>{
        if(data)
        dispatch(addToList(data.createComment))
    },[data])

    const submitComment = ()=>{
        
       if(!commentMessage.value.length){
          setCommentMessage(prev=>({...prev,error:true}))
          return;
       }

       createComment({
            variables:{
                productId:parseInt(productId),
                message:commentMessage.value,
                star:selectedStar,
            }
        })       
    }

    return(
        <div className='pt-20 '>
            <div className="max-w-7xl m-auto" >
                <div className="flex">
                   <div className="mr-5 border-solid border-2 border-white rounded-full w-16 h-16">
                      <img className="rounded-full object-cover" src="/user.jpg" alt="" />
                   </div>
                   <div className="relative">
                     <TextField error={commentMessage.error} helperText={commentMessage.error ? "You need to write something !" : ""} value={commentMessage.value} onChange={(e)=>setCommentMessage(prev=>({...prev,value:e.target.value}))} multiline className="w-96" label={"Write a review..."} rows={4} variant="outlined"></TextField>
                     <div className="absolute right-0 -bottom-12 z-50">
                        <Button  onClick={submitComment} variant="outlined" style={{textTransform:"capitalize"}} >share</Button>
                     </div>
                     <div className="w-64 absolute">
                        {[0,0,0,0,0].map((item,index)=>(
                                <FontAwesomeIcon cursor={"pointer"} onClick={()=>setSelectedStar(index+1)} color={index < selectedStar ? "#e76f51" : "lightgrey"} icon={faStar}></FontAwesomeIcon>
                        ))}
                     </div>
                   </div>
                </div>
                <div className="pt-20">
                    <CommentList></CommentList>
                </div>
            </div>
        </div>
    )

}