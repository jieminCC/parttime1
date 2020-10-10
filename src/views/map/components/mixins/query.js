/* eslint-disable no-unexpected-multiline */
import * as L from 'leaflet'
import * as esri from 'esri-leaflet/dist/esri-leaflet-debug'
import * as turf from 'turf'
const query = {
  data() {
    return {
      queryData: {},
      queryDataPloygon: [],
      geoJsonArray: [],
      rectangle: undefined,
      tmprec: undefined,
      latlngs: [],
      YWFW: {},
      center: [],
    }
  },
  computed: {
    layerData() {
      return this.$store.state.layerData.layerData
    }
  },
  methods: {
    //
    pointQuery() {
      this.$store.commit('layerData/clearQueryData', [])
      if (this.layerData.length === 0) {
        return
      }
      let _this = this
      this.map.addEventListener('click', function (evt) {
        _this.$store.commit('layerData/clearQueryData', [])
        _this.removeGeoJSON()
        _this.queryDataPloygon.splice(0)
        _this.geoJsonArray = []
        const params = {
          url: window.MapConfig.queryXMHX,
          sindex: 0
        }
        this.layerData.push(params)
        for (let i = 0; i < _this.layerData.length; i++) {
          let item = _this.layerData[i]
          let url = item.url
          let index = item.sindex
          let layername = item.layername
          let geometry = [evt.latlng.lat, evt.latlng.lng]
          _this.query(geometry, url, index, layername, i)
        }
      })
    },
    polygonQuery() {
      this.map.on('click', this.polygonClick)
    },
    polygonClick(e) {
      if (this.latlngs.length === 2) {
        this.$store.commit('layerData/clearQueryData', [])
        if (typeof this.rectangle !== 'undefined') {
          this.rectangle.remove()
        }
        this.map.off('mousemove')
        this.tmprect.remove()
        this.rectangle = L.rectangle(this.latlngs).addTo(this.map)
        this.latlngs = []
        this.removeGeoJSON()
        this.queryDataPloygon = []
        this.geoJsonArray = []
        const params = {
          url: window.MapConfig.queryXMHX,
          sindex: 0
        }
        this.layerData.push(params)
        this.layerData.forEach((item, i) => {
          let url = item.url
          let index = item.sindex
          let geometry = this.rectangle
          let layername = item.layername
          this.query(geometry, url, index, layername, i)
        })
      } else if (this.latlngs.length === 0) {
        this.map.on('mousemove', this.onMove)
        this.latlngs.push([e.latlng.lat, e.latlng.lng])
      }
      //开始绘制，监听鼠标移动事件

    },
    onMove(e) {
      if (this.latlngs.length === 1) {
        this.latlngs.push([e.latlng.lat, e.latlng.lng])
      } else {
        this.latlngs[1] = [e.latlng.lat, e.latlng.lng]
      }
      //删除临时矩形
      if (typeof this.tmprect !== 'undefined') {
        this.tmprect.remove()
      }
      //添加临时矩形
      this.tmprect = L.rectangle(this.latlngs, {
        dashArray: 5
      }).addTo(this.map)
    },
    query(geometry, url, index, layername, i) {
      // this.$store.commit('layerData/setQueryData', [])
      let _this = this
      esri.identifyFeatures({
          url: url
        })
        .on(_this.map)
        .at(geometry)
        .layers('all:' + index)
        .run((error, featureCollection) => {
          featureCollection.layername = layername
          _this.$store.commit('layerData/setQueryData', featureCollection)
          _this.queryDataPloygon.push(featureCollection)
          _this.drawPolygon()
          if (i === _this.layerData.length - 1) {
            this.$toast.success({
              message: '信息查询完毕',
              duration: 1000
            });
          }
        })

    },
    //因为这次APP就一个绘制 所以把绘制直接仍这里了，后续会提取出来
    drawPolygon() {
      if (typeof this.rectangle !== 'undefined') {
        this.rectangle.remove()
      }
      let _this = this
      this.queryDataPloygon.forEach(element => {
        let geoJSON = L.geoJSON(element)
        _this.geoJsonArray.push(geoJSON)
        _this.addGeoJSON()
      })
    },
    addGeoJSON() {
      let _this = this
      this.geoJsonArray.forEach(item => {
        _this.map.addLayer(item)
      })
    },
    removeQueryEvent() {
      this.map.off('click');
      this.$store.commit('layerData/clearQueryData', [])
      this.removeGeoJSON()
      this.queryDataPloygon.splice(0)
      this.geoJsonArray = []
    },
    removeGeoJSON() {
      this.map.eachLayer((layer) => {
        this.geoJsonArray.forEach(item => {
          if (layer._leaflet_id === item._leaflet_id) {
            layer.remove()
          }
        })
      })
      if (this.YWFW !== {}) {
        this.map.addLayer(this.YWFW)
      }
    },
    queryBimid(id) {
      if (!id) {
        return
      }
      let query = esri.query({
        url: window.MapConfig.XMHX
      })
      let queryParams = 'YWBH =' + "'" + id + "'"
      query.where(queryParams).run((error, latLngBounds) => {
        if (latLngBounds.features.length === 0) {
          return
        }
        let features = latLngBounds
        let center = turf.center(features);
        this.center = center.geometry.coordinates
        this.map.setView([this.center[1], this.center[0]], 3)
        let geojson = L.geoJSON(latLngBounds)
        this.YWFW = geojson
        if (this.YWFW !== {}) {
          this.map.addLayer(this.YWFW)
        }
      })
    },
  },
}
export default query