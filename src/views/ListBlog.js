import React from 'react';
import api from '../common/js/api'
import { Table, Divider, Tag } from 'antd';

const columns=[{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },{
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },{
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },{
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Divider type="vertical" />
      </span>
    ),
}];
class About extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list:[],
      page:1,
      pageSize:10,
    }
  }
  componentWillMount(){
    const params ={
      page:this.state.page,
      pageSize:this.state.pageSize,
    }
    api.listBlog(params).then(res=>{
      console.log(res);
      this.setState({
        list:res,
      })
    })
  }
  render(){
    const {list} = this.state;
    return(
      <Table columns={columns} dataSource={list} />
    )
  }
}

export default About;