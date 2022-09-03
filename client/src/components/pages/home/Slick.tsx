import React,{useRef} from 'react';
import Slider from "react-slick"
import SlickCard from "./SlickCard"
import ProductCard from "../../shared/productCard";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Slick(){

    const cardContents = useRef<Array<{image:string,name:string,price:number,detail:string,id:number}>>([{id:35,image:"https://m.media-amazon.com/images/I/71tdAQayFFS._AC_UY218_.jpg",name:"Mountain Bike",price:750,detail:"29-Inch with Lock-Out suspension"},{id:36,image:"https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-nitin-dhumal-249210.jpg?alt=media&token=3b40b853-591d-4740-803e-f3d7535a71ad",name:"Sunglasses",price:30,detail:"Polarized Sunglasses for Men and Woman"},{id:37,image:"https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-aman-jakhar-1124465.jpg?alt=media&token=b969d5e2-7c7d-44c5-b646-edfb3ddfd174",name:"Nike Cap",price:25,detail:"H24 Nike Cap for Men and Women"},{id:38,image:"https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-eneida-nieves-1112598.jpg?alt=media&token=95f561ac-c867-45d8-9649-5d51b1ff9809",name:"Desk Lamp",price:15,detail:"Led Desk Lamp Flexible with 10 brightness levels"},{id:39,image:"https://firebasestorage.googleapis.com/v0/b/e-commerce-6b4a0.appspot.com/o/pexels-lilartsy-1159670.jpg?alt=media&token=a1262dcf-e114-4562-9594-92d5cccba481",name:"Winter Boot",price:100,detail:"Winter boot for men and women"}])
    const settings : any = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll:1,
    };

    return (
        <div className='w-3/4 m-auto mb-20 p-10 rounded'>
          <h2 className='text-xl p-5 text-center'> <span className="text-slate-50 rounded-md text-black">Trend Products</span></h2>
          <Slider {...settings}>
            {
                cardContents.current.map((item,index)=>(<ProductCard  index={index} actionButton={"Add To Cart"} product={{starPoint:5,price:item.price,name:item.name,url:item.image,id:item.id,detail:item.detail}}/>))
            }
          </Slider>
        </div>
      );
}


export default Slick;