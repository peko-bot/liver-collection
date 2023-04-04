const dispatchContentScriptToInject = detail =>
  document.getElementById('inject_window').dispatchEvent(new CustomEvent('content_script_to_inject', { detail }));

chrome.runtime.onConnect.addListener(port => {
  switch (port.name) {
    case 'popup_to_content':
      port.onMessage.addListener(response => {
        const { message, battleId } = response;
        switch (message) {
          case 'battle_key_check': // 根据 battle id 获得房间地址
            // const body = { 'special_token': null, 'battle_key': battleId };
            // const url = '/quest/battle_key_check';
            dispatchContentScriptToInject({
              message: 'getBattleRoomHref',
              data: battleId,
            });
            break;

          default:
            break;
        }
      });
      break;

    default:
      break;
  }
});

const injectScript = file => {
  let th = document.getElementsByTagName('body')[0];
  let s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  let windowWraper = document.createElement('script');
  windowWraper.id = 'inject_window';
  th.appendChild(s);
  th.appendChild(windowWraper);
};

injectScript(chrome.runtime.getURL('/inject.js'));

// 初始化一键舔婊
if (location.href.includes('raidfinder')) {
  const body = document.getElementsByTagName('body')[0];
  body.addEventListener('click', () => {
    // chrome不能直接获得剪切板内容，只能先粘贴到input中，再获得input的值
    // https://stackoverflow.com/questions/25622359/clipboard-copy-paste-on-content-script-chrome-extension
    let input = document.getElementById('battle_input') as HTMLInputElement;
    input.focus();
    input.value = '';
    document.execCommand('paste');
    const battleId = input.value.trim();
    let reg = /^[A-Za-z0-9]+$/gi;
    if (reg.test(battleId) && battleId.length == 8) {
      chrome.runtime.sendMessage({ message: 'listenClipBoardBattleCheck', data: battleId });
    }
  });
}

// 用作接收 inject 返回的值
document.getElementById('inject_window').addEventListener('inject_to_content_script', (e: any) => {
  const { message, url } = e.detail;
  switch (message) {
    case 'getBattleRoomHref': // 跳转地址的转发
      chrome.runtime.sendMessage({ message: 'battle_room_href', url });
      break;

    default:
      break;
  }
});
