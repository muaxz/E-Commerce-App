import React, { useEffect } from 'react';
import NavBar from "../components/navigation/navigation"
import {useMutation} from "@apollo/client"
import {createUser} from "../GraphQL/Mutations"
import {useSelector,useDispatch} from "react-redux"
import NotifyWindow from "../components/helper/NotifyWindow"
import {RootState} from "../state/store"
import ScrollUpButton from "../components/helper/scrollUpButton"
 
interface props{
  children?:JSX.Element
}

const Layout : React.FC<props> = function(props){

    const [createNewUser, {error,data}] = useMutation(createUser)  
    const isActive = useSelector((state:RootState)=>state.windowActive)
   
    
    useEffect(()=>{
      const sessionId = localStorage.getItem("sessionId")
      console.log(sessionId)
      if(true){
        createNewUser({
          variables:{
             userId:sessionId ?? "",
          }
        })
      }

    },[])

    useEffect(()=>{
      

      if(data){

        if(data.createNewUser.userId != ""){
          localStorage.setItem("sessionId",data.createNewUser.userId)
        }

      }

      if(error){
        console.log(error)
      }

    },[data,error])

    return (
        <>
          <NavBar></NavBar>
          <NotifyWindow isActive={isActive} actionType="confirm">You Successfully added the product to cart</NotifyWindow>
          <ScrollUpButton></ScrollUpButton>
        </>
    )
}

export default Layout;