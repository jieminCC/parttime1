<template>
  <div>
    <div v-show="queryData.length===0" class="no-data">
      <img src="./images/noData.png" alt="">
      <br />
      暂时没有属性信息
    </div>
   
    <van-tabs v-model="itemName" title-active-color="rgba(0,140,227,1)" title-inactive-color="rgba(32,32,32,1)" class="tabs" v-if="queryData.length>0" :sticky="true" :ellipsi="true" :swipeable="true" swipe-threshold="1">
      <van-tab v-for="(item,index) in queryData" :name="item.layername" :title="item.layername" :key="index" title-style="width:auto;overflow-x:inherit;flex-basis:auto;min-width:auto">
        <div v-if="item['features'].length>0">
          <div v-for="(item1,index1) in item['features']" :key="index1">
            <div v-for="(key,i) in item1['properties']" :key="i" class="attr">
              <span>{{i}}：</span>
              <span class="key-content">{{key==='Null' ||key==='NULL'?'无':key }}</span>
            </div>
          </div>
        </div>
        <div v-if="item['features'].length===0" class="no-data">
          <img src="./images/noData.png" alt="">
           <br />
            暂时没有属性信息
        </div>

      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  props: ['activeName'],
  data() {
    return {
      itemName: ''
    }
  },
  computed: {
    items() {
      return this.$store.state.layerData.layerData
    },
    queryData: {
      get() {
        return this.$store.state.layerData.queryData
      },
      set(val) {
        this.$store.commit('layerData/clearQueryData', val)
      }
    }
  },
  watch: {
    queryData(val) {
      this.itemName = ''
      if (val.length > 0) {
        this.itemName = val[0].layername
      }
    },
    items(val) {
      if (val.length === 0) {
        this.queryData.splice(0)
      }
    }
  },
  created() { },
  mounted() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
.no-data {
  text-align: center;
  color: rgba(177, 177, 177, 1);
  font-size: 25px;
  img {
    width: 325px;
    height: 257px;
    margin-top: 130px;
  }
}
.tabs {
  margin-top: 50px;
  /deep/ {
    .van-tab {
      flex: 0 0 22%;
    }
    .van-tabs__line {
      background-color: rgba(0, 140, 227, 1);
    }
    [class*="van-hairline"]::after {
      border-top: none;
    }
    .van-tabs__content {
      height: 437px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .van-ellipsis {
      overflow-x: inherit;
      overflow-y: hidden;
      white-space: inherit;
    }
  }
  .attr {
    min-height: 81px;
    margin: 0 21px;
    padding-left: 15px;
    line-height: 81px;
    border-bottom: 1px solid rgba(241, 241, 241, 1);
    display:flex;
    position:relative;
    &:nth-child(1) {
      margin-top: 30px;
    }
    &:before {
      width: 8px;
      height: 27px;
      opacity: 0.3;
      background: #008ce3;
      content: " ";
      border-radius: 25%;
      margin-right: 24px;
      position:absolute;
      top:25px;
    }
    span:nth-child(1) {
      color: rgba(136, 136, 136, 1);
      font-size: 28px;
      margin-left:20px;
    }
    span:nth-child(2) {
      color: #000;
      font-size: 28px;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    }
  }
}
</style>
