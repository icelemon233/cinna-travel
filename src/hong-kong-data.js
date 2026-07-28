const commonsImage = (filename, title, artist, license) => ({
  dataUrl: `./travel-assets/${filename}`,
  pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_')).replaceAll('%3A', ':')}`,
  artist,
  license,
});

const hongKongImages = {
  'hong-kong-peak': [
    commonsImage('hk-hong-kong-peak-1.webp', 'File:Hong Kong Night Skyline.jpg', 'Base64，CarolSpears 修图', 'CC BY-SA 3.0'),
    commonsImage('hk-hong-kong-peak-2.webp', 'File:Hong Kong Harbour Night 2019-06-11.jpg', 'Benh LIEU SONG', 'CC BY-SA 4.0'),
  ],
  'victoria-harbour': [
    commonsImage('hk-victoria-harbour-1.webp', 'File:Victoria Harbour skyscrapers.jpg', 'Wilfredor', 'CC0'),
    commonsImage('hk-victoria-harbour-2.webp', 'File:International Commerce Centre on Victoria Harbour.jpg', 'Wilfredor', 'CC0'),
  ],
  'avenue-of-stars': [
    commonsImage('hk-avenue-of-stars-1.webp', 'File:2024-12-27 Avenue of Stars, Hong Kong.jpg', 'Alexkom000', 'CC BY 4.0'),
    commonsImage('hk-avenue-of-stars-2.webp', 'File:Avenue of Stars in Hong Kong(2).jpg', 'Alancrh', 'Public domain'),
  ],
  'star-ferry': [
    commonsImage('hk-star-ferry-1.webp', 'File:Celestial Star ferry Hong Kong (8112199340).jpg', 'Bernard Spragg. NZ', 'CC0'),
    commonsImage('hk-star-ferry-2.webp', 'File:"Celestial Star," Hong Kong. - Flickr - Bernard Spragg.jpg', 'Bernard Spragg. NZ', 'Public domain'),
  ],
  'mid-levels-escalator': [
    commonsImage('hk-mid-levels-escalator-1.webp', 'File:Central-Mid-Levels escalators - Hong Kong (16968991972).jpg', 'Robin Hickmott', 'CC BY-SA 2.0'),
    commonsImage('hk-mid-levels-escalator-2.webp', 'File:HK Central 嵐舒 LUSH Fresh Handmade Cosmetics Asia Hong Kong 21 Lyndhurst Terrace Central-Mid-Levels escalators interior Jan-2016 DSC.JPG', 'Tpechncoam', 'CC BY-SA 4.0'),
  ],
  'wong-tai-sin-temple': [
    commonsImage('hk-wong-tai-sin-temple-1.webp', 'File:Hong Kong China Wong-Tai-Sin-Temple-01.jpg', 'CEphoto, Uwe Aranas', 'CC BY-SA 3.0'),
    commonsImage('hk-wong-tai-sin-temple-2.webp', 'File:Wong Tai Sin Temple, Hong Kong 01.jpg', 'Underwaterbuffalo', 'CC BY-SA 4.0'),
  ],
  'repulse-bay': [
    commonsImage('hk-repulse-bay-1.webp', 'File:Repulse Bay palm trees.jpg', 'Enochlau', 'CC BY-SA 3.0'),
    commonsImage('hk-repulse-bay-2.webp', 'File:Repulse Bay, Hong Kong, from east.jpg', 'Daniel Case', 'CC BY-SA 3.0'),
  ],
  'west-kowloon': [
    commonsImage('hk-west-kowloon-1.webp', 'File:West Kowloon Cultural District 201801.jpg', 'Baycrest', 'CC BY-SA 2.5'),
    commonsImage('hk-west-kowloon-2.webp', 'File:HK YTM Kln West 西九龍文化區 WKCD West Kowloon Cultural District HKPM Hong Kong Palace Museum March 2023 Px3.jpg', 'Choihpmyouk 688', 'CC BY-SA 4.0'),
  ],
  'tian-tan-buddha': [
    commonsImage('hk-tian-tan-buddha-1.webp', 'File:Tian Tan Buddha by Beria.jpg', 'Béria Lima de Rodríguez', 'CC BY-SA 3.0'),
    commonsImage('hk-tian-tan-buddha-2.webp', 'File:Costa de la Isla Lantau, Hong Kong, 2013-08-13, DD 01.jpg', 'Diego Delso', 'CC BY-SA 3.0'),
  ],
  'tai-o': [
    commonsImage('hk-tai-o-1.webp', 'File:Fishing village near Hong Kong China.jpg', 'Yourusernamewillbepublic2', 'CC0'),
    commonsImage('hk-tai-o-2.webp', 'File:Fishing village near Hong Kong China.jpg', 'Yourusernamewillbepublic2（同图不同裁切）', 'CC0'),
  ],
  'dragons-back': [
    commonsImage('hk-dragons-back-1.webp', "File:Dragon's Back - Trail Start, Hong Kong (Unsplash).jpg", 'Julia Caesar', 'CC0'),
    commonsImage('hk-dragons-back-2.webp', "File:Dragon's Back - Trail Start, Hong Kong (Unsplash).jpg", 'Julia Caesar（同图不同裁切）', 'CC0'),
  ],
  'sai-kung-geopark': [
    commonsImage('hk-sai-kung-geopark-1.webp', 'File:香港世界地质公园 - Hong Kong Global Geopark - 2015.01 - panoramio.jpg', 'rheins', 'CC BY 3.0'),
    commonsImage('hk-sai-kung-geopark-2.webp', 'File:香港世界地质公园 - Hong Kong Global Geopark - 2015.01 - panoramio.jpg', 'rheins（同图不同裁切）', 'CC BY 3.0'),
  ],
  'cheung-chau': [
    commonsImage('hk-cheung-chau-1.webp', 'File:Blick über Cheung Chau.JPG', 'Man77', 'CC BY-SA 3.0'),
    commonsImage('hk-cheung-chau-2.webp', 'File:Windsurfing sport sculpture, Cheung Chau (Hong Kong).jpg', 'Mk2010', 'CC BY-SA 3.0'),
  ],
  'temple-street': [
    commonsImage('hk-temple-street-1.webp', 'File:Mercado en Temple St., Hong Kong, 2013-08-11, DD 01.JPG', 'Diego Delso', 'CC BY-SA 3.0'),
    commonsImage('hk-temple-street-2.webp', 'File:Mercado en Temple St., Hong Kong, 2013-08-11, DD 02.JPG', 'Diego Delso', 'CC BY-SA 3.0'),
  ],
  'nan-lian-garden': [
    commonsImage('hk-nan-lian-garden-1.webp', 'File:Nan Lian Garden panorama 2013-03-29 (8602303024).jpg', 'See-ming Lee', 'CC BY 2.0'),
    commonsImage('hk-nan-lian-garden-2.webp', 'File:Nan Lian Garden panorama 2013-03-29 (8602303024).jpg', 'See-ming Lee（同图不同裁切）', 'CC BY 2.0'),
  ],
};

