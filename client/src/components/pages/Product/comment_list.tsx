import React from 'react';
import CommentCard from './comment_card';
export default function CommentList (){

    return(

        <div className="pl-20">
            <div>
                {[0,0,0,0].map(()=>(
                    <CommentCard></CommentCard>
                ))}
            </div>
        </div>

    )

}