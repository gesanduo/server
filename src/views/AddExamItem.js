import React from 'react';
import { Input ,Card,Button,Form,Select} from 'antd';
import ExamOptions from '../components/ExamOptions';
import api from '../common/js/api'
const {Option} = Select;
const sList = [{
  value:'select',
  name:'单选',
},{
  value:'mutl',
  name:'多选',
},{
  value:'text',
  name:'填空',
}];
const tags = [{
  value:'default',name:'无',
},{
  value:'chinese',name:'语文',
},{
  value:'math',name:'数学',
}]
class AddExamItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title:'',
      user:'admin',
      tag:'default',
      tag1:'',
      isPublic:true, // 是否公开
      isInList:false, // 是否出现在题库
      content:'',// 内容
      answer:'',// 答案
      explain:'',// 解析
      answerImg:'',// 答案图片
      titleImg:'',// 题目图片
      source:'', // 来源
    }
    this.changeTitle = this.changeTitle.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeTag = this.changeTag.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeTitle(e){
    this.setState({
      title:e.currentTarget.value,
    })
  }
  changeType(val){
    this.setState({
      type:val,
    })
  }
  changeTag(val){
    this.setState({
      tag:val,
    })
  }
  changeContent(obj){
    console.log(obj)
    if(typeof obj !== 'string'){
      obj = JSON.stringify(obj)
    }
    this.setState({content:obj});
  }
  handleSubmit(){
    console.log(this.state);
    api.addExamItem(this.state,).then(()=>{
      
    })
  }
  render(){
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return(
      <div>
        <Card>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Button type="primary" className="saveBtn" onClick={this.handleSubmit}>保存</Button>
            <Form.Item label="标题：">
              <Input placeholder="请输入题目标题" allowClear onChange={this.changeTitle} />
            </Form.Item>
            <Form.Item label="学科类型：">
              <Select defaultValue="default" style={{ width: 200 }} onChange={this.changeTag}>
                {tags.map((item)=>
                  <Option value={item.value} key={item.value}>{item.name}</Option>
                )} 
              </Select>
            </Form.Item>
            <Form.Item label="标签：">
              <Select mode="multiple" style={{ width: 300 }} onChange={this.changeType}>
                {tags.map((item)=>
                  <Option value={item.value} key={item.value}>{item.name}</Option>
                )} 
              </Select>
            </Form.Item>
            <Form.Item label="题目类型：">
              <Select defaultValue="select" style={{ width: 200 }} onChange={this.changeType}>
                {sList.map((item)=>
                  <Option value={item.value} key={item.value}>{item.name}</Option>
                )} 
              </Select>
            </Form.Item> 
            <ExamOptions onChange={this.changeContent}/>      
          </Form>
         </Card>
      </div>
    )
  }
}

export default AddExamItem;