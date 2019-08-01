import React from "react";
import { HashRouter, Switch, Route} from 'react-router-dom';

import loadable from '../common/js/loadable';
function LoadComponent(name){
  return loadable(()=>import(`../views/${name}`));
}
function router() {
  return (
    <HashRouter >
      <Switch>
        <Route exact path='/' component={LoadComponent('App')} name="首页"/>
        <Route path='/about' component={LoadComponent('About')} name="关于"/>
        <Route path='/home' exact  component={LoadComponent('Home')} name="主页"/>
        <Route path='/home/addblog' component={LoadComponent('AddBlog')} name="写博客"/>
      </Switch>
    </HashRouter>
  )
}

export default router;