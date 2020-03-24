import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import CSS from './index.module.scss';
import {connect} from 'react-redux';

function Nav(props){
    let action = props.location.pathname;
    if(action.includes('/MyLogin')===false&&action.includes('/goodsDetail/')===false){
        return (<ul className={CSS.footer}>
            {
                props.navList.map((item,index)=>{
                    return <li key={index} >
                        <Link className={action==item.toPath?CSS.action:''} to={item.toPath}>
                            {item.title}{props.goodsList.length>0&&<i style={{"display":index==2?"block":"none"}}>{props.goodsList.length}</i>}
                        </Link>
                    </li>
                })
            }
        </ul>)
    }else{
        return null
    }  
}
export default connect(state=>{
    return state
})(withRouter(Nav));