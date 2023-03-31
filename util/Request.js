/*
 * @Author: zy9@github.com/orzyyyy
 * @Date: 2018-06-08 09:13:33
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 11:32:01
 */
// 上传数据到服务器
export const uploadToServer = (url, data, callback) => {
  if (!url) return;

  let params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  };

  params = Object.assign(params, data);

  fetch(url, params)
    .then((result) => result.text())
    .then((result) => callback(result))
    .catch((error) => {
      console.log(error);
    });
};

export const getByCookie = (url, data, callback) => {
  if (!url) return;
  let params = {
    credentials: 'include', // 加入cookie
  };
  params = Object.assign(params, data);
  fetch(url, params)
    .then((result) => {
      return result;
    })
    .then((result) => {
      return callback(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postByCookie = (url, data, callback) => {
  if (!url) return;

  let params = {
    method: 'POST',
    // mode:'no-cors',
    credentials: 'include', // 加入cookie
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  params = Object.assign(params, data);
  fetch(url, params)
    .then((result) => {
      return result.text();
    })
    .then((result) => {
      callback(JSON.parse(result));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const dispatchInjectToContentScript = (detail) =>
  document.getElementById('init_window').dispatchEvent(new CustomEvent('inject_to_content_script', { detail }));

export const dispatchContentScriptToInject = (detail) =>
  document.getElementById('init_window').dispatchEvent(new CustomEvent('content_script_to_inject', { detail }));
