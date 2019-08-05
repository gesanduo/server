import React from 'react';
import menuList from '../common/js/menu'
import {Link} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider } = Layout;
const { SubMenu } = Menu;

function MenuList(props){
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
    {menuList.map((item,index)=>
      {if(item.children){
      return (<SubMenu
        key={item.key}
        title={
          <span>
            <Icon type="team" />
            <span>{item.title}</span>
          </span>
        }
      >
      {item.children.map((one,i)=>
        <Menu.Item key={one.key}>
          <Link to={one.router}>
          {one.title}
          </Link>
        </Menu.Item>
      )}
    </SubMenu>
      )
      }else{
        return (<Menu.Item key={item.key}>
            <span>{item.title}</span>
          </Menu.Item>)
      }
    })}
    </Menu>
  )
}
class LeftMenu extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      collapsed:false,
    }
    this.onCollapse = this.onCollapse.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
  }

  onCollapse(value) {
    this.setState({ collapsed: value })
  }
  changeRoute(path){
    this.props.history.push(`/home${path}`);
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <MenuList/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          {this.props.children}
        </Layout>
      </Layout>
    )
  }
}

export default LeftMenu;