import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStar,faCartPlus, faAngleUp, faAngleDown,faAngleRight} from "@fortawesome/free-solid-svg-icons"

export default function HeaderImage (){


    const scrollDown=()=>{
        window.scrollTo({ top:1000, behavior: 'smooth' })
    }

    return(

        <div style={{backgroundImage:"url(/shopping.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} className="w-full h-96  mb-15">
            <div style={{backdropFilter:"blur(5px)"}} className="text-white pt-10 pl-10 h-full">
                <span className='text-5xl border-b-2 pb-2'>Discover products that you are interested in </span>
                <div className="pt-16">
                  <button onClick={scrollDown} className="border-solid border-2 p-5 text-3x hover:bg-red-400">Shop Now <FontAwesomeIcon className="pl-2" icon={faAngleRight}></FontAwesomeIcon></button>
                </div>
            </div>
        </div>

    )

}