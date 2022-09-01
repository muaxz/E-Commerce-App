import React from 'react';
import ProductCard from "./productCard"



interface ListItem{
id:number,
name:string,
price:number,
starPoint:number,
url:string,
userProduct?:{quantity:number}
}

interface Props{
 list: ListItem[],
 loading: boolean,
 buttonAction:string
}

export default function ProductList(props:Props){
   
    return(
        <div  className="flex w-full p-10 flex-wrap  max-w-7xl m-auto">
          {!props.loading && props.list.map((item,index)=>
          (<ProductCard
            product={{id:item.id,name:item.name,price:item.price,starPoint:item.starPoint,url:item.url,quantity:item.userProduct == undefined ? 0 : item.userProduct.quantity}}
            actionButton={props.buttonAction}
            index={index}
          ></ProductCard>))}
        </div>
    )

}