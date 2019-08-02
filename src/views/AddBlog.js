import React from 'react';
import Template from '../components/Template'
class About extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message:'Hello AddBlog!'
    }
  }
  render(){
    const {message} = this.state;
    return(
      <div>{message}</div>
    )
  }
}

export default About;