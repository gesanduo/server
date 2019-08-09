let host = 'https://wetwet.cc/api';
if(window.location.href.indexOf('localhost')!==-1){
  host = 'http://localhost:3001/api'
}
const url = {
  listBlog:`${host}/blog/list`,
  addExamItem:`${host}/exam/addExamItem`,
}

export default url;