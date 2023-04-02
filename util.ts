export const ajax = params => {
  const defaultOptions = {
    cache: false,
    global: false,
    dataType: 'json',
    contentType: 'application/json',
    error: error => {
      dispatchInjectToContentScript({ message: 'inject_ajax_error', error });
    },
  };
  $.ajax(Object.assign({}, defaultOptions, params));
};

export const getStatus = success => {
  ajax({
    url: '/user/status',
    method: 'GET',
    success,
  });
};

export const dispatchInjectToContentScript = detail =>
  document.getElementById('inject_window').dispatchEvent(new CustomEvent('inject_to_content_script', { detail }));

export const dispatchContentScriptToInject = detail =>
  document.getElementById('inject_window').dispatchEvent(new CustomEvent('content_script_to_inject', { detail }));
