import React from 'react';
import CSS from './index.module.scss';
import axios from 'axios';
import Join from '../../component/join';
import {Link} from 'react-router-dom';
import GoTop2 from '../../component/goTop'

class GoodsDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goods:{},
            describe:{},
            brag:{},
            inRegardTo:{},
            recommend:[],
            showBoole:false,
            active:0
        }
    }

    componentDidMount(){
        axios({
            method:'get',
            url:"../data/cake.json"
        }).then(res=>{
            let goodsId = parseInt(this.props.match.params.goodsId);
            let random = Math.floor(Math.random()*21);
            res.data.data.goodsList.map((item)=>{
               if(item.ID==goodsId){
                    this.setState({
                        goods:item,
                        describe:item.describe,
                        brag:item.brag,
                        inRegardTo:item.inRegardTo,
                        recommend:res.data.data.goodsList.slice(random,random+10)
                    })
               }
               return null
            })
        });
        let activeBoole = false;
        window.addEventListener('scroll',()=>{
            if(document.documentElement.scrollTop<552){
                this.setState({active:0})
            }else if(document.documentElement.scrollTop>552&&document.documentElement.scrollTop<710){
                this.setState({active:1})
            }else if(document.documentElement.scrollTop>710){
                this.setState({active:2})
            }
            if(document.documentElement.scrollTop>=500){
                this.setState({showBoole:true})
            }else{
                this.setState({showBoole:false})
            }
            
        });
        this.setState({activeBoole:activeBoole})
    }

    refresh = ()=>{ 
        setTimeout(()=>{
            window.location.href=window.location.href
            // window.location.reload()
        },100)
    }

    changTop = (n)=>{
        if(n===0){
            document.documentElement.scrollTop=0
        }else if(n===1){
            document.documentElement.scrollTop=550
        }else if(n===2){
            document.documentElement.scrollTop=710
        }
    }

    componentWillUnmount(){
       this.setState=(state,callback)=>{
            return;
        }
    }
    
    render(){
        return (<div className={CSS.goodsWrap}>
            <header className={this.state.showBoole?CSS.header+' '+CSS.headerAction :CSS.header}>
                <a className={this.state.active===0?CSS.active:''} onClick={this.changTop.bind(this,0)}>商品</a>
                <a className={this.state.active===1?CSS.active:''} onClick={this.changTop.bind(this,1)}>评论</a>
                <a className={this.state.active===2?CSS.active:''} onClick={this.changTop.bind(this,2)}>详情</a>
                <a>换购</a>
            </header>
            <section>
                <div className={CSS.headImg}><img src={this.state.goods.goodsImg}/></div>
                <div className={CSS.ContentWrap}>
                    <div className={CSS.goodsContent}>
                        <h2>{this.state.goods.goodsName}</h2>
                        <h2>￥{this.state.goods.goodsprice}</h2>
                        <a></a>
                    </div>
                    <div className={CSS.member}>
                        <h3>aha会员尊享多重礼遇</h3>
                        <h4>开通仅¥99 预计可省¥358</h4>
                        <em>￥99开通</em>
                    </div>
                    <div className={CSS.specification}>
                        <h3>已选规格: 2-4人食</h3>
                        <p>{this.state.goods.goodsName}</p>
                        <div className={this.state.sweetness}>甜度<i></i></div>
                    </div>
                </div>
                <div className={CSS.comment}>
                    <ul className={CSS.commentList}>
                        {
                            this.state.goods.comment&&this.state.goods.comment.map((item,index)=>{
                                return <li key={index} className={CSS.commentContent}>
                                    <h3><span>{item.number.substr(0,3)+'***'+item.number.substr(7,4)}</span> <span>{item.date}</span></h3>
                                    <p>{item.content}</p>
                                </li>
                            })
                        }
                    </ul>
                    <p className={CSS.more}><a>查看更多评论 ></a></p>
                </div>
                <div className={CSS.details}>
                    <div className={CSS.seek}>
                        <h2>寻找心中的美味</h2>
                        <img src={this.state.describe.img}/>
                        <ul>
                        {
                            this.state.describe.content&&this.state.describe.content.map((item,index)=>{
                                return <li key={index}>{item.title}</li>
                            })
                        }
                        </ul>
                    </div>
                    <div>
                        {
                            this.state.goods.strictSelection&&this.state.goods.strictSelection.map((item,index)=>{
                                return <div key={index}>
                                    <img src={item.img}/>
                                </div>
                            })
                        }
                    </div>
                    <div className={CSS.edible}>
                        <h2>关于食用</h2>
                        <p>适合人群：{this.state.inRegardTo.application}</p>
                        <p>保险条件：{this.state.inRegardTo.store}</p>
                        <p>食用方法：{this.state.inRegardTo.usage}</p>
                        <p>{this.state.inRegardTo.hint}</p>
                    </div>
                    <a><img src='https://wx01.lecake.com/postsystem/docroot/images/promotion/201905/%E5%95%AA%E5%95%AA%E8%84%B8wap.jpg'/></a>
                    <div className={CSS.edible2}>
                        <h2>{this.state.brag.goodsTitle}</h2>
                        {
                            this.state.brag.content&&this.state.brag.content.map((item,index)=>{
                                return <p key={index}>{item.details}</p>
                            })
                        }
                    </div>
                </div>
                <div className={CSS.recommend}>
                    <h2>- 猜你喜欢 -</h2>
                    <ul className={CSS.goodsList}>
                        {
                            this.state.recommend&&this.state.recommend.map((item,index)=>{
                                return <li key={index} className={CSS.goods}>
                                    <Link to={'/goodsDetail/'+item.ID} onClick={()=>{this.refresh()}}>
                                        <img src={item.goodsImg}/>
                                        <div className={CSS.goodsConntent}>
                                            <h2>{item.goodsName}</h2>
                                            <p>{item.recommendreason}</p>
                                            <div>￥{item.goodsprice}</div>
                                        </div>
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </section>
            <Join Data={this.state.goods}/>
            <GoTop2/>
        </div>)
    }
}
export default GoodsDetails;