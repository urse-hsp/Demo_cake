import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import CSS from './index.module.scss';
import {connect} from 'react-redux';

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
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

    componentDidMount(){
        this.changQuantitym()
    }

    componentWillReceiveProps(){
        this.changQuantitym();
    }
    
    render(){
        if(this.props.location.pathname.includes('/MyLogin')===false&&this.props.location.pathname.includes('/goodsDetail/')===false){
            return (<ul className={CSS.footer}>
                {
                    this.props.navList.map((item,index)=>{
                        return <li key={index} >
                            <Link className={this.props.location.pathname==item.toPath?CSS.action:''} to={item.toPath}>
                                {item.title}{this.props.goodsList.length>0&&
                                <i style={{"display":index==2?"block":"none"}}>{this.state.quantity}</i>}
                            </Link>
                        </li>
                    })
                }
            </ul>)
        }else{return null}  
    }
}
export default connect(state=>{
    return state
})(withRouter(Nav));