import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCartPlus} from "@fortawesome/free-solid-svg-icons"

interface Props{
    ProductName : string,
    ProductPrice : number | string,
    ProductImage : string,
}

function SlickCard(props : Props){
    return (
        <div className='p-5 rounded-xl cursor-pointer relative'>
            <img className='rounded-xl' src={props.ProductImage}></img>
            <div className='.absolute bottom-20 left-10 z-100 absolute text-white'>{props.ProductName}</div>
            <div className='.absolute bottom-10 left-10 z-100 absolute text-white'>{props.ProductPrice}$</div>
            <FontAwesomeIcon fontSize="20px" className='.absolute top-10 right-10 z-100 absolute text-white' icon={faCartPlus} />
        </div>
    )
}


export default SlickCard;