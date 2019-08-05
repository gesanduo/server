
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from '../components/Template';

import loadable from '../common/js/loadable';
function LoadComponent(name){
  return loadable(()=>import(`../views/${name}`));
}
function router() {
  return (
    <Router>
      <div>
        <Layout>
          <Route path="/addblog" component={LoadComponent('AddBlog')} />
          <Route path="/listblog" component={LoadComponent('ListBlog')} />
        </Layout>
      </div>
    </Router>
  )
}

export default router;