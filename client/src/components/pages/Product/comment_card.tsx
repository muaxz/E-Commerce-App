import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {calculatedate} from "../../../UtilFunctions"
import React from 'react';

interface Props{
message:string,
starPoint:number,
time:string
}

export default function CommentCard (props:Props){

    return(
        <div style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",backgroundColor:"#eef0f2"}} className="w-640 mb-10 relative max-w-2xl rounded-md">
            <div className="absolute rounded-full w-16 h-16 -left-20  border-2 border-solid border-grey ">
                <img className="rounded-full" src="/user.jpg" alt="" />
            </div>
            <div className="h-36">
                <div className='text-slate-600 p-2 flex justify-between'>
                    <div>
                        {[0,0,0,0,0].map((item,index)=>(
                                <FontAwesomeIcon  color={index < props.starPoint ? "#e76f51" : "lightgrey"} icon={faStar}></FontAwesomeIcon>
                        ))}
                    </div>
                    <p>
                       {calculatedate(props.time)?.time + " " + calculatedate(props.time)?.express+" ago"}
                    </p>
                </div>
                <div className="p-5">
                     {props.message}
                </div>
            </div>
        </div>

    )

}