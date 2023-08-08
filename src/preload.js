const {getSetList} = require('./list.js')

window.exports = {
    "to": {
        mode: "list",
        args: {
            // 进入插件时调用（可选）
            enter: (action, callbackSetList) => {
                console.log('enter', action);
                callbackSetList(getSetList(action.payload))
            },
            // 子输入框内容变化时被调用 可选 (未设置则无搜索)
            search: (action, searchWord, callbackSetList) => {
                console.log('search', action, searchWord);
                callbackSetList(getSetList(action.payload, searchWord))
            },
            // 用户选择列表中某个条目时被调用
            select: (action, itemData, callbackSetList) => {
                console.log('search', action, itemData);
                enterText(itemData.title)
            },
            // 子输入框为空时的占位符，默认为字符串"搜索"
            placeholder: "目标类型 or 新变量名"
        }
    },
    "form": {
        mode: "list",
        args: {
            // 子输入框内容变化时被调用 可选 (未设置则无搜索)
            search: (action, searchWord, callbackSetList) => {
                callbackSetList(getSetList(searchWord))
            },
            // 用户选择列表中某个条目时被调用
            select: (action, itemData, callbackSetList) => {
                enterText(itemData.title)
            },
            // 子输入框为空时的占位符，默认为字符串"搜索"
            placeholder: "输入变量名"
        }
    },
}

function enterText(text) {
    // 复制到剪贴板
    utools.copyText(text)

    utools.hideMainWindow();
    utools.setSubInputValue('');
    utools.outPlugin();

    // 区分系统 触发粘贴键
    if (utools.isMacOs()) {
        utools.simulateKeyboardTap('v', 'command')
    } else {
        utools.simulateKeyboardTap('v', 'ctrl')
    }
}

function callback({ code, type, payload }) {
  const list = getSetList(payload, false, true) || []
  return list.splice(0, 6)
}
function selectCallback({ code, type, payload, option }) {
    enterText(option.text)
}
utools.onMainPush(callback, selectCallback)
