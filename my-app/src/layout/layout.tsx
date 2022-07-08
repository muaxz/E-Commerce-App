import React from 'react';
import NavBar from "../components/navigation/navigation"
 
interface props{
  children:JSX.Element
}

const Layout : React.FC<props> = function(props){
      
    return (
        <>
          <NavBar></NavBar>
          {props.children}
        </>
    )
}

export default Layout;