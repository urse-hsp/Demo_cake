import React from 'react';
import CSS from './index.module.scss';
import Swiper from "swiper";
import "swiper/css/swiper.css";

export default class HomeSwiper extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    componentDidMount(){
        new Swiper ('.swiper-container', {
            loop: false, // 循环模式选项
            pagination: {
                el: '.swiper-pagination',
                clickable :true
            },
            autoplay: {
                delay: 30000,
                stopOnLastSlide: false,
                disableOnInteraction: true,//false点击分页器后轮播
            },
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper 
        });
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
           return;
       }
    }
    
    render(){
        return <div className="swiper-container ">
                <div className="swiper-wrapper">
               {
                    this.props.homeData&&this.props.homeData.map((item,index)=>{
                        return <div key={index} className="swiper-slide">
                            <img src={item.goodsImg} className={CSS.goodsImg} alt=''/>
                        </div>
                    })
                }
            </div>
        <div className="swiper-pagination"></div>
    </div>
    }
}