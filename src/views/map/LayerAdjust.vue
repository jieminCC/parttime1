<template>
  <div v-show="activeName===0">
    <div class="title">
      <van-button round class="title-btn" @click="isdrag=!isdrag" :class="{active:isdrag===false}">
        <i class="icon iconfont icon-tiaozhengtoumingdu"></i>
        调整透明度
      </van-button>

      <van-button round class="title-btn remove" @click="removeAll()">
        <i class="icon iconfont icon-quanbushanchu"></i>
        清空图层
      </van-button>
    </div>
    <div class="content">
      <div class="content-title">
        已叠加图层
      </div>
      <SlickList lockAxis="y" v-model="items" class="slickList" :pressDelay="pressDelay" v-show="isdrag===true">
        <SlickItem v-for="(item, index) in items" :index="index" :key="index" class="list" style="width: 9.12rem;height: 1.013333rem;background: #f3f9fc; border-radius: 0.133333rem;line-height:1.013333rem;
        padding-left:0.16rem;margin:0.24rem 0.44rem;visibility:visible;opacity:1">
          <i class="icon iconfont icon-overlay" style="vertical-align: middle;"></i>
          {{item.layername}}
        </SlickItem>
      </SlickList>
      <div>
        <!-- 调整透明度 -->
        <ul class="slickList" v-show="isdrag===false">
          <li v-for="(item, index) in items" :key="index" class="list">
            <!-- <i class="icon iconfont icon-overlay" style="vertical-align: middle;"></i> -->
            {{item.layername}}
            <van-slider v-model="item.opacity" :min="0" :max="100" step='1' @input="onChange(item)">
              <template #button>
                <div class="custom-button" :style="{left:(item.opacity)*1===0?'0px':''}">
                  {{ item.opacity }}%
                </div>
              </template>
            </van-slider>
          </li>
        </ul>
      </div>
      <div class="tips">长按并拖拽可重新排序</div>
    </div>
  </div>
</template>
<script>
import { SlickList, SlickItem } from 'vue-slicksort'
export default {
  name: '',
  components: { SlickList, SlickItem },
  directives: {},
  filters: {},
  mixins: [],
  props: ['activeName'],
  data() {
    return {
      isdrag: true,
      pressDelay: 500,
      opacity: 100
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
    }
  },
  watch: {
    items(val) {
      console.log(val)
    }
  },
  created() { },
  mounted() {
  },
  methods: {
    removeAll() {
      this.$dialog.confirm({
        // title: '标题',
        message: '<span class="message">确定清空图层吗</span>',
        confirmButtonText: '清空'
      }).then(() => {
        // 确定
        this.items.splice(0)
      })
        .catch(() => {
          // 取消
        });
    },
    onChange(value) {
      let params = {
        url: value.url + '/',
        opacity: value.opacity,
        sindex: value.sindex
      }
      this.$store.commit('mapStatus/setOpacity', params)
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  height: 100px;
  padding-top: 24px;
  padding-left: 34px;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
  position: relative;
  /deep/ {
    .van-button:active::before {
      opacity: 0;
    }
  }
  .title-btn {
    width: 228px;
    height: 59px;
    border: 0;
    background-color: #fff;
    color: #6f6f6f;
    font-size: 28px;
    padding: 16px 15px;
    line-height: 25px;
    i {
      margin-right: 0px;
      vertical-align: bottom;
      margin-top: -3px;
    }

    &.remove {
      position: absolute;
      right: 32px;
      top: 29px;
    }
    &.active {
      color: #4e4e4e;
      background: #eaf7ff;
      border: 1px solid #ebedf0;
    }
  }
}
.content {
  .content-title {
    font-size: 26px;
    color: #848484;
    margin-top: 24px;
    margin-left: 32px;
  }
  .slickList {
    height: 389px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .list {
    i {
      vertical-align: middle;
    }
    width: 684px;
    height: 76px;
    background: #f3f9fc;
    border-radius: 10px;
    line-height: 76px;
    padding-left: 12px;
    margin: 18px 33px;
    visibility: visible;
    /deep/ {
      .van-slider {
        top: -20px;
      }
    }
    .custom-button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 10px;
      background: #e0f3ff;
      color: #000;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      position: relative;
      left: -25px;
    }
  }
  .tips {
    text-align: center;
    margin-top: 29px;
    margin-bottom: 29px;
    color: #b1b1b1;
    font-size: 26px;
  }
}
</style>
