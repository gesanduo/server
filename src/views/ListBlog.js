import React from 'react';
import api from '../common/js/api'
import { Table, Divider } from 'antd';

const columns=[{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },{
    title: '简介',
    dataIndex: 'content',
    key: 'content',
    render:tag =>(<span>{tag.substr(0,10)}</span>)
  },{
    title: '创建日期',
    dataIndex: 'createDate',
    key: 'createDate',
    render:tag =>(<span>{tag}</span>)
  },{
    title: '阅读量',
    dataIndex: 'read',
    key: 'read',
  },{
    title: '评论数',
    dataIndex: 'comment',
    key: 'comment',
  },{
    title: '操作',
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
      this.setState({
        list:res.list,
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