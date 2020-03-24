import React from 'react';
import CSS from './index.module.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            boole:true,
            caution:null,
            securityCode:null
        }
    }
    componentDidMount(){
        this.setState({securityCode:Math.floor(Math.random()*600000)})
    }
    changTitle = (n)=>{
        if(n===0){
            this.setState({boole:true});
        }else{
            this.setState({boole:false});
        }
    }
    logIn = ()=>{
        let userNumber = this.refs.number.value;
        let userPassword = parseInt(this.refs.password.value);
        if(userNumber.length===0&&userPassword.length===0){
            this.setState({caution:"手机号和验证码不能为空，"});
            return false; 
        }else if(!(/^1[3456789]\d{9}$/.test(userNumber))){ 
            this.setState({caution:"手机号码有误，请重填"});
            return false; 
        }else if(userPassword!=this.state.securityCode){ 
            this.setState({caution:"验证码有误，请重填"});
            return false; 
        }else if((/^1[3456789]\d{9}$/.test(userNumber))===true&&userPassword===this.state.securityCode){ 
                let userName = {
                    userNum:this.refs.number.value,
                    userPassword:this.refs.password.value
                }
                localStorage.setItem('userName',JSON.stringify(userName));
                this.props.history.push('/My')
            return false; 
        }

    }
    chang(){
        let userNumber = this.refs.number.value;
        if(userNumber.length===0){
            this.setState({caution:"不能为空，手机号长度为16位"});
            return false;
        }else if(!(/^1[3456789]\d{9}$/.test(userNumber))){ 
            this.setState({caution:"手机号码有误，请重填"});
            return false; 
        }else{
            this.setState({caution:""});
            this.refs.password.value = this.state.securityCode;
        } 
    }
    sendBtn = ()=>{
        this.chang();
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
           return;
       }
    }

    render(){
        return (<div className={CSS.loginWrap}>
            <header className={CSS.header}>
                <span className={this.state.boole?CSS.active:''} onClick={this.changTitle.bind(this,0)}>手机一键登录</span>
                <span className={this.state.boole?'':CSS.active} onClick={this.changTitle.bind(this,1)}>账号登录</span>
            </header>
            <div className={CSS.cellphone} style={{'display':this.state.boole?'block':'none'}}>
                <div className={CSS.register}>
                    <p>未注册的用户默认直接注册</p>
                    <p>登录即代表您已同意<a href='https://wx01.lecake.com/mobile/topic/s2018/user_agreement/index.php'>《诺心lecake用户服务协议》</a></p>
                </div>
                <div className={CSS.user}>
                    <p>
                        <input type="text" ref='number' placeholder="请输入手机号" maxLength='11'/>
                        <span className={CSS.caution}>{this.state.caution}</span>
                    </p>
                    <p>
                        <input type="text" ref='password' placeholder="请输入短信验证码" maxLength='6'/>
                        <button className={CSS.sendBtn} onClick={this.sendBtn}>发送验证码</button>
                    </p>
                </div>
                <button className={CSS.logIn} onClick={this.logIn.bind(this)}>验证并登录</button>
            </div>
            
            <div className={CSS.cellphone+' '+CSS.top} style={{'display':this.state.boole?'none':'block'}}>
                <div className={CSS.user}>
                    <p><input type="text" placeholder="请输入手机号" maxLength='11'/></p>
                    <p>
                        <input type="password" placeholder="请输入密码" maxLength='6'/>
                    </p>
                </div>
                <button className={CSS.logIn}>登录</button>
            </div>

            <footer className={CSS.footer}>
                <h3>其他登录方式</h3>
                <a></a>
            </footer>
            
        </div>)
    }
}
export default Login;