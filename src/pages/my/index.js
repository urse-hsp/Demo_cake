import React from 'react';
import CSS from './index.module.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '../../action';

class My extends React.Component{
    constructor(props){
        super(props);
        this.state={
            MyData:{
                myOrder:[
                    {
                        "title":"待付款",
                        "toPath":'/My',
                        "logOut":'/'
                    },
                    {
                        "title":"待发货",
                        "toPath":'/My',
                        "logOut":'/'
                    },
                    {
                        "title":"待收货",
                        "toPath":'/My',
                        "logOut":'/'
                    },
                    {
                        "title":"我的订单",
                        "toPath":'/My',
                        "logOut":'/'
                    }
                ],
                MyService:[
                    {
                        "title":"生日助手",
                        "toPath":'/My',
                        "logOut":'/'
                    },
                    {
                        "title":"个人资料",
                        "toPath":'/My',
                        "logOut":'/'
                    },
                    {
                        "title":"储值卡专享兑换券",
                        "toPath":'/My',
                        "logOut":'/'
                    },
                    {
                        "title":"在线客服",
                        "toPath":'/My',
                        "logOut":'/'
                    },
                    {
                        "title":"我的发票",
                        "toPath":'/My',
                        "logOut":'/'
                    },
                    {
                        "title":"关于我们",
                        "toPath":'/My',
                        "logOut":'/'
                    }
                ]
            },
            userData:null
        }
    }
    
    componentDidMount(){
        let userData = JSON.parse(localStorage.getItem('userName'));
        if(userData!==null){
            this.props.dispatch(logIn(true));
           
        }else{
            this.props.dispatch(logIn(false));
        }
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
           return;
       }
    }
    render(){
        return (<div className={CSS.myWrap}>
            <header className={this.props.logIn?CSS.header+' '+CSS.headerPadding:CSS.header}>
                {!this.props.logIn&&
                    <div className={CSS.logOut}>
                        <div><img src="../images/avatar.png"/></div>
                        <Link to='/MyLogin'>登录</Link>
                    </div>
                }
                {this.props.logIn&&
                    <div className={CSS.logIn}>
                        <div className={CSS.userMessage}>
                            <Link to="/Personal"><img src="../images/avatar.png"/></Link>
                            <span>176716****2036</span>
                            <em>Lv.1</em>
                        </div>
                        <div className={CSS.welfare}>
                            <div>
                                <p>0</p>
                                <p>aha值返利</p>
                            </div>
                            <div>
                                <p>1</p>
                                <p>我的优惠价</p>
                            </div>
                        </div>
                    </div>
                }
            </header>

            <section className={CSS.mian}>
                <div className={CSS.myOrder}>
                    <h2>我的订单</h2>
                    <ul>
                       {this.state.MyData.myOrder&&this.state.MyData.myOrder.map((item,index)=>{
                            return <li key={index}><a>{item.title}</a></li>
                        })}
                    </ul>
                </div>
                <img src="../images/bg_not_aha.png" className={CSS.OpenService}/>
                <div className={CSS.MyService}>
                    <h2>我的订单</h2>
                    <ul>
                       {
                        this.state.MyData.MyService&&this.state.MyData.MyService.map((item,index)=>{
                            return <li key={index}><a>{item.title}</a></li>
                        })   
                       }
                    </ul>
                </div>
            </section>
        </div>)
    }
}
export default connect(state=>{
    return state
})(My);