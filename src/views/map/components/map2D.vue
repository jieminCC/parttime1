<template>
  <div id="map"></div>
</template>

<script>
import * as L from 'leaflet'
import "leaflet/dist/leaflet.css";
import query from './mixins/query'
import crs from './mixins/crs'
import layerControl from './mixins/layerControl'
export default {
  mixins: [query, crs, layerControl],
  data() {
    return {
      map: {},
    }
  },
  props: ['selectPoint', 'position', 'bimid'],
  mounted() {
    this.initMap()
    this.addBaseLayer(this.mapServer)
    this.queryBimid(this.bimid)
  },
  watch: {
    selectPoint(val) {
      console.log(val)
      this.removeQueryEvent()
      if (val === '点选') {
        this.pointQuery()
      } else if (val === '框选') {
        this.polygonQuery()
      }
    },
    position(val) {
      if (val === '全域') {
        this.map.setView(window.MapConfig.center, 0)
      } else if (val === '业务范围') {
        //leaflet 坐标是反着的
        this.map.setView([this.center[1], this.center[0]], 3)
        //后续会替换
      }
    }
  },
  methods: {
    initMap() {
      var border = window.MapConfig.bounds
      var corner1 = L.latLng(border[1][1], border[0][0]) //设置左上角经纬度
      var corner2 = L.latLng(border[0][1], border[1][0])	//设置右下点经纬度
      var bounds = L.latLngBounds(corner1, corner2); //限制拖拽范围
      this.map = L.map('map', {
        crs: this.getCrs(),
        minZoom: 0,
        maxZoom: 5,
        center: window.MapConfig.center,
        zoom: 0,
        touchZoom: true,
        attributionControl: false,
        // scrollWheelZoom: false
        maxBounds: bounds
      })
    },


  }
}
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100%;
}
</style>
