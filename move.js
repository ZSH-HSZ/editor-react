let moveIndex = 0
const moveList = [
  '云烟成雨',
  '麻雀',
  '句号',
  '岁月神偷 - 周笔畅',
  '煎熬',
  '我最亲爱的',
  '小半',
  '我不愿让你一个人',
  '半城烟沙',
  '父亲写的散文诗',
  '淋雨一直走',
  '那些你很冒险的梦 (JJ20版)',
  '因为爱情',
  '夜空中最亮的星',
  '平凡之路',
  '大眠',
  '心之火（电视剧《花千骨》片头曲）',
  '年轮',
  '多远都要在一起',
  '陪你度过漫长岁月',
  '天若有情 ((电视剧「锦绣未央」主题曲)',
  '爸爸妈妈',
  '后来的我们',
  '光年之外',
  '年轮说',
  '缘分一道桥',
  '水星记',
  '凄美地',
  '连名带姓',
  '孤雏',
  '无名的人（电影《雄狮少年》主题曲）',
  '追光者',
  '戒烟',
  '云烟成雨',
  '起风了',
  '玫瑰少年',
  '飞云之下',
  '倒数',
  '年少有为',
  '慢慢喜欢你',
  '日落大道',
  '雨幕 (新天龙八部端游主题曲）',
  '达尔文',
  '天外来物',
  'Always Online',
  '这世界那么多人 - 电影《我要我们在一起》主题曲',
  '如愿',
  '我记得',
  '篇章',
  '如果可以 (Acapella) (电影"月老"主题曲)',
  '人世间（电视剧《人世间主题曲》）',
  '愿与愁',
  '雨爱',
  '你不知道的事',
  '给自己的歌',
  '孤独患者(国)',
  '遗失的心跳',
  '一万次悲伤（Live版）',
  'Letting Go',
  '那些年',
  '如果爱忘了',
  '想你的夜',
  '指纹（《轩辕剑》插曲）',
  '泡沫',
  '有形的翅膀',
  '麦恩莉',
  '走在冷风中（Live）',
  '稳稳的幸福',
  '山丘',
  '岁月神偷（Live版）',
  '多远都要在一起 (Dub Mix)',
  '一半',
  '喜欢你',
  '惊鸿一面',
  '特别的人',
  '阴天快乐',
  '答案',
  '记念',
  '默',
  '悟空',
  '野子',
  '小幸运（Cover 田馥甄）',
  '我们不该这样的',
  '演员',
  '来自天堂的魔鬼',
  '易燃易爆炸',
  '不将就 (电影"何以笙箫默"片尾曲)',
  '成都',
  '我要你',
  '九张机',
  '再也没有 - 阮成武 Remix',
  '在你的身边',
  '桃花诺',
  '说散就散 ("前任3: 再见前任" 电影主题曲)',
  '体面',
  '爱你',
  '像我这样的人 - Live',
  '画',
  '壁上观',
  '虹之间 (完整版)',
  '时间煮雨',
  '其实都没有',
  '命运',
  '日落大道（Live版）',
  '男孩',
  '模特',
  '给我一个理由忘记',
  '匆匆那年',
  '贝加尔湖畔',
  '她说',
  '黑夜问白天',
  '不该',
  '吴哥窟',
  '需要人陪',
  '千百度'
]
function changeReactInputValue(inputDom, newText) {
  const lastValue = inputDom.value
  inputDom.value = newText
  const event = new Event('input', { bubbles: true })
  event.simulated = true
  const tracker = inputDom._valueTracker
  if (tracker) {
    tracker.setValue(lastValue)
  }
  inputDom.dispatchEvent(event)
}
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
// temp1和2 用了 chrome 的 save sa global
const addToFavorite = async () => {
  changeReactInputValue(temp1, moveList[moveIndex])
  await sleep(100)
  temp2.click()
  await sleep(2000)
  document.getElementsByClassName('list_menu__item list_menu__add')[0].click()
  await sleep(500)
  document.getElementsByClassName('operate_menu__link')[2].click()
  moveIndex++
  if (moveIndex < moveList.length) {
    addToFavorite()
  }
}
addToFavorite()
