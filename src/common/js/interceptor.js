import axios from 'axios';
import qs from 'qs';

const CancelToken = axios.CancelToken;

const interceptor = {
  init() {
    let _loadingNum = 0;
    // let _loadingToast;
    axios.defaults.timeout = 15000; // 15s超时
    // 请求前的拦截
    axios.interceptors.request.use(config => {
      if (config.noInterceptors) { // 如果不拦截不做处理
        return config;
      }
      if (_loadingNum === 0 && !config.hideLoading) { // 弹出loading框
        
      }
      if (!config.hideLoading) {
        _loadingNum++;
      }
      if (config.contentType === 'form') {
        config.data = qs.stringify(config.data);
      }
      return config;
    }, error => {

      return Promise.reject(error);
    });
    // 请求后的拦截
    axios.interceptors.response.use(res => {
      if (!res.config.noInterceptors) { // 接口支持拦截
        if (!res.config.hideLoading) {
          _loadingNum--;
          if (_loadingNum === 0) {
            
          }
        }
        // 统一弹出报错信息
        if (res.data.exceptionMessage || res.data.errorMessage) {
          
          return Promise.reject(res);
        }
      }
      return Promise.resolve(res.data);
    }, err => {
      if (err.config && !err.config.noInterceptors) { // 接口支持拦截
        if (err.config && !err.config.noInterceptors && !err.config.hideLoading) {
          _loadingNum--;
          if (_loadingNum === 0) {
           
          }
        }
        // 统一弹出报错信息
        interceptor.showErr(err);
        return Promise.reject(err);
      }
    });
  },
  // 统一报错处理
  showErr(err) {
    const resMsg = err.message;
    const response = err.response;
    let msg = '';
    if (resMsg.indexOf('timeout') !== -1) {
      msg = '请求超时,稍后尝试！';
    }
    if (response) {
      const resCode = response.status;
      if(resCode === 401 && response.data.exceptionCode === 'param.71'){
        
      }
      if (resCode === 404) {
        msg = '接口无法访问';
      } else if (response.data.exceptionMessage || response.data.errorMessage) {
        msg = response.data.exceptionMessage || response.data.errorMessage;
      } else{
        msg = '发生未知错误';
      }
    }
    if (msg) {
      
    }
  },
  cancel(config){
    const key = config.method + config.url;
    const data = JSON.stringify(config.data)+JSON.stringify(config.params);
    // 判断，如果这里拿到的参数中的 key 在上一次请求中已经存在，判断参数是否一致，参数一致取消当前请求 参数不一致 取消现在这个的请求
    if (key) {
      if (axios[key] && axios[key].cancel) {
        if(axios[key].data !== data){ // 参数不一致，以当前请求返回为准
          axios[key].cancel();
        }else{ // 参数一致，等待上一次的请求 取消当前请求

        }
      }
      config.cancelToken = new CancelToken(c => {
        axios[key] = {};
        axios[key].data = data;
        axios[key].cancel = c;
      });
    }
  },
};
export default interceptor;
