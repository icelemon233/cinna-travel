export const transportRoutes = [
  {
    id: 'CHUAN-QING', name: '川青铁路 · 动车通道', province: 'sichuan', type: 'high-speed-rail',
    note: '成都—茂县—松潘—黄龙九寨方向；实际车次与开通区段以铁路公告为准。',
    points: [[104.139, 30.628], [104.071, 30.808], [103.925, 31.235], [103.849, 31.68], [103.721, 32.59], [103.598, 32.642], [103.824, 32.746]],
  },
  {
    id: 'CHENG-GUAN', name: '成灌铁路', province: 'sichuan', type: 'conventional-rail',
    note: '成都西—郫县—都江堰—青城山的市域动车铁路。',
    points: [[103.953, 30.683], [103.888, 30.809], [103.646, 30.994], [103.577, 30.902]],
  },
  {
    id: 'CHENG-YA', name: '成雅铁路', province: 'sichuan', type: 'conventional-rail',
    note: '成都西经蒲江至雅安的客运铁路，适合衔接雅安西部方向。',
    points: [[103.953, 30.683], [103.506, 30.196], [103.011, 29.98]],
  },
  {
    id: 'QINGHAI-TIBET', name: '青藏铁路', province: 'tibet', type: 'conventional-rail',
    note: '由格尔木方向经安多、那曲、当雄进入拉萨的高原铁路。',
    points: [[91.92, 32.9], [91.1, 31.48], [91.1, 30.48], [90.89, 30.28], [90.54, 30.09], [91.07, 29.625]],
  },
  {
    id: 'LHASA-SHIGATSE', name: '拉日铁路', province: 'tibet', type: 'conventional-rail',
    note: '拉萨经尼木通往日喀则，沿雅鲁藏布江谷地运行。',
    points: [[91.07, 29.625], [90.17, 29.44], [89.75, 29.31], [88.89, 29.25]],
  },
  {
    id: 'LHASA-NYINGCHI', name: '拉林铁路', province: 'tibet', type: 'conventional-rail',
    note: '拉萨经山南、加查、朗县通往林芝的电气化铁路。',
    points: [[91.07, 29.625], [91.77, 29.24], [92.59, 29.14], [92.72, 29.03], [93.23, 29.05], [94.36, 29.64]],
  },
  {
    id: 'XRL-HK', name: '广深港高铁', province: 'hongkong', type: 'high-speed-rail',
    note: '由深圳方向进入香港西九龙站；过境证件、票务与口岸安排以官方信息为准。',
    points: [[114.069, 22.55], [114.111, 22.43], [114.145, 22.36], [114.165, 22.304]],
  },
  {
    id: 'MTR-EAST-RAIL', name: '东铁线 · 市域铁路', province: 'hongkong', type: 'conventional-rail',
    note: '罗湖 / 落马洲经新界东、九龙通往金钟的跨区铁路。',
    points: [[114.113, 22.528], [114.128, 22.501], [114.17, 22.448], [114.177, 22.377], [114.176, 22.337], [114.183, 22.318], [114.173, 22.303], [114.166, 22.279]],
  },
  {
    id: 'MTR-ISLAND', name: '港岛线', province: 'hongkong', type: 'metro',
    note: '坚尼地城—中环—金钟—北角—柴湾，连接港岛北岸主要街区。',
    points: [[114.128, 22.283], [114.142, 22.286], [114.157, 22.282], [114.166, 22.279], [114.183, 22.28], [114.201, 22.291], [114.237, 22.264]],
  },
  {
    id: 'MTR-TSUEN-WAN', name: '荃湾线', province: 'hongkong', type: 'metro',
    note: '中环—尖沙咀—油麻地—旺角—荃湾，是港九旅游最常用的南北线。',
    points: [[114.158, 22.282], [114.169, 22.297], [114.171, 22.312], [114.169, 22.319], [114.162, 22.337], [114.136, 22.373], [114.107, 22.371]],
  },
  {
    id: 'MTR-KWUN-TONG', name: '观塘线', province: 'hongkong', type: 'metro',
    note: '黄埔—油麻地—九龙塘—黄大仙—观塘，连接九龙中东部。',
    points: [[114.19, 22.305], [114.171, 22.312], [114.176, 22.337], [114.193, 22.342], [114.204, 22.34], [114.225, 22.315]],
  },
  {
    id: 'MTR-TUEN-MA', name: '屯马线', province: 'hongkong', type: 'metro',
    note: '贯穿新界与九龙，串联钻石山、宋皇台、尖东和西九龙一带。',
    points: [[114.204, 22.34], [114.191, 22.331], [114.183, 22.319], [114.174, 22.297], [114.167, 22.304], [114.144, 22.326], [114.108, 22.354]],
  },
  {
    id: 'MTR-TUNG-CHUNG', name: '东涌线 / 机场快线', province: 'hongkong', type: 'metro',
    note: '香港站经九龙、青衣通往东涌与机场，是机场和大屿山的主通道。',
    points: [[114.158, 22.285], [114.161, 22.305], [114.107, 22.358], [114.042, 22.34], [113.939, 22.29], [113.918, 22.315]],
  },
  {
    id: 'MTR-SOUTH-ISLAND', name: '南港岛线', province: 'hongkong', type: 'metro',
    note: '金钟—海洋公园—黄竹坑—利东—海怡半岛。',
    points: [[114.166, 22.279], [114.174, 22.248], [114.168, 22.238], [114.156, 22.243], [114.146, 22.242]],
  },
  {
    id: 'PEAK-TRAM', name: '山顶缆车', province: 'hongkong', type: 'metro',
    note: '中环花园道至太平山顶的登山缆索铁路。',
    points: [[114.1595, 22.2775], [114.152, 22.273], [114.1431, 22.2759]],
  },
  {
    id: 'HK-FERRY', name: '天星小轮航线', province: 'hongkong', type: 'ferry',
    note: '中环 / 湾仔与尖沙咀之间的维港渡轮。',
    points: [[114.1602, 22.2877], [114.1698, 22.2933]],
  },
  {
    id: 'HK-FERRY-ISLANDS', name: '中环—长洲航线', province: 'hongkong', type: 'ferry',
    note: '中环 5 号码头往返长洲，普通船与高速船时间不同。',
    points: [[114.1602, 22.2877], [114.11, 22.25], [114.0284, 22.2093]],
  },
  {
    id: 'NGONG-PING', name: '昂坪 360', province: 'hongkong', type: 'scenic',
    note: '东涌至昂坪的观光缆车，受大风、雷暴与检修影响。',
    points: [[113.939, 22.29], [113.92, 22.27], [113.9041, 22.254]],
  },
];

