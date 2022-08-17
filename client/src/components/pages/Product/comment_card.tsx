import React from 'react';

export default function CommentCard (){

    return(

        <div className="w-640 bg-slate-200 mb-10 relative max-w-2xl rounded-md">
            <div className="absolute rounded-full w-16 h-16 -left-20  border-2 border-solid border-grey ">
                <img className="rounded-full" src="/bubble.png" alt="" />
            </div>
            <div className="h-36">
                <div className='text-right text-slate-600 p-2'>
                    4 minutes ago
                </div>
                <div className="p-5">
                     This product is very usefuly for regular usages
                </div>
            </div>
        </div>

    )

}