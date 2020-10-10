/* eslint-disable no-debugger */
<template>
  <div class="layer">
    <div class="title">图层叠加</div>
    <van-button round class="removeAll" icon="replay" @click="removeAll">全部清除</van-button>
    <van-search v-model="layerName" placeholder="搜索图层" shape="round" @input="searchValue(layerName)" />
    <div class="layer-tree">
      <van-collapse v-model="activeNames">
        <van-collapse-item :title="item.title" :name="item.title" v-for="(item,index) in layerTreeData" :key="index">
          <ul>
            <li v-for="(value,i) in item.resourceAndLayers[0].layerinfos" :key="i" v-show="(value.isshow==undefined || value.isshow==true) && value.type===0">
              <span class="icon iconfont icon-overlay layer-icon"></span>
              <span class="layername">{{value.layername}}</span>
              <van-switch v-model="checked[index+'-'+i]" class="switch" @click="switchBtn(value,item.resourceAndLayers[0].resourceByTree.url,index,checked[index+'-'+i])" />
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>

    </div>
  </div>
</template>
<script>
import mapApi from '@/api/map'
export default {
  name: '',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  props: [],
  data() {
    return {
      layerName: '',
      activeNames: [],
      checked: {},
      layerTreeData: [
        //{ opacity:100, resourceid: 2662,resourcename: "生态保护红线",areacode: "442000",resourcetypeid: 1,iscachelayer: 1,url: "http://dev.chinadci.com:38080/arcgis/rest/services/ZW/GGZW_STHJ_STBHHX/MapServer",useMapproxy: 1 },
        //{opacity:100,resourceid: 2673,resourcename: "土地利用现状",areacode: "442000",resourcetypeid: 1,iscachelayer: 1,url: "http://dev.chinadci.com:38080/arcgis/rest/services/ZW/TDZY_TDBGDC_TDLYXZ/MapServer",useMapproxy: 1}
      ]
    }
  },
  computed: { 
    items: {
      get() {
        return this.$store.state.layerData.layerData
      },
      set(val) {
        this.$store.commit('layerData/setLayerData', val)
      }
    },
    syskey() {
      return this.$store.state.layerData.syskey
    }
  },
  watch: {
    items(val) {
      if (val.length === 0) {
        for (let key in this.checked) {
          this.$set(this.checked, key, false)
        }
      }
    }
  },
  created() { },
  mounted() {
    this.getData()
  },
  methods: {
    switchBtn(value, src, index, flag) {
      if (flag) {
        //取消选中
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i]['layerid'] === value.layerid) {
            this.items.splice(i, 1)
            i = this.items.length
          }
        }
      } else {
        //选中
        this.$set(value, 'url', src)
        this.$set(value, 'opacity', 100)
        this.items.push(value)
      }
    },
    searchValue(value) {
      this.activeNames.splice(0)
      if (value !== '') {
        for (let i = 0; i < this.layerTreeData.length; i++) {
          let obj = this.layerTreeData[i].resourceAndLayers[0].layerinfos
          let resourcename = this.layerTreeData[i].resourceAndLayers[0].resourceByTree.resourcename
          for (let j = 0; j < obj.length; j++) {
            if (obj[j].layername.indexOf(value) !== -1) {
              this.activeNames.push(resourcename)
              this.$set(obj[j], 'isshow', true)
            } else {
              this.$set(obj[j], 'isshow', false)
            }
          }

        }
      } else {
        for (let i = 0; i < this.layerTreeData.length; i++) {
          let obj = this.layerTreeData[i].resourceAndLayers[0].layerinfos
          for (let j = 0; j < obj.length; j++) {
            this.$set(obj[j], 'isshow', true)
          }

        }
      }

    },
    getData() {
      // eslint-disable-next-line no-debugger
      //转化树结构
      mapApi.getlayerData(this.syskey).then(res => {
        console.log(res)
        if (res.ReturnCode === 0) {
          let data = res.Data
          for (let i = 0; i < data.length; i++) {
            if (data[i].resourceAndLayers.length > 0) {
              this.layerTreeData.push(data[i])
            }
          }
          this.activeNames.push(this.layerTreeData[0].title)
          console.log(this.layerTreeData)
        }
      })
    },
    //处理数据为树结构
    removeAll() {
      this.items.splice(0)
    }
  }
}
</script>
<style lang="scss" scoped>
.layer {
  text-align: left;
  position: relative;
  .title {
    font-size: 35px;
    color: #060606;
    font-weight: 500;
    margin-top: 83px;
    margin-left: 41px;
    margin-bottom: 35px;
  }
  .layer-icon{
    font-size:33px;
    margin-right:19px;
    vertical-align: top;
  }
  .layername{
    width:70%;
    display:inline-block;
    overflow: hidden;
    white-space: normal;
    word-break:break-all;
  }
  /deep/{
    .van-collapse-item__content{
      padding-right:0;
    }
    .van-switch{
      background: #F0F0F0;
    }
    .van-switch--on{
      background-color: #1989fa;
    }
  }
  .removeAll {
    width: 181px;
    height: 51px;
    position: absolute;
    top: 0;
    right: 24px;
    font-size: 28px;
    color: #373737;
    line-height: 48px;
    padding: 0;
    /deep/ {
      span {
        margin-left: 0;
      }
    }
  }
  .layer-tree {
    margin-top: 33px;
    .title-layer {
      height: 74px;
      background: #f8f8f8;
      padding-top: 15px;
      padding-left: 26px;
      font-size: 32px;
      color: #373737;
      position: relative;
      /deep/ {
        i {
          position: absolute;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    li {
      position: relative;
      margin-bottom: 51px;
    }
    /deep/ {
      .switch {
        width: 73px;
        height: 39px;
        position: absolute;
        right: 33px;
        top: 50%;
        transform: translateY(-50%);
        .van-switch__node {
          width: 35px;
          height: 36px;
        }
      }
      &.van-switch--on {
        .van-switch__node {
          transform: translateX(35px);
        }
      }
    }
  }
}
</style>
