
let GoodsData = {
    goodsList:[],
    select:false,
    inAll:0,
    checkAll:false,
    logIn:false
}
export default function reducer(state=GoodsData,action){
    switch(action.type){
        case 'ADD_GOODS':
            let boole = false;
            state.goodsList.forEach((items)=>{
                if(parseInt(action.goods.ID)===parseInt(items.ID)){  
                    items.num++;
                    boole = true
                }
            })
            if(boole===false){
                action.goods.num=+1;
                action.goods.Boole = false;
                state.goodsList.push(action.goods);
            }
            state.checkAll = state.goodsList.every((item)=>{
                return item.Boole
            });
        return JSON.parse(JSON.stringify({...state}));

        case 'CHANGNUM':
            if(action.n===1){
                state.goodsList[action.index].num+=1;
            }else{
                state.goodsList[action.index].num-=1;
            }
        return JSON.parse(JSON.stringify({...state}));

        case 'AFFIRM':
            state.select = action.boole;
            if(state.goodsList[action.index].num===0&&state.select===true){
                state.goodsList.splice(action.index,1);
                state.select = false;
            }else if(state.goodsList[action.index].num===0&&state.select===false){
                state.goodsList[action.index].num+=1;
            }
        return JSON.parse(JSON.stringify({...state}));

        case 'CALCULATE':
            state.goodsList[action.index].Boole =!state.goodsList[action.index].Boole;
            let num = 0;
            state.goodsList.forEach((item)=>{
                if(item.Boole===true){
                    num += item.num*parseInt(item.goodsprice);
                }
            });
            state.inAll = num;
            state.checkAll = state.goodsList.every((item)=>{
                return item.Boole
            });
        return JSON.parse(JSON.stringify({...state}));

        case 'CHECKALL':
            let res =  state.goodsList.every((item)=>{
            return item.Boole
            });
            if(res===false){
                state.goodsList.forEach((item)=>{
                    item.Boole = true
                });
            }else{
                state.goodsList.forEach((item)=>{
                    item.Boole = false
                });
            }
            let num2 = 0;
            state.goodsList.forEach((item)=>{
                if(item.Boole===true){
                    num2 += item.num*parseInt(item.goodsprice);
                }
            });
            state.inAll = num2;
            state.checkAll = !res;
        return JSON.parse(JSON.stringify({...state}));

        case 'LOGIN':
            state.logIn = action.boole;
        return JSON.parse(JSON.stringify({...state}));
        default:
            return {...state}
    }
}