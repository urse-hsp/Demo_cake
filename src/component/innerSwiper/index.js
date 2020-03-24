import React from 'react';
import CSS from './index.module.scss';
import Swiper from "swiper";
import "swiper/css/swiper.css";

export default class HomeSwiper extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        new Swiper ('.swiper_one', {
            loop: false, // 循环模式选项
            pagination: {
                el: '.swiper-pagination',
                clickable :true
            },
            autoplay: {
                delay: 100000,
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
        return <div className="swiper-container swiper_one">
            <div className="swiper-wrapper">
                {
                   this.props.innerData&&this.props.innerData.map((item,index)=>{
                        return (<div className="swiper-slide" key={index}>
                            <img src={item.goodsImg} className={CSS.goodsImg}/>
                            <div className={CSS.innerContent}>
                                <p className={CSS.innerTitle}>{item.title}</p>
                                <p className={CSS.subheading}>{item.subheading}</p>
                            </div>
                        </div>)
                    })
                }
            </div>
        <div className="swiper-pagination"></div>
    </div>
    }
}