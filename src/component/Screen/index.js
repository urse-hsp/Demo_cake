import React from 'react';
import CSS from './index.module.scss';

export default class Screen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            screen:[
                {
                    title:"雪域特浓",
                    classify:1
                },
                {
                    title:"雪域口味",
                    classify:2
                },
                {
                    title:"芝士口味",
                    classify:3
                },
                {
                    title:"巧克力味",
                    classify:4
                },
                {
                    title:"慕斯口味",
                    classify:5
                },
                {
                    title:"鲜果口味",
                    classify:6
                },
                {
                    title:"奶油口味",
                    classify:7
                },
                {
                    title:"敲敲惊喜",
                    classify:8
                }
            ],
            actionNum:null
        }
    }
    
    hide = ()=>{
        this.props.changModal(false);
    }

    actionScreen = (index)=>{
        this.setState({actionNum:index});
    }

    indeed = ()=>{
        if(this.state.actionNum!=null){
            this.props.changGoods(this.state.actionNum);
            this.hide()
        };
    }

    render(){
        return <div className={CSS.modal} id='modal' onClick={()=>{this.hide()}}>
            <div className={CSS.content} id="content" onClick={(e)=>{e.stopPropagation()}}>
                <header className={CSS.header}>筛选</header>
                <div>
                    <h3 className={CSS.title}>口味</h3>
                    <ul className={CSS.screenList}>
                        {
                            this.state.screen&&this.state.screen.map((item,index)=>{
                                return <li key={index} 
                                    className={this.state.actionNum==item.classify?CSS.active:''} 
                                    onClick={this.actionScreen.bind(this,item.classify)}>{item.title}
                                </li>
                            })
                        }
                    </ul>
                    <footer className={CSS.footer}>
                        <a onClick={()=>{this.props.reset();this.hide()}}>重置</a>
                        <a onClick={this.indeed}>确定</a>
                    </footer>
                </div>
            </div>
        </div>
    }
}