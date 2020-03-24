import React from 'react';
import CSS from './index.module.scss'

export default class goTop extends React.Component{
    constructor(props){
        super(props)
        this.state={
            boole:false
        }
    }

    ShowHidden(){
        let Activeboole = false
        window.addEventListener('scroll',()=>{
            if(document.documentElement.scrollTop>340){
                Activeboole = true;
            }else{
                Activeboole = false;
            }
            this.setState({boole:Activeboole});
        });
    }

    componentDidMount(){
        this.ShowHidden()
    }

    goTop = ()=>{
        let scrollToptimer = setInterval(function () {
            var top = document.body.scrollTop || document.documentElement.scrollTop;
            var speed = top / 4;
            if (document.body.scrollTop!=0) {
                document.body.scrollTop -= speed;
            }else {
                document.documentElement.scrollTop -= speed;
            }
            if (top == 0) {
                clearInterval(scrollToptimer);
            }
        }, 10); 
    }

    componentWillUnmount(){
         this.setState=(state,callback)=>{
            return;
        }
    }
    
    render(){
        return this.state.boole&&<div className={CSS.goTop} onClick={this.goTop.bind(this)}></div>
    }
}