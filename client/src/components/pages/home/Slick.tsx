import React,{useRef} from 'react';
import Slider from "react-slick"
import SlickCard from "./SlickCard"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Slick(){

    const cardContents = useRef<Array<{image:string,name:string,price:number}>>([{image:"/bubble.png",name:"Laptop",price:750},{image:"/bubble.png",name:"Mouse",price:30},{image:"/bubble.png",name:"Keybord",price:70},{image:"/bubble.png",name:"Monitor",price:120}])
    const settings : any = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2
    };

    return (
        <div className='w-1/2 bg-blue-200 m-auto text-center p-10 '>
          <h2 className='text-xl p-5'> Popular Products</h2>
          <Slider {...settings}>
            {
                cardContents.current.map((item,index)=>(<SlickCard  key={index} ProductName={item.name} ProductPrice={item.price} ProductImage={item.image}/>))
            }
          </Slider>
        </div>
      );
}


export default Slick;