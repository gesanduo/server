let host = 'https://wetwet.cc/api';
if(window.location.href.indexOf('localhost')!==-1){
  host = 'localhost:8081/api'
}
const url = {
  listBlog:`${host}/blog/list`,
}

export default url;