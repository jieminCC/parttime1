  //  地图配置文件
 var MapConfig = {
    //电子地图地址
    mapServer: 'http://172.26.156.113:6080/arcgis/rest/services/XT/XTXZQH/MapServer',
    // arcgis/rest/services/XT/XTXZQH/MapServer?f=jsapi
    //影像图地址
    imgServer: 'http://dev.chinadci.com:38080/arcgis/rest/services/ZW/DOM_2019/MapServer',
    //行政区划
    polygonServer: 'http://http://dev.chinadci.com:38080/arcgis/rest/services/ZW/TDZY_TDBGDC_TDLYXZ/MapServer',
    //红线范围
    XMHX: 'http://172.26.156.113:6080/arcgis/rest/services/XT/ZTYWHX/MapServer/0',
    //边界范围
    bounds: [
      [302608.5016, 3025907.8937],
      [410037.4842, 3107594.4261]
    ],
    //起点(原点坐标)
    origin: [-5123200.0, 10002100],
    //中心点范围
    // center: [394426.7425, 3091756.3422],
    center: [3016745.6644, 361317.4423],
    // 地图图层信息，for配置坐标系信息
    lods: [{
        "level": 0,
        "resolution": 152.874174498349,
        "scale": 16000
      }, {
        "level": 1,
        "resolution": 76.43695495724326,
        "scale": 8000
      }, {
        "level": 2,
        "resolution": 38.218609770552874,
        "scale": 4000
      }, {
        "level": 3,
        "resolution": 19.109304885276437,
        "scale": 2000
      }, {
        "level": 4,
        "resolution": 9.554652442638218,
        "scale": 1000
      },
      {
        "level": 5,
        "resolution": 4.777326221319109,
        "scale": 18056
      },
      {
        "level": 6,
        "resolution": 2.3886631106595546,
        "scale": 9028
      },
      {
        "level": 7,
        "resolution": 1.1943315553297773,
        "scale": 4514
      },
      {
        "level": 8,
        "resolution": 0.5971657776648887,
        "scale": 2257
      },
      {
        "level": 9,
        "resolution": 0.29871518076369485,
        "scale": 1129
      },
      {
        "level": 10,
        "resolution": 0.1492252984505969,
        "scale": 564
      }
    ]
  }