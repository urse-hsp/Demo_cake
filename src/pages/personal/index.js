import React from 'react';
import CSS from './index.module.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
           userData:null
        }
    }
    
    componentDidMount(){
        let data = JSON.parse(localStorage.getItem('userName'));
        console.log(data)
        if(data){
            this.setState({userData:data.userNum})
        }
    }

    goBack = ()=>{
        this.props.history.goBack();
    }

    quit = ()=>{
        localStorage.removeItem("userName");
        this.props.history.push('/My')
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
           return;
       }
    }

    render(){
        return <div className={CSS.wrap}>
            <header className={CSS.header}>
                <span onClick={this.goBack}></span>
                个人信息
            </header>
            <section className={CSS.main}>
                <div className={CSS.userImg}>
                    <img src="../images/avatar.png"/><span>更改</span>
                </div>
                <div className={CSS.message}>
                    <div><em>手机号：</em><p>{this.state.userData}</p></div>
                    <div><em>性 &nbsp;别：</em><p>男</p></div>
                    <div><em>生 &nbsp;日：</em><p><span>请选择生日</span><span>该信息我们将为您保密</span></p></div>
                    <div><em>星 &nbsp;座：</em><p><span>请选择生日</span><span>根据生日自动匹配</span></p></div>
                </div>
                <button className={CSS.btn}>保存</button>
            </section>
            <a className={CSS.quit} onClick={this.quit}>退出登录</a>
        </div>
    }
}
export default Login;