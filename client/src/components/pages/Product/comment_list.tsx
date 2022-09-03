import React,{memo} from 'react';
import CommentCard from './comment_card';
import {RootState} from "../../../state/store"
import {useSelector,useDispatch} from "react-redux"



function CommentList(){
    const comments = useSelector((state:RootState)=>state.comment)

    return(
        <div className="pl-20">
            <div>
                {comments.map((item)=>(
                    <CommentCard time={item.createdAt} starPoint={item.star} message={item.message}></CommentCard>
                ))}
            </div>
        </div>
    )

}

export default memo(CommentList)