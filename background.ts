chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
  const { message, url, data } = response;
  let tasks = { error: '', tasks: '' };
  switch (message) {
    case 'listenClipBoardBattleCheck':
      chrome.tabs.query({ active: true }, tabs => {
        // 只有打开的 gbf 窗口才能进房
        let tabId;
        for (let tab of tabs) {
          if (tab.url?.includes('game')) {
            tabId = tab.id;
            break;
          }
        }
        if (!tabId) {
          return;
        }
        const port = chrome.tabs.connect(tabId, { name: 'popup_to_content' });
        port.postMessage({ message: 'battle_key_check', battleId: data });
      });
      break;

    case 'battle_room_href': // 用于跳转地址
      if (sender.tab?.id) {
        chrome.tabs.update(sender.tab.id, {
          url: 'http://game.granbluefantasy.jp' + url,
        });
      }
      break;

    default:
      break;
  }
  sendResponse(tasks);
});
