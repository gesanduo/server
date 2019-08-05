import axios from 'axios';
import url from './url';

const api = {
  addBlog(){

  },
  listBlog(params){
    return axios.get(url.listBlog,{params})
  }
}
export default api;