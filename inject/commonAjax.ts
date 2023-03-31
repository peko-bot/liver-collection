import { ajax } from './ajax';

const useOption = {
  url: '/item/use_normal_item',
  method: 'POST',
};

const getStatus = (success) => {
  ajax({
    url: '/user/status',
    method: 'GET',
    success,
  });
};

const useAp = (success, useCount = 1) =>
  ajax(
    Object.assign({}, useOption, { data: JSON.stringify({ special_token: null, item_id: 2, num: useCount }), success })
  );

const useBp = (success, useCount = 1) =>
  ajax(
    Object.assign({}, useOption, { data: JSON.stringify({ special_token: null, item_id: 5, num: useCount }), success })
  );

export { getStatus, useAp, useBp };
