import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleUp} from "@fortawesome/free-solid-svg-icons"

export default function ScrollTopButton(){
    const [appear,setAppear] = useState(false)
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
           
             if(window.scrollY > 1000){
                setAppear(true)
             }else{
                setAppear(false)
             }
        })

    },[])

    const scrollTop=()=>{
        window.scrollTo({ top:0, behavior: 'smooth' })
    }

    return(
        <div onClick={scrollTop} className={`w-8 h-8 p-5 cursor-pointer flex justify-center items-center bg-red-400 fixed bottom-10 right-10 z-45 rounded ${appear ? "opacity-100" : "opacity-0"}`}>
            <FontAwesomeIcon size="2x" color="white" icon={faAngleUp}></FontAwesomeIcon>
        </div>
    )

}