const { getSetList } = require('../src/list.js')

const result = getSetList(`业务管理

客户任务管理

客户派发任务记录`)
console.log(`[LOG] → result`, JSON.stringify(result, null, 2))
