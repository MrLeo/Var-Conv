const VarConv = require('./var-conv.js')

function getSetList(var_name, searchWord, not_loop) {
  let var_conv = new VarConv(var_name || searchWord || ''),
    list = []
  searchWord = searchWord || false
  not_loop = not_loop || false

  for (let name in var_conv.maps) {
    let full_search = var_conv.maps[name].search + var_conv.maps[name].title,
      sort = 255
    // 检查搜索关键词
    if (!searchWord || (sort = full_search.indexOf(searchWord)) >= 0) {
      console.log(searchWord, full_search, sort)
      list.push({
        title: var_conv['to' + name](),
        description: var_conv.maps[name].title,
        sort: sort,
      })
    }
  }

  // 没有合适的匹配 就 把当前输入作为变量名 重新处理
  if (list.length <= 0 && !not_loop) {
    return getSetList(searchWord, false, true)
  }

  // 排序
  return list.sort(function (a, b) {
    return a.sort - b.sort
  })
}

module.exports = { getSetList }
