const dispatchInjectToContentScript = detail =>
  document.getElementById('inject_window')?.dispatchEvent(new CustomEvent('inject_to_content_script', { detail }));

const ajax = params => {
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

document.getElementById('inject_window')?.addEventListener('content_script_to_inject', (e: any) => {
  const { message, data: battleId } = e.detail;
  switch (message) {
    case 'getBattleRoomHref':
      ajax({
        url: '/quest/battle_key_check',
        data: JSON.stringify({ special_token: null, battle_key: battleId }),
        method: 'POST',
        success: result => {
          const redirect = result.redirect;
          if (redirect) {
            dispatchInjectToContentScript({ message: 'getBattleRoomHref', url: redirect });
          }
        },
      });
      break;

    default:
      break;
  }
});

// 创建一个用于粘贴 battle id 的文本框
const initInputForBattle = () => {
  let input = document.getElementById('battle_input');
  if (!input) {
    input = document.createElement('input');
    input.id = 'battle_input';
    input.style.width = '0px';
    input.style.height = '0px';
    document.body.appendChild(input);
  }
};

// 初始化舔婊配置
initInputForBattle();
