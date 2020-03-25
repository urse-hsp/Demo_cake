import React from 'react';
import {Link} from 'react-router-dom';
import CSS from './index.module.scss';
import {addGoods} from '../../action';
import {connect} from 'react-redux';
import Hint from '../../component/hint';

class Join extends React.Component{
    constructor(props){
        super(props)
        this.state={
            boole : false,
            quantity:0
        }
    }

    changQuantitym = ()=>{
        let num = 0;
        this.props.goodsList.forEach((item)=>{
            num += item.num;
        });
        this.setState({quantity:num})
    }

    join = ()=>{
        this.props.dispatch(addGoods(this.props.Data));
        this.setState({boole:true})
        setTimeout(()=>{
            this.setState({boole:false})
        },1500);
    }
    
    componentDidMount(){
        this.changQuantitym()
    }

    componentWillReceiveProps(){
        this.changQuantitym();
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
           return;
       }
    }

    render(){
        return <div className={CSS.JoinNav}>
            <div>
                <Link to='/'></Link>
                <a></a>
                <Link to='/Vegicle'>{this.props.goodsList.length>0&&
                    <span className={CSS.quantity}>
                    {this.state.quantity}</span>}
                </Link>
            </div>
             <button onClick={this.join.bind(this)}>加入购物车</button>
            {this.state.boole&&<Hint/>}
    </div>
    }
}
export default connect(state=>{
    return state
})(Join);