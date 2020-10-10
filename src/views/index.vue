<template>
  <div class="main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-divider class="no-more">没有更多了</van-divider>
    <van-tabbar v-model="activeUrl">
      <van-tabbar-item v-for="(item,i) in tabRouter" :key="i" :name="item.url" :to="item.url">
        <i :class="item.icon" slot="icon"></i>
        {{item.name}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      tabRouter: [
        {
          icon: 'icon-zhuye1',
          name: '首页',
          url: 'home'
        },
        {
          icon: 'icon-xuncha1',
          name: '巡查',
          url: 'patrol'
        },
        {
          icon: 'icon-lishi1',
          name: '历史',
          url: 'history'
        },
        {
          icon: 'icon-wode1',
          name: '我的',
          url: 'mine'
        }
      ],
      activeUrl: 'home'
    }
  },
  watch: {
    $route: {
      handler(val) {
        // 获取子路由
        if (val.path.split('/').length > 2) {
          let url = val.path.split('/')[2]
          if (this.activeUrl != url)
            this.activeUrl = url
        }
      }
    }
  },
  methods: {
    // onTabbarChange(index) {
    //   let url = this.tabRouter[index].url
    //   this.$router.push(url)
    // }
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 98px;

  .no-more {
    position: absolute;
    // bottom: 0;
    width: 100%;
    height: 98px;
    margin: 0;
  }

  .van-tabbar {
    height: 98px;
    /deep/ .van-tabbar-item__icon {
      margin-bottom: 0;
      font-size: 50px;
    }
  }
}
</style>
