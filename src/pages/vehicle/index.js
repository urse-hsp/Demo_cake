import React from 'react';
import CSS from './index.module.scss';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {addGoods,changNum,AFfirm,Calculate,CheckAll,update} from '../../action';
import Affirm from '../../component/Affirm';

class Vehicle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            boole:false,
            recommend:[],
            Goods:props.goodsList,
            Affirm:false,
            num:null,
            market:{}
        }
    }

    componentDidMount(){
        axios({
            method:'get',
            url:"../data/cake.json"
        }).then((res)=>{
            let random = Math.floor(Math.random()*21);
            this.setState({
                recommend:res.data.data.goodsList.slice(random,random+8),
                market:res.data.data.market
            });
        });
        this.props.dispatch(update());
    }

    join = (goods)=>{
        this.props.dispatch(addGoods(goods));
        this.setState({Goods:this.props.goodsList});
        document.documentElement.scrollTop = 0;
    }

    changNum = (n,index,item)=>{
        if(item.num==1){
            this.setState({
                Affirm:true,
                num:index
            });
        }  
        this.props.dispatch(changNum(n,index,this.state.Affirm));
        this.setState({Goods:this.props.goodsList});
    }

    Affirm(n){
        this.setState({
            Affirm:true
        });
        this.props.dispatch(AFfirm(n,this.state.num))
        this.setState({Goods:this.props.goodsList});
        setTimeout(()=>{
            this.setState({ Affirm:false});
        },300);
    }

    pitchOn = (index)=>{
        this.props.dispatch(Calculate(index));
        this.setState({Goods:this.props.goodsList});
    }

    checkAll = ()=>{   
        this.props.dispatch(CheckAll());
        this.setState({Goods:this.props.goodsList});
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }

    render(){
        return (<div className={CSS.vehicle}>
            {
                this.state.Goods.length>=1&&
                <div>
                    <header className={CSS.header}>
                        <span>派对必备 欢喜加倍</span>
                        <em>加购超值组合专享礼</em>
                        <a href="#overflow">点击选购></a>
                    </header>
                    <ul>
                        {
                            this.state.Goods&&this.state.Goods.map((item,index)=>{
                                return <li key={index} className={CSS.MtGoods}>
                                    <Link to={'/goodsDetail/'+item.ID}><img src={item.goodsImg}/></Link>
                                    <div className={CSS.details}>
                                        <h2>{item.goodsName}</h2>
                                        <p>每份含餐具20套</p>
                                        <div className={CSS.goodsprice}>￥{item.goodsprice}</div>
                                        <div className={CSS.quantity}>
                                            <button className={item.num==1?CSS.subtract:''} onClick={this.changNum.bind(this,0,index,item)}></button>
                                            <span>{item.num}</span>
                                            <button className={CSS.plus} onClick={this.changNum.bind(this,1,index)}></button>
                                        </div>
                                    </div>
                                    {   item.classify&&
                                        <div className={CSS.messageWrap}>
                                            <div className={CSS.message}>
                                                <span>填写生日信息，免费赠送巧克力生日牌</span>
                                            </div>
                                            <div className={CSS.chop}>
                                                <span>切分 - 9份</span>
                                                <em></em>
                                            </div>
                                        </div>
                                    }
                                    <div className={CSS.pitchOnWrap}>
                                        <i className={item.Boole?CSS.pitchOn+' '+CSS.pitchOnActive:CSS.pitchOn} 
                                            onClick={this.pitchOn.bind(this,index)}></i>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                    <div className={CSS.wrap}>
                        <div><span className={this.props.checkAll?CSS.checkAll:''} onClick={this.checkAll}></span>全选</div>
                        <div>应付：￥<em>{this.props.inAll}</em><button>结算</button></div>
                    </div>
                    <section className={CSS.mountings}>
                        <h2>精品配件</h2>
                        <ul>
                            {
                                this.state.market.mountings&&this.state.market.mountings.map((item,index)=>{
                                    return <li key={index} className={CSS.mountingsGoods} onClick={this.join.bind(this,item)}>
                                        <img src={item.goodsImg}/>
                                        <p>{item.goodsName}</p>
                                        <div><span>￥{item.goodsprice}</span><span>{item.originalPrice}</span></div>
                                    </li>
                                })
                            }
                        </ul>
                    </section>
                    <section className={CSS.essential}>
                        <h2>派对必备  欢喜加倍</h2>
                        <ul>
                            {
                                this.state.market.essential&&this.state.market.essential.map((item,index)=>{
                                    return <li key={index} className={CSS.essentialGoods} onClick={this.join.bind(this,item)}>
                                        <img src={item.goodsImg}/>
                                        <p>{item.goodsName}</p>
                                        <div><span>￥{item.goodsprice}</span><span>￥{item.originalPrice}</span></div>
                                    </li>
                                })
                            }
                        </ul>
                    </section>
                    <section className={CSS.overflow}>
                        <h2><a name="overflow">超值组合专享礼</a></h2>
                        <ul>
                            {
                                this.state.market.overflow&&this.state.market.overflow.map((item,index)=>{
                                    return <li key={index} className={CSS.overflowGoods} onClick={this.join.bind(this,item)}>
                                        <img src={item.goodsImg}/>
                                        <p>{item.goodsName}</p>
                                        <div><span>￥{item.goodsprice}</span><span>￥{item.originalPrice}</span></div>
                                    </li>
                                })
                            }
                        </ul>
                    </section>
                    {
                        this.state.Affirm&&<Affirm Affirm={this.Affirm.bind(this)}/>
                    }
                </div>
            }
            
            {
                !this.state.Goods.length>=1&&
                <div className={CSS.hideWrap}>
                    <div className={CSS.back}>
                        <img src='../images/empty.png'/>
                        <p>您还没有选购您的商品</p>
                    </div>
                    <div className={CSS.recommend}>
                        <h2>推荐商品</h2>
                        <h3>Sincerely Recommend</h3>
                    </div>
                    <ul className={CSS.recommendList}>
                        {
                           this.state.recommend&&this.state.recommend.map((item,index)=>{
                               return <li key={index} className={CSS.goods}>
                                   <Link to={'/goodsDetail/'+item.ID}>
                                        <img src={item.goodsImg}/>
                                        <p>{item.goodsName}</p>   
                                        <div><span>￥{item.goodsprice}</span></div> 
                                   </Link>
                                   <em className={CSS.join} onClick={this.join.bind(this,item)}></em>
                               </li>
                           }) 
                        }
                    </ul>
                </div>
            }
        </div>)
    }
}
export default connect((state)=>{
    return state
})(Vehicle);