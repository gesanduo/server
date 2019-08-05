import axios from 'axios';
import qs from 'qs';
import { Spin as Toast, Modal as Dialog } from 'vant';

const CancelToken = axios.CancelToken;

const interceptor = {
  init() {
    let _loadingNum = 0;
    let _loadingToast;
    let param;
    axios.defaults.timeout = 15000; // 15s超时
    // 请求前的拦截
    axios.interceptors.request.use(config => {
      if (config.noInterceptors) { // 如果不拦截不做处理
        return config;
      }
      param = config;
      if (_loadingNum === 0 && !config.hideLoading) { // 弹出loading框
        Toast.allowMultiple(); // toast 允许多例
        _loadingToast = Toast.loading({
          loadingType: 'spinner',
          mask: true,
          className:'axios-loading-mask',
          message: '加载中...',
          duration: 0,
        });
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
            _loadingToast.clear();
          }
        }
        // 返回结果，根据传入的参数，返回回调需要的对应结果
        if(res.config.returnAll){ // 直接返回请求结果
          return Promise.resolve(res);
        } else if(!gateway.isGateway(param.url)){
          return Promise.resolve(res);
        }else if (res.config.returnData){ // 返回请求的数据结果（data部分）
          res = res.data;
        } else { // 统一弹出报错信息,只返回gateway的数据集（returnObject部分）
          // 统一弹出报错信息
          if (res.data.exceptionMessage || res.data.errorMessage) {
            Toast.allowMultiple();
            Toast({
              message: res.data.exceptionMessage || res.data.errorMessage,
              position: 'bottom',
              duration: 2000,
            });
            return Promise.reject(res);
          }
          if (res.data.success) {
            res = res.data.returnObject;
          }
        }
      }
      return Promise.resolve(res);
    }, err => {
      if (err.config && !err.config.noInterceptors) { // 接口支持拦截
        if (err.config && !err.config.noInterceptors && !err.config.hideLoading) {
          _loadingNum--;
          if (_loadingNum === 0) {
            _loadingToast.clear();
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
        Dialog.alert({
          message: '为了您的账户安全，请重新登录或重新打开功能',
        }).then(() => {
          wx.closeWindow();
        });
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
      Toast.allowMultiple();
      Toast({
        message: msg,
        position: 'bottom',
        duration: 2000,
      });
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