export const transportStations = [
  { id: 'chengdu-east', name: '成都东站', province: 'sichuan', type: 'high-speed', coordinate: [104.139, 30.628], lines: ['川青铁路'], note: '四川铁路枢纽，可衔接川青方向动车。' },
  { id: 'chengdu-west', name: '成都西站', province: 'sichuan', type: 'rail', coordinate: [103.953, 30.683], lines: ['成灌铁路', '成雅铁路'], note: '前往都江堰、青城山和雅安方向的重要始发站。' },
  { id: 'dujiangyan', name: '都江堰站', province: 'sichuan', type: 'rail', coordinate: [103.646, 30.994], lines: ['成灌铁路'], note: '衔接都江堰城区及景区公交。' },
  { id: 'qingchengshan', name: '青城山站', province: 'sichuan', type: 'rail', coordinate: [103.577, 30.902], lines: ['成灌铁路'], note: '距离青城山前山较近。' },
  { id: 'yaan', name: '雅安站', province: 'sichuan', type: 'rail', coordinate: [103.011, 29.98], lines: ['成雅铁路'], note: '可转公路前往天全、宝兴等川西入口。' },
  { id: 'maoxian', name: '茂县站', province: 'sichuan', type: 'high-speed', coordinate: [103.849, 31.68], lines: ['川青铁路'], note: '阿坝州南部动车站。' },
  { id: 'zhenjiangguan', name: '镇江关站', province: 'sichuan', type: 'high-speed', coordinate: [103.721, 32.59], lines: ['川青铁路'], note: '川青铁路沿线站，车次与接驳需提前核对。' },
  { id: 'songpan', name: '松潘站', province: 'sichuan', type: 'high-speed', coordinate: [103.598, 32.642], lines: ['川青铁路'], note: '衔接松潘古城与周边公路交通。' },
  { id: 'huanglongjiuzhai', name: '黄龙九寨站', province: 'sichuan', type: 'high-speed', coordinate: [103.824, 32.746], lines: ['川青铁路'], note: '前往黄龙、九寨沟仍需换乘较长距离景区接驳。' },

  { id: 'lhasa', name: '拉萨站', province: 'tibet', type: 'rail', coordinate: [91.07, 29.625], lines: ['青藏铁路', '拉日铁路', '拉林铁路'], note: '西藏铁路核心枢纽。' },
  { id: 'nagqu', name: '那曲站', province: 'tibet', type: 'rail', coordinate: [92.06, 31.48], lines: ['青藏铁路'], note: '高海拔车站，抵达后注意适应。' },
  { id: 'damxung', name: '当雄站', province: 'tibet', type: 'rail', coordinate: [91.1, 30.48], lines: ['青藏铁路'], note: '接近当雄县城，纳木错仍需公路交通。' },
  { id: 'yangbajain', name: '羊八井站', province: 'tibet', type: 'rail', coordinate: [90.54, 30.09], lines: ['青藏铁路'], note: '青藏铁路沿线站。' },
  { id: 'shigatse', name: '日喀则站', province: 'tibet', type: 'rail', coordinate: [88.89, 29.25], lines: ['拉日铁路'], note: '日喀则铁路门户，珠峰方向需继续转公路。' },
  { id: 'shannan', name: '山南站', province: 'tibet', type: 'rail', coordinate: [91.77, 29.24], lines: ['拉林铁路'], note: '衔接泽当城区及山南公路交通。' },
  { id: 'gyaca', name: '加查站', province: 'tibet', type: 'rail', coordinate: [92.59, 29.14], lines: ['拉林铁路'], note: '拉林铁路沿线站。' },
  { id: 'nyingchi', name: '林芝站', province: 'tibet', type: 'rail', coordinate: [94.36, 29.64], lines: ['拉林铁路'], note: '林芝铁路门户，景区仍需公路接驳。' },

  { id: 'west-kowloon-station', name: '香港西九龙站', province: 'hongkong', type: 'high-speed', coordinate: [114.165, 22.304], lines: ['广深港高铁'], note: '香港高速铁路终点及口岸，预留实名验证与出入境时间。' },
  { id: 'hung-hom', name: '红磡站', province: 'hongkong', type: 'rail', coordinate: [114.182, 22.303], lines: ['东铁线', '屯马线'], note: '九龙南部铁路换乘站。' },
  { id: 'mong-kok-east', name: '旺角东站', province: 'hongkong', type: 'rail', coordinate: [114.176, 22.321], lines: ['东铁线'], note: '东铁线车站，步行可达旺角街区。' },
  { id: 'kowloon-tong', name: '九龙塘站', province: 'hongkong', type: 'rail', coordinate: [114.176, 22.337], lines: ['东铁线', '观塘线'], note: '新界东与九龙地铁的重要换乘站。' },
  { id: 'central', name: '中环站', province: 'hongkong', type: 'metro', coordinate: [114.158, 22.282], lines: ['港岛线', '荃湾线'], note: '步行连接香港站及中环码头。' },
  { id: 'admiralty', name: '金钟站', province: 'hongkong', type: 'metro', coordinate: [114.166, 22.279], lines: ['港岛线', '荃湾线', '东铁线', '南港岛线'], note: '港岛大型换乘站。' },
  { id: 'tsim-sha-tsui', name: '尖沙咀 / 尖东站', province: 'hongkong', type: 'metro', coordinate: [114.173, 22.297], lines: ['荃湾线', '屯马线'], note: '经地下通道连接，前往维港海滨最方便。' },
  { id: 'wong-tai-sin', name: '黄大仙站', province: 'hongkong', type: 'metro', coordinate: [114.193, 22.342], lines: ['观塘线'], note: '黄大仙祠邻近车站。' },
  { id: 'diamond-hill', name: '钻石山站', province: 'hongkong', type: 'metro', coordinate: [114.204, 22.34], lines: ['观塘线', '屯马线'], note: '前往南莲园池、志莲净苑和西贡巴士的换乘点。' },
  { id: 'kowloon', name: '九龙站', province: 'hongkong', type: 'metro', coordinate: [114.161, 22.305], lines: ['东涌线', '机场快线'], note: '接近西九文化区和香港西九龙站。' },
  { id: 'hong-kong-station', name: '香港站', province: 'hongkong', type: 'metro', coordinate: [114.158, 22.285], lines: ['东涌线', '机场快线'], note: '与中环站步行换乘。' },
  { id: 'tung-chung', name: '东涌站', province: 'hongkong', type: 'metro', coordinate: [113.939, 22.29], lines: ['东涌线'], note: '前往昂坪、大澳及大屿山的换乘门户。' },
  { id: 'airport', name: '机场站', province: 'hongkong', type: 'metro', coordinate: [113.918, 22.315], lines: ['机场快线'], note: '连接香港国际机场客运大楼。' },
];
