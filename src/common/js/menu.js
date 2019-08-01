const menu = [{
  title:'博客',
  level:'1',
  key:'1',
  children:[{
    title:'写博客',
    level:'2',
    key:'1-1',
    router:'/addblog',
  },{
    title:'博客列表',
    level:'2',
    key:'1-2',
    router:'/listblog',
  }]
},{
  title:'试卷',
  level:'1',
  key:'2',
  children:[{
    title:'试卷列表',
    level:'2',
    key:'2-1',
    router:'/addblog',
  },{
    title:'题目列表',
    level:'2',
    key:'2-1',
    router:'/listblog',
  }]
}]

export default menu;