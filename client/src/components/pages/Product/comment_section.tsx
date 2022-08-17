import React from 'react';
import {TextField,Button} from "@mui/material"
import CommentList from "./comment_list"

interface Props{
  loading:boolean
}

export default function CommentSection(props:Props){

    return(

        <div className='pt-20 '>
            <div className="max-w-7xl m-auto" >
                <div className="flex">
                   <div className="mr-5 border-solid border-2 border-white rounded-full w-16 h-16">
                      <img className="rounded-full object-cover" src="/bubble.png" alt="" />
                   </div>
                   <div className="relative">
                     <TextField multiline className="w-96" label={"Write a review..."} rows={4} variant="outlined"></TextField>
                     <div className="absolute right-0 -bottom-12 z-50">
                        <Button variant="outlined" style={{textTransform:"capitalize"}} >share</Button>
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