export const hongKongSpots = [
  {
    id: 'hong-kong-peak', name: '太平山顶', region: 'hong-kong-island', locale: '香港岛·山顶',
    themes: ['mountain', 'cityscape'], season: '10月–次年4月', duration: '半天', altitude: '约552m',
    coordinate: [114.1431, 22.2759], roads: ['MTR-ISLAND', 'PEAK-TRAM'], accessNote: '中环转山顶缆车或巴士，步行卢吉道环线',
    blurb: '从城市最高处读懂维港两岸的天际线、密集街区与山海关系，黄昏到入夜是层次最丰富的时段。',
    tip: '缆车高峰排队较长；云雾天能见度变化快，先看实时天气和山顶摄像画面。', images: hongKongImages['hong-kong-peak'],
  },
  {
    id: 'victoria-harbour', name: '维多利亚港', region: 'hong-kong-kowloon', locale: '尖沙咀·海滨',
    themes: ['harbour', 'cityscape'], season: '全年 · 秋冬更清朗', duration: '2–4小时', altitude: '海平面',
    coordinate: [114.173, 22.2934], roads: ['MTR-TSUEN-WAN', 'HK-FERRY'], accessNote: '港铁尖东 / 尖沙咀站，或乘天星小轮抵达',
    blurb: '香港最具辨识度的城市轴线，适合沿尖沙咀海滨串联钟楼、文化中心、星光大道和夜景。',
    tip: '海边风大且遮阴少；灯光演出与大型活动安排可能调整，以当日官方公告为准。', images: hongKongImages['victoria-harbour'],
  },
  {
    id: 'avenue-of-stars', name: '星光大道', region: 'hong-kong-kowloon', locale: '尖沙咀·海滨',
    themes: ['heritage', 'cityscape', 'harbour'], season: '全年', duration: '1–2小时', altitude: '海平面',
    coordinate: [114.1757, 22.2931], roads: ['MTR-EAST-RAIL', 'MTR-TSUEN-WAN'], accessNote: '港铁尖东站 J 出口步行，海滨长廊全程无障碍较友好',
    blurb: '以香港电影文化为线索的海滨步道，一边是电影手印与雕像，一边是维港和港岛天际线。',
    tip: '日落前后人流集中，想安静散步可安排清晨；夏季注意暴晒和骤雨。', images: hongKongImages['avenue-of-stars'],
  },
  {
    id: 'star-ferry', name: '天星小轮', region: 'hong-kong-island', locale: '中环—尖沙咀',
    themes: ['heritage', 'harbour'], season: '全年', duration: '30分钟–1小时', altitude: '海平面',
    coordinate: [114.1602, 22.2877], roads: ['HK-FERRY', 'MTR-ISLAND'], accessNote: '中环 7 号码头或尖沙咀天星码头上船',
    blurb: '用最短的一段航程横渡维港，在甲板上获得低视角的城市天际线，也是两岸行程间最有旅行感的连接。',
    tip: '班次、尾班船和恶劣天气安排会变化；可优先选择上层靠窗或开放位置。', images: hongKongImages['star-ferry'],
  },
  {
    id: 'mid-levels-escalator', name: '中环至半山自动扶梯', region: 'hong-kong-island', locale: '中环·苏豪',
    themes: ['cityscape', 'heritage'], season: '全年', duration: '1–3小时', altitude: '约5–135m',
    coordinate: [114.1536, 22.2824], roads: ['MTR-ISLAND'], accessNote: '港铁中环或香港站步行，沿扶梯串联街市、苏豪与半山',
    blurb: '把陡坡城市切成多个可停留的街区切片，适合观察街市、旧楼、餐馆与中环日常生活。',
    tip: '扶梯分时段单向运行，回程常需走楼梯和斜坡；穿防滑、适合步行的鞋。', images: hongKongImages['mid-levels-escalator'],
  },
  {
    id: 'wong-tai-sin-temple', name: '黄大仙祠', region: 'hong-kong-kowloon', locale: '九龙·黄大仙',
    themes: ['temple', 'heritage'], season: '全年', duration: '1–2小时', altitude: '约35m',
    coordinate: [114.1933, 22.3427], roads: ['MTR-KWUN-TONG'], accessNote: '港铁黄大仙站 B2 / B3 出口步行',
    blurb: '融合道教信俗、传统殿宇和园林空间的城市庙宇，是理解香港民间信仰和社区生活的代表地点。',
    tip: '节庆和农历初一十五客流很大；保持安静，拍摄仪式或人物前先征得同意。', images: hongKongImages['wong-tai-sin-temple'],
  },
  {
    id: 'repulse-bay', name: '浅水湾', region: 'hong-kong-island', locale: '香港岛·南区',
    themes: ['coast', 'harbour'], season: '10月–次年5月', duration: '半天', altitude: '海平面',
    coordinate: [114.195, 22.2386], roads: ['ISLAND-SOUTH-BUS'], accessNote: '中环、金钟或海洋公园站转巴士，周末预留候车时间',
    blurb: '弧形沙滩、南区山坡和殖民时期海湾景观共同构成香港岛最经典的海滨休闲目的地。',
    tip: '泳季留意救生服务、红旗和水质公告；台风或大浪天气不要靠近岸边设施。', images: hongKongImages['repulse-bay'],
  },
  {
    id: 'west-kowloon', name: '西九文化区', region: 'hong-kong-kowloon', locale: '西九龙·博物馆道',
    themes: ['cityscape', 'heritage', 'garden'], season: '全年', duration: '半天–1天', altitude: '海平面',
    coordinate: [114.1568, 22.3004], roads: ['MTR-TUNG-CHUNG', 'XRL-HK'], accessNote: '九龙站或香港西九龙站步行，区内场馆距离较长',
    blurb: '把 M+、香港故宫文化博物馆、艺术公园和海滨草地连成一片，是室内展览与户外日落兼顾的文化区域。',
    tip: '先查展馆休馆日与预约场次；多个场馆同日参观强度较高，至少留半天空档。', images: hongKongImages['west-kowloon'],
  },
  {
    id: 'tian-tan-buddha', name: '天坛大佛与昂坪', region: 'hong-kong-islands', locale: '大屿山·昂坪',
    themes: ['temple', 'mountain'], season: '10月–次年4月', duration: '半天–1天', altitude: '约480m',
    coordinate: [113.9041, 22.254,], roads: ['MTR-TUNG-CHUNG', 'NGONG-PING'], accessNote: '东涌站转昂坪 360、巴士或大屿山交通',
    blurb: '大佛、宝莲禅寺、山地步道与大屿山海岸共同组成香港最完整的山寺旅行单元。',
    tip: '缆车受大风和检修影响可能暂停；台阶较多，炎热天气安排早出并补水。', images: hongKongImages['tian-tan-buddha'],
  },
  {
    id: 'tai-o', name: '大澳渔村', region: 'hong-kong-islands', locale: '大屿山·大澳',
    themes: ['heritage', 'coast'], season: '10月–次年4月', duration: '半天', altitude: '海平面',
    coordinate: [113.8624, 22.2537], roads: ['LANTAU-BUS'], accessNote: '东涌或梅窝转大屿山巴士，也可与昂坪同日串联',
    blurb: '棚屋、水道、街市和咸鱼虾酱构成仍在生活中的水乡聚落，节奏与港九城区截然不同。',
    tip: '尊重棚屋居民隐私，不把私人通道当作拍照机位；游船活动先看天气与运营资质。', images: hongKongImages['tai-o'],
  },
  {
    id: 'dragons-back', name: '龙脊', region: 'hong-kong-island', locale: '香港岛·石澳郊野',
    themes: ['mountain', 'trail', 'coast'], season: '10月–次年3月', duration: '3–5小时', altitude: '最高约284m',
    coordinate: [114.2418, 22.2268], roads: ['ISLAND-SOUTH-BUS'], accessNote: '筲箕湾站转 9 号巴士至土地湾起点',
    blurb: '沿开阔山脊俯瞰石澳、大浪湾和南海，在短距离内兼具城市可达性、山径和海岸视野。',
    tip: '山脊遮阴少且无补给，避开雷暴、酷热和强风；穿有抓地力的鞋并带足饮水。', images: hongKongImages['dragons-back'],
  },
  {
    id: 'sai-kung-geopark', name: '西贡地质公园', region: 'hong-kong-new-territories', locale: '新界·西贡',
    themes: ['landform', 'coast', 'trail'], season: '10月–次年4月', duration: '1天', altitude: '海岸至约200m',
    coordinate: [114.365, 22.356], roads: ['SAI-KUNG-BUS'], accessNote: '钻石山 / 彩虹转巴士至西贡，再按路线换乘的士、船或徒步',
    blurb: '六角岩柱、海蚀地貌、水库与离岛组成香港最具地质辨识度的户外区域，路线跨度很大。',
    tip: '部分海岸点位无手机信号和补给，船班受风浪影响；不要攀爬松动岩壁或越过护栏。', images: hongKongImages['sai-kung-geopark'],
  },
  {
    id: 'cheung-chau', name: '长洲', region: 'hong-kong-islands', locale: '离岛·长洲',
    themes: ['coast', 'heritage', 'trail'], season: '10月–次年5月', duration: '1天', altitude: '海平面至约95m',
    coordinate: [114.0284, 22.2093], roads: ['HK-FERRY-ISLANDS'], accessNote: '中环 5 号码头乘普通船或高速船',
    blurb: '无汽车小岛把码头街市、海滩、庙宇和环岛步道压缩在适合步行与骑行的一天里。',
    tip: '周末和节庆船票、人流压力明显；骑行进入狭窄街巷时减速礼让行人。', images: hongKongImages['cheung-chau'],
  },
  {
    id: 'temple-street', name: '庙街夜市', region: 'hong-kong-kowloon', locale: '油麻地·佐敦',
    themes: ['market', 'heritage', 'cityscape'], season: '全年 · 傍晚后', duration: '1–2小时', altitude: '约10m',
    coordinate: [114.1696, 22.3062], roads: ['MTR-TSUEN-WAN'], accessNote: '佐敦站 A 出口或油麻地站 C 出口步行',
    blurb: '摊档、排档、霓虹与榕树头共同构成九龙夜间街道经验，适合与油麻地旧区步行串联。',
    tip: '摊位和表演并非每天完全一致；在人流密集处留意随身物品，拍摄摊主前先询问。', images: hongKongImages['temple-street'],
  },
  {
    id: 'nan-lian-garden', name: '南莲园池与志莲净苑', region: 'hong-kong-kowloon', locale: '九龙·钻石山',
    themes: ['garden', 'temple', 'heritage'], season: '全年', duration: '2–3小时', altitude: '约35m',
    coordinate: [114.2038, 22.3396], roads: ['MTR-KWUN-TONG', 'MTR-TUEN-MA'], accessNote: '钻石山站 C2 出口步行',
    blurb: '唐式园林、木构寺院和城市高楼形成强烈对照，是雨天或炎热午后也适合慢游的安静空间。',
    tip: '宗教空间和展陈区域可能限制摄影；保持低声并遵守现场动线和开放安排。', images: hongKongImages['nan-lian-garden'],
  },
];

export const hongKongMapSpots = hongKongSpots.map((spot, spotIndex) => ({
  id: spot.id,
  name: spot.name,
  index: 81 + spotIndex,
  province: 'hongkong',
  region: spot.region,
  locale: spot.locale,
  coordinate: spot.coordinate,
  roads: spot.roads,
  accessNote: spot.accessNote,
}));
