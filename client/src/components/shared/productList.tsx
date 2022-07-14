import React from 'react';
import ProductCard from "./productCard"



interface ListItem{
id:number,
name:string,
price:number,
starPoint:number,
url:string
}

interface Props{
 list: ListItem[],
 loading: boolean,
 buttonAction:string
}

export default function ProductList(props:Props){

    return(
        <div  className="flex w-100  p-10 flex-wrap justify-center">
          {props.list.map((item,index)=>
          (<ProductCard
            product={{id:item.id,name:item.name,price:item.price,starPoint:item.starPoint,url:item.url}}
            actionButton={props.buttonAction}
            index={index}
          ></ProductCard>))}
        </div>
    )

}