export const handleBoardPost = () => {
  chrome.tabs.query({ active: true }, tabs => {
    // 只有打开的 gbf 窗口才能进房
    let tabId;
    for (let tab of tabs) {
      const { id } = tab;
      if (tab.url.includes('game')) {
        tabId = id;
        break;
      }
    }
    if (!tabId) {
      return;
    }
    const port = chrome.tabs.connect(tabId, { name: 'popup_to_content' });
    let input = document.getElementById('battle_input') as HTMLInputElement;
    input.focus();
    input.value = '';
    /**
     * chrome不能直接获得剪切板内容，只能先粘贴到input中，再获得input的值
     *
     * https://stackoverflow.com/questions/25622359/clipboard-copy-paste-on-content-script-chrome-extension
     */
    document.execCommand('paste');
    let value = input.value.trim();
    let reg = /^[A-Za-z0-9]+$/gi;
    if (reg.test(value) && value.length == 8) {
      port.postMessage({ message: 'battle_key_check', battleId: value });
    } else {
      console.error('check failed');
    }
  });
};

// 创建一个用于粘贴 battle id 的文本框
export const initInputForBattle = () => {
  let input = document.getElementById('battle_input');
  if (!input) {
    input = document.createElement('input');
    input.id = 'battle_input';
    input.style.width = '0px';
    input.style.height = '0px';
    document.body.appendChild(input);
  }
};
