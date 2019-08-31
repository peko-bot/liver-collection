import { dispatchInjectToContentScript } from "../util/Request";

const ajax = params => {
  const defaultOptions = {
    cache: false,
    global: false,
    dataType: "json",
    contentType: "application/json",
    error: error => {
      dispatchInjectToContentScript({ message: "inject_ajax_error", error });
    }
  };

  $.ajax(Object.assign({}, defaultOptions, params));
};

export { ajax };
