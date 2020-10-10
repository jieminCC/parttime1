import * as L from 'leaflet'
const crs = {
  methods: {
    getCrs() {
      L.CommonProj = L.extend({}, L.Projection.LonLat, {
        bounds: new L.Bounds(window.MapConfig.bounds[0], window.MapConfig.bounds[1])
      })
      var origin = window.MapConfig.origin;
      var resolutions = [];
      var lods = window.MapConfig.lods
      for (var i in lods) {
        resolutions.push(lods[i].resolution);
      }
      L.CRS.CommonCRS = L.extend({}, L.CRS, {
        wrapLng: origin,
        scale: function (zoom) {
          return 1 / resolutions[zoom];
        },
        zoom: function (scale) {
          for (let index = 0; index < resolutions.length; index++) {
            if (scale < resolutions[index] && scale > resolutions[index + 1]) {
              return index + 1
            } else if (scale > resolutions[0]) {
              return 0
            } else if (scale < resolutions[resolutions.length - 1]) {
              return resolutions.length - 1
            }
          }
        },
        transformation: L.transformation(1, -origin[0], -1, origin[1]),
        projection: L.CommonProj,
        code: 'EPSG:4547'
      })
      return L.CRS.CommonCRS
    }
  },

}
export default crs