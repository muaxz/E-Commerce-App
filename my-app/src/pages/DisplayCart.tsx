import React,{useEffect,useRef} from 'react';
import axios from "axios"
import {useSelector,useDispatch} from "react-redux"
import {actions} from "../state/slices/product"


function DisplayCart(){

    const preventDouble = useRef(true)
    const dispatch = useDispatch()

    useEffect(()=>{

        if(preventDouble.current) getCartProducts()
        
        return ()=>{
            preventDouble.current = false
        }

    },[])

    async function getCartProducts(){

        const list = await axios.get('https://jsonplaceholder.typicode.com/todos')
        dispatch(actions.populateList(list.data.splice(0,10)))

    }

    return (
        <div>
            in display cart
        </div>
    )

}



export default DisplayCart;