// import * as L from 'leaflet'
import * as esri from 'esri-leaflet/dist/esri-leaflet-debug'

const layerControl = {
  data() {
    return {
      mapServer: window.MapConfig.mapServer,
      imgServer: window.MapConfig.imgServer,
      layerArr: {},
      dynamicLayers: []
    }
  },
  computed: {
    mapStatus() {
      return this.$store.state.mapStatus.mapTypeStatus
    },
    layerOpacity() {
      return this.$store.state.mapStatus.opacity
    },

    layerData() {
      return this.$store.state.layerData.layerData
    }
  },
  watch: {
    mapStatus(val) {
      if (val === 0) {
        this.addBaseLayer(this.mapServer)
      } else if (val === 1) {
        this.addBaseLayer(this.imgServer)
      } else if (val === 2) {
        // this.addBaseLayer(this.polygonServer)
      }
    },
    layerOpacity: {
      immediate: true,
      handler(val) {
        this.setLayerOpactiy(val)
      },
      deep: true,
    },
    layerData(val) {
      this.addDynamicLayer(val)
    }
  },
  methods: {
    //添加/切换地图方法
    addBaseLayer(layerUrl) {
      if (this.layerArr != {}) {
        this.map.removeLayer(this.layerArr)
      }
      // var layer = L.tileLayer(layerUrl,{
      //   minZoom: 0,
      //   maxZoom: 5,
      // })
      var layer = esri.tiledMapLayer({
        url: layerUrl,
        minZoom: 0,
        maxZoom: 5,
      })
      this.layerArr = layer
      this.map.addLayer(layer)
    },
    //添加动态图层方法
    addDynamicLayer(layers) {
      console.log(layers)
      this.dynamicLayers = []
      this.removeAllDynamicLayer()
      let _this = this
      layers.forEach((element, index) => {
        let layer = esri.dynamicMapLayer({
          zIndex: index,
          url: element.url,
          f: 'json',
          layers: [element.sindex],
          useCors: false
        })
        _this.map.addLayer(layer, index)
        this.dynamicLayers.push(layer)
      });
      //this.removeLayer
    },
    //移除所有动态图层
    removeAllDynamicLayer() {
      this.map.eachLayer((layer) => {
        if (layer.tileUrl !== this.layerArr.tileUrl) {
          layer.remove()
        }
      })
      if (this.YWFW !== {}) {
        this.map.addLayer(this.YWFW)
      }
    },
    //设置透明度
    setLayerOpactiy(val) {
      const layerData = val;
      this.dynamicLayers.forEach(item => {
        if (item.options.url === layerData.url) {
          if (item.options.layers[0] === layerData.sindex) {
            item.setOpacity(parseFloat(layerData.opacity / 100))
          }
        }
      })
    },
  },
}

export default layerControl