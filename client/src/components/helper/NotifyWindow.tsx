import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faClose} from "@fortawesome/free-solid-svg-icons"
import {useDispatch} from "react-redux"
import {handleActiveness} from "../../state/slices/windowActive"

interface Props{
    children:string,
    actionType:string,
    isActive:boolean
}

export default function NotifyWindow(props:Props){
    const dispatch = useDispatch()
    return(
        <div>
            <div className={`fixed w-full h-full ${props.isActive ? "block" : "hidden"} bg-slate-800 bg-opacity-90 z-30 left-0 top-0`}></div>
            <div className={`border-2 border-solid  max-w-lg w-full duration-500 bg-green-400 h-64 fixed left-2/4 ${props.isActive ? "top-2/4" : "top-1/4"}  -translate-y-1/4 -translate-x-2/4 ${props.isActive ? "opacity-100" : "opacity-0"} ${props.isActive ? "z-40" : "z-0"} flex items-center`}>
                <div onClick={()=>dispatch(handleActiveness())} className='absolute top-2 right-4 cursor-pointer'>
                    <FontAwesomeIcon icon={faClose}/>
                </div>
                <div className='text-center w-full text-white text-xl'>
                    {props.children}
                </div>
            </div>  
        </div>
    )

}