import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import Classify from "./pages/classify";
import Vegicle from "./pages/vehicle";
import My from "./pages/my";
import Nav from "./component/Nav";
import GoodsDetail from "./pages/goodsDetails";
import Login from "./pages/Login/index";
import Personal from "./pages/personal";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: [
        {
          title: "首页",
          toPath: "/",
        },
        {
          title: "生日蛋糕",
          toPath: "/Classify",
        },
        {
          title: "购物袋",
          toPath: "/Vegicle",
        },
        {
          title: "我的",
          toPath: "/My",
        },
      ],
    };
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Home" exact component={Home} />
            <Route path="/Classify" component={Classify} />
            <Route path="/Vegicle" component={Vegicle} />
            <Route path="/My" component={My} />
            <Route path="/goodsDetail/:goodsId" component={GoodsDetail} />
            <Route path="/MyLogin" component={Login} />
            <Route path="/Personal" component={Personal} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </div>
        <div>
          <Nav navList={this.state.navList} />
        </div>
      </BrowserRouter>
    );
  }
}
export default AppRouter;
