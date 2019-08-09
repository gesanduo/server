import { Button, Divider, Input, Popconfirm, Table, message } from 'antd';
import React, { Fragment,PureComponent  } from 'react';
import styles from './ExamOptions.less';

const list=['A','B','C','D','E','F','G','H','I','J','K','L','M','N']
class ExamOptions extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      data: props.value,
      loading: false,
      value: props.value,
    };
  }
  clickedCancel = false;
  index = 0;
  cacheOriginData = {};
  columns = [
    {
      title: '选项',
      key: 'option',
      width: '10%',
      render: (text,record,index) => {
        return list[index];
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: '70%',
      render: (text,record) => {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'content', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="内容"
            />
          );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text,record) => {
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <span onClick={e => this.saveRow(e, record.key)} style={{cursor:'pointer'}}>添加</span>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                  <span style={{cursor:'pointer'}}>删除</span>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <span onClick={e => this.saveRow(e, record.key)} style={{cursor:'pointer'}}>保存</span>
              <Divider type="vertical" />
              <span onClick={e => this.cancel(e, record.key)} style={{cursor:'pointer'}}>取消</span>
            </span>
          );
        }
        return (
          <span>
            <span onClick={e => this.toggleEditable(e, record.key)} style={{cursor:'pointer'}}>编辑</span>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
              <span style={{cursor:'pointer'}}>删除</span>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  getRowByKey(key, newData) {
    const { data = [] } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      option: this.index,
      content: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data = [] } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    if (onChange) {
      onChange(newData);
    }
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data = [] } = this.state;
    const newData = [...data];
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.content) {
        message.error('请填写完整选项信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      const { data = [] } = this.state;
      const { onChange } = this.props;
      let newData = [];
      data.map((item,index)=>{
        newData.push({
          content:item.content,
          option:list[index],
        })
        return true;
      })
      if (onChange) {
        onChange(newData);
      }
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data = [] } = this.state;
    const newData = [...data];
    // 编辑前的原始数据
    let cacheOriginData = [];
    cacheOriginData = newData.map(item => {
      if (item.key === key) {
        if (this.cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...this.cacheOriginData[key],
            editable: false,
          };
          delete this.cacheOriginData[key];
          return originItem;
        }
      }
      return item;
    });

    this.setState({ data: cacheOriginData });
    this.clickedCancel = false;
  }
  render(){
    const { data } = this.state;
    return(
      <Fragment>
        <Table
          columns={this.columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增选项
        </Button>
      </Fragment>
    )
  }
}

export default ExamOptions;