import React from 'react';
import CSS from './index.module.scss'

export default class Affirm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            boole:false
        }
    }
    
    changGoods = (n)=>{
        this.props.Affirm(n)
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
           return;
       }
    }

    render(){
        return <div className={CSS.AffirmWrap}>
            <div className={CSS.Affirm}>
                <div>确定删除该商品吗？</div>
                <footer>
                    <button onClick={this.changGoods.bind(this,false)}>取消</button> 
                    <button onClick={this.changGoods.bind(this,true)}>确认</button>
                </footer>
            </div>
        </div>
    }
}