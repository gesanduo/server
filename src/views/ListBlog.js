import React from 'react';
class About extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message:'Hello ListBlog!'
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