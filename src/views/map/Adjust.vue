<template>
  <div class="adjust">
    <span class="icon iconfont icon-jiantou1 up" @click="shrink"></span>
    <LayerAdjust v-show="myactiveName===0"  :activeName="myactiveName" />

    <LayerInfo v-show="myactiveName===1"  :activeName="myactiveName" />

    <div class="btns">
      <van-button round class="button" :class="{active:myactiveName===0}" @click="myactiveName=0"><i class="icon iconfont icon-tiaozhengtuceng"></i>图层调整</van-button>
      <van-button round class="button button2" :class="{active:myactiveName===1}" @click="myactiveName=1"><i class="icon iconfont icon-shuxingxinxi"></i>属性信息</van-button>
    </div>

  </div>
</template>
<script>
import LayerInfo from './LayerInfo'
import LayerAdjust from './LayerAdjust'
export default {
  name: '',
  components: { LayerInfo, LayerAdjust },
  directives: {},
  filters: {},
  mixins: [],
  props: ['activeName'],
  data() {
    return {
      // items: ,
      myactiveName: 0,
      opacity: [],


    }
  },
  computed: {
    items(){
       return this.$store.state.layerData.layerData
    },
    queryData(){
       return this.$store.state.layerData.queryData
    }
    
  },
  watch: {
    activeName(val){
      this.myactiveName=val
    },
    queryData(val){
      if(val.length && this.myactiveName===1){
        this.$emit('setShowAdjust',{flag:true,activeName:this.myactiveName})
      }
       
    }
  },
  created() { },
  mounted() {
     this.myactiveName=this.activeName
   },
  methods: {
    shrink(){
      // if(this.activeName===0){

      // }
      this.$emit('setShowAdjust',{flag:false,activeName:this.myactiveName})
    }
  }
}
</script>
<style lang="scss" scoped>
.adjust {
  width: 100%;
  height: 742px;
  box-shadow: 0px 2px 10px 0px rgba(3, 18, 55, 0.19);
  background-color: #fff;
  position: absolute;
  bottom: 0;
  border-radius: 30px 30px 0 0;
  .up {
    color: rgba(206, 206, 206, 1);
    position: absolute;
    top: -4%;
    left: 43%;
    transform: rotate(-180deg) translateX(-50%);
    margin-bottom: 22px;
    font-size: 55px;
    z-index:10
  }
  .btns {
    height: 112px;
    box-shadow: 0px 2px 10px 0px rgba(3, 18, 55, 0.12);
    border-radius: 20px;
    position: absolute;
    bottom: 0;
    width: 100%;
    .button {
      width: 227px;
      height: 79px;
      background-color: #fff;
      border: none;
      position: absolute;
      left: 51px;
      top: 50%;
      transform: translateY(-50%);
      line-height:79px;
      padding-top:0;
      /deep/{
        i{
          margin-right:13px;
        }
      }
      &.button2 {
        left: auto;
        right: 67px;
      }
      &.active {
        border: 1px solid #ebedf0;
        background: #eaf7ff;
        color: #008ce3;
        padding-left:0;
        padding-right:0;
      }
    }
  }
}
</style>
