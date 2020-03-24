import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CSS from './index.module.scss';
import HomeSwiper from '../../component/HomeSwiper';
import InnerSwiper from '../../component/innerSwiper';
import GoTop from '../../component/goTop';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            homeData:[],
            recommend:[]
        }
    }
    componentDidMount(){
        axios({
            method:'get',
            url:"../data/cake.json"
        }).then(res=>{

            res.data.data.goodsList.map(item=>{
                if(item.recommend){
                    this.state.recommend.push(item)
                }
                return null
            });
            this.setState({
                homeData:res.data.data,
                recommend:this.state.recommend
            });
        });
    }

    componentWillUnmount(){
         this.setState=(state,callback)=>{
            return;
        }
    }
    
    render(){
        return (<div className={CSS.wrap}>
            <header className={CSS.header}>
                <HomeSwiper homeData={this.state.homeData.TieleSwiper}/>
                <div className={CSS.location}>上海</div>
            </header>
            <div className={CSS.member}>
                <div className={CSS.know}>
                    <p>尊贵礼遇享不停，升级aha会员</p>
                    <p>预计可省¥358+，<a href='https://wx01.lecake.com/h5/aha/index'>了解更多</a></p>
                </div>
                <div className={CSS.back}><img src='../images/ahaRights.png'/></div>
                <div className={CSS.btn}><a href='https://wx01.lecake.com/h5/aha/index'>立即开通 ¥99/年</a></div>
            </div>
            <div className={CSS.innerSwiper}>
                <InnerSwiper innerData={this.state.homeData.TieleSwiper2}/>
            </div>
            <div className={CSS.recommend}>
               <h2><span>- 蛋糕推荐 -</span></h2>
               {
                    this.state.recommend&&this.state.recommend.map((item,index)=>{
                        return <div key={index} className={CSS.GoodsRecommend}>
                            <Link to={'goodsDetail/'+item.ID}>
                                <img src={item.goodsImg}/>
                                <div className={CSS.goodsTitle}>
                                    <p>{item.goodsName}</p>
                                    <p>{item.recommendreason}</p>
                                </div>
                            </Link>
                        </div>
                    })
               }
            </div>
            <div className={CSS.guild}>
                  <a>企业兑换</a>     
                  <a>卡券绑定</a>     
                  <a>银行活动</a>     
            </div>
            <footer className={CSS.copyright}>
               <div>
                   <a>电脑版</a>
                   <a>网络公告</a>
                   <a>经营资质</a>
               </div>
               <h3>copyright © 2010-2020  诺心lecake.com版权所有<br/>诺心食品（上海）有限公司 <a>  沪ICP备10211730号</a></h3>
            </footer>
        </div>)
    }
}
export default Home;