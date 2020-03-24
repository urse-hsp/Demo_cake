import React from 'react';
import CSS from './index.module.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Screen from '../../component/Screen';
import GoTop from '../../component/goTop';

class Classify extends React.Component{
    constructor(props){
        super(props);
        this.state={
            classifyData:[],
            classifyNum:0,
            transfer:[],
            synthesize:[],
            volume:[],
            limit:[],
            modal:false
        }
    }
    componentDidMount(){
        axios({
            method:'get',
            url:"../data/cake.json"
        }).then(res=>{
            res.data.data.goodsList.map((item)=>{
                if(parseInt(item.ID)%2===0){
                    this.state.volume.push(item)
                }else if(parseInt(item.ID)%1===0){
                    this.state.limit.push(item)
                }
                return null
            })
            this.setState({
                classifyData:res.data.data.goodsList,
                transfer:res.data.data.goodsList,
                synthesize:res.data.data.goodsList,
                volume:this.state.volume,
                limit:this.state.limit
            }); 
        });
    }

    changClassify = (num)=>{
        if(num===0){
            this.setState({transfer:this.state.synthesize,classifyNum:num});
        }else if(num==1){
            this.setState({transfer:this.state.volume,classifyNum:num});
        }else if(num==2){
            this.setState({transfer:this.state.limit,classifyNum:num});
        }    
    }

    changModal = (n)=>{
        this.setState({
            modal:n
        });
    }
    
    changGoods = (num)=>{
        let changData = []
        this.state.classifyData.map((item,index)=>{
            if(item.classify==num){
                changData.push(item);
            }
            return null
        })
        this.setState({transfer:changData,classifyNum:0})
    }

    reset = ()=>{
        this.setState({transfer:this.state.classifyData})
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    
    render(){
        return (<div className={CSS.wrap}>
            <header className={CSS.header}>
                <div className={CSS.location}>上海</div>
                <div className={CSS.classify}>
                    <a className={this.state.classifyNum==0?CSS.action:''} onClick={this.changClassify.bind(this,0)}>综合</a>
                    <a className={this.state.classifyNum==1?CSS.action:''} onClick={this.changClassify.bind(this,1)}>销量</a>
                    <a className={this.state.classifyNum==2?CSS.action:''} onClick={this.changClassify.bind(this,2)}>季节限定</a>
                </div>
                <div className={CSS.screen} onClick={this.changModal.bind(this,true)}>筛选</div>
            </header>
            <div className={CSS.goodsList}>
                {
                    this.state.transfer&&this.state.transfer.map((item,index)=>{
                        return <div className={CSS.goods} key={index}>
                            <Link to={'/goodsDetail/'+item.ID}>
                                <img src={item.goodsImg}/>
                                <div className={CSS.goodsConntent}>
                                    <h2>{item.goodsName}</h2>
                                    <p>{item.recommendreason}</p>
                                    <div>￥{item.goodsprice}</div>
                                </div>
                            </Link>
                        </div>
                    })
                }
            </div>
            <footer className={CSS.footer}>
                <p>没有更多产品咯</p>
            </footer>
            <div style={{'display':this.state.modal==true?'block':'none'}}>
                <Screen changModal={this.changModal.bind(this)} changGoods={this.changGoods} reset={this.reset}/>
            </div>
            <GoTop/>
        </div>)
    }
}
export default Classify;