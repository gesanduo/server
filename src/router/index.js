
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
          <Route path="/addBlog" component={LoadComponent('AddBlog')} />
          <Route path="/listBlog" component={LoadComponent('ListBlog')} />
          <Route path="/addExamItem" component={LoadComponent('AddExamItem')} />
        </Layout>
      </div>
    </Router>
  )
}

export default router;