import React,{useRef} from 'react';
import Slider from "react-slick"
import SlickCard from "./SlickCard"
import ProductCard from "../../shared/productCard";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Slick(){

    const cardContents = useRef<Array<{image:string,name:string,price:number}>>([{image:"/bubble.png",name:"Laptop",price:750},{image:"/bubble.png",name:"Mouse",price:30},{image:"/bubble.png",name:"Keybord",price:70},{image:"/bubble.png",name:"Monitor",price:120},{image:"/bubble.png",name:"Monitor",price:120},{image:"/bubble.png",name:"Monitor",price:120},{image:"/bubble.png",name:"Monitor",price:120}])
    const settings : any = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll:1,
    
    };

    return (
        <div className='w-3/4 bg-red-400 m-auto mb-20 p-10 rounded'>
          <h2 className='text-xl p-5 text-center'> <span className="text-slate-50 rounded-md">Trend Products Of The Month</span></h2>
          <Slider {...settings}>
            {
                cardContents.current.map((item,index)=>(<ProductCard index={index} actionButton={"Add To Cart"} product={{starPoint:3,price:item.price,name:item.name,url:item.image,id:1}}/>))
            }
          </Slider>
        </div>
      );
}


export default Slick;