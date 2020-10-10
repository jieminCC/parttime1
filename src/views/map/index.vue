<template>
  <div>
    <div class="map">
      <map2D :selectPoint='selectPoint' :position='position' :bimid='bimid'></map2D>
    </div>
    <div class="btns">
      <!-- 第一个图标 -->
      <div>
        <i class="icon iconfont icon-dituyangshi" @click="showList(0)" :class='{active:isShowList[0]===true}'></i>
        <span class="square" v-show="isShowList[0]===true"></span>
        <div class="list" v-show="isShowList[0]===true">
          <div v-for="(value,index) in mapType" :key="index" class="map-type" @click="replaceMapType(value)">
            <img :src=value.src alt="" :class="{active:value.key===typeName}">
            <b class="icon iconfont icon-dagou_huaban1" v-show="value.key===typeName"></b>
            {{value.name}}
          </div>
        </div>
      </div>

      <!-- 第二个图标 -->
      <div>
        <i class="icon iconfont icon-tucengdiejia" @click="showList(1)" :class='{active:isShowList[1]===true}'></i>
        <van-popup v-model="isShowList[1]" position="right" :style="{ height: '100%' ,width:'80%'}">
          <layer />
        </van-popup>
      </div>

      <!-- 第三个图标 -->
      <div>
        <i class="icon iconfont icon-kuangxuan" @click="showList(2)" :class='{active:isShowList[2]===true}'></i>
        <span class="square" v-show="isShowList[2]===true"></span>
        <div class="list list_1 " v-show="isShowList[2]===true">
          <div class="layer-height" v-for="(item,itemIndex) in ['点选','框选']" :key="itemIndex" @click="onChangeLayerClick(item,itemIndex)" :class="{active:selectPoint===item}">
            <span>{{item}}</span>
          </div>
        </div>

        <span class="line" v-show="isShowList[2]===true"></span>
        <div class="reset" v-show="isShowList[2]===true" @click="reset">
          <i class="icon iconfont icon-qingchukuangxuan"></i>
        </div>

      </div>

      <!-- 第四个图标 -->
      <div :class='{icon_3:isShowList[2]===true}'>
        <i class="icon iconfont icon-dingwei1" @click="showList(3)" :class='{active:isShowList[3]===true}'></i>
        <span class="square" v-show="isShowList[3]===true"></span>
        <div class="list list_1 list_2" v-show="isShowList[3]===true">
          <div class="layer-height" v-for="(item,itemIndex) in ['全域','业务范围']" :key="itemIndex" @click="onChangePositionClick(item,itemIndex)" :class="{active:position===item}">
            <span>{{item}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 图层调整按钮 -->
    <div class="adjust-div" v-show="items.length>0 && !isShowList[1]">
      <span class="icon iconfont icon-jiantou1 my-icon"></span>
      <van-button round class="adjust" icon="" :class="{activeName:activeName===1}">
        <span @click.stop="activeName=0,showAdjust=true" :style='{width:activeName!==1?"100%":"50%"}'>
          <i class="icon iconfont icon-tiaozhengtuceng"></i>图层调整</span>
        <span @click.stop="activeName=1,showAdjust=true" v-show="activeName===1" :style="{width:'50%'}">
          <i class="icon iconfont icon-shuxingxinxi attrbute "></i>属性信息</span>
      </van-button>
    </div>

    <!-- 图层调整详细界面 -->
    <Adjust v-show="showAdjust" @setShowAdjust="setShowAdjust" :activeName="activeName" />

  </div>
</template>
<script>
import layer from './Layer'
import Adjust from './Adjust'
import map2D from './components/map2D'
export default {
  name: '',
  components: { layer, Adjust, map2D },
  directives: {},
  filters: {},
  mixins: [],
  props: [],
  data() {
    return {
      mapType: [{ name: '电子地图', src: require('./images/map.png'), key: 0, }, { name: '影像图', src: require('./images/image.png'), key: 1 }, { name: '行政区划', src: require('./images/area.png'), key: 2 }],
      isShowList: [false, false, false, false],
      showAdjust: false,
      typeName: '',
      selectPoint: '',
      position: '',
      activeName: 0
    }
  },
  computed: {
    items() {
      return this.$store.state.layerData.layerData
    },
    bimid() {
      return this.$store.state.layerData.bimid
    }

  },
  watch: {
  },
  created() { },
  mounted() {
  },
  methods: {
    showList(index) {
      let flag = this.isShowList[index]
      this.isShowList.splice(0)
      this.isShowList[index] = !flag
      if (index === 2 && flag) {
        this.selectPoint = ''
      }
      if (index === 3) {
        this.selectPoint = ''
      }
      if (index === 3 && flag) {

        this.position = ''
      }
    },
    replaceMapType(value) {
      //切换不同地图方法
      this.$store.commit('mapStatus/setMapTypeStatus', value.key)
      this.typeName = value.key
    },
    setShowAdjust(value) {
      this.showAdjust = value.flag
      this.activeName = value.activeName
    },
    onChangeLayerClick(value) {
      this.selectPoint = value
    },
    reset() {
      this.selectPoint = ''
    },
    onChangePositionClick(value) {
      this.position = value
    }
  }
}
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.btns {
  position: fixed;
  right: 5%;
  .square {
    position: absolute;
    border: 25px solid transparent;
    border-left-color: #fff;
    left: -34px;
    z-index: 1;
    top: 10px;
  }
  > div {
    width: 79px;
    height: 79px;
    background: #fff;
    box-shadow: 0px 3px 15px 0px rgba(3, 18, 55, 0.2);
    margin-top: 24px;
    border-radius: 100%;
    text-align: center;
    position: relative;
    color: #616161;
    &:nth-child(1) {
      margin-top: 67px;
      margin-bottom: 113px;
    }
    &.icon_3 {
      margin-top: 110px;
    }
    /deep/ {
      > i {
        line-height: 79px;
        font-size: 50px;
        &.active {
          color: rgba(0, 140, 227, 1);
        }
      }
    }
    .icon-type {
      line-height: 79px;
    }
    .list {
      height: 191px;
      position: absolute;
      right: 110px;
      top: -39px;
      display: flex;
      box-shadow: 0px 2px 10px 0px rgba(3, 18, 55, 0.2);
      background-color: #fff;
      border-radius: 10px;
      padding-left: 31px;
      padding-top: 20px;
      &.list_1 {
        height: 79px;
        padding: 0;
        width: 275px;
        top: 0;
      }
      .map-type {
        margin-right: 31px;
        position: relative;
        img {
          width: 140px;
          height: 107px;
          display: inline-block;
          position: relative;
          border-radius: 8px;
          &.active {
            border: 7px solid rgba(0, 140, 227, 1);
            border-bottom-width: 32px;
            &:after {
              display: block;
              content: "√";
              font-size: 24px;
              color: #fff;
              position: absolute;
              bottom: -32px;
              font-weight: bold;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
        b {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 63px;
          color: #fff;
          font-weight: normal;
          font-size: 24px;
        }
      }
      .layer-height {
        width: 275px;
        height: 79px;
        background: #ffffff;
        font-size: 28px;
        font-weight: 500;
        color: #202020;
        position: relative;
        &:nth-child(1) {
          border-radius: 10px 0px 0 10px;
          &:before {
            display: block;
            content: "";
            width: 2px;
            height: 42px;
            background-color: rgba(236, 236, 236, 1);
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &:nth-child(2) {
          border-radius: 0px 10px 10px 0;
        }
        &.active {
          background: #efefef;
        }
        span {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
      }

      &.list_2 {
        .layer-height:nth-child(2) {
          width: 550px;
        }
      }
    }
    .line {
      width: 15px;
      height: 23px;
      box-shadow: 0px 3px 15px 0px rgba(3, 18, 55, 0.2);
      background-color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 78px;
      z-index: 10;
    }
    .reset {
      width: 65px;
      height: 65px;
      background: #fff;
      box-shadow: 0px 3px 15px 0px rgba(3, 18, 55, 0.2);
      margin-top: 20px;
      border-radius: 100%;
      margin-left: 7px;
      i {
        line-height: 65px;
        color: #999999;
        font-size: 40px;
      }
    }
  }
}
.adjust-div {
  position: absolute;
  bottom: 68px;
  left: 50%;
  transform: translateX(-50%);
  // &:before {
  //   display: block;
  //   content: '';
  //   border: 20px solid transparent;
  //   border-bottom-color: #fff;
  //   position: absolute;
  //   top: -35px;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   z-index: 2;
  // }
  .adjust {
    width: 352px;
    height: 129px;
    background: #ffffff;
    box-shadow: 0px 2px 30px 0px rgba(3, 18, 55, 0.22);
    font-size: 32px;
    color: #323332;
    padding-left: 0;
    padding-right: 0;
    &.activeName {
      width: 549px;
    }
    /deep/ {
      span {
        position: relative;
        z-index: 10;
        display: inline-block;
        height: 100%;
        line-height: 129px;
        width: 100%;
        text-align: center;
      }
      i {
        margin-right: 13px;
      }
    }
  }
  .my-icon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    top: -1px;
    color: rgba(185, 185, 183, 1);
  }
  .attrbute {
    // margin-left: 86px;
  }
}
</style>
