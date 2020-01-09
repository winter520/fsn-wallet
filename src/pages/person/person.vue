<template>
  <div class="p-box">
    <div class="p-header-box">
      <div class="W50 flex-c" style="margin:0 auto 10px">
        <img src="@/assets/img/logo.png" class="WW100">
      </div>
      <div class="flex-c"> FUSION Wallet </div>
      <p class="flex-c font12">一款简约轻量的Fusion钱包</p>
    </div>
    <div class="p-list-box">
      <ul>
        <li class="item flex-bc">
          <span class="flex-c"><van-icon name="paid" class="font18 mr-10"/>钱包管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="item flex-bc">
          <span class="flex-c"><van-icon name="records" class="font18 mr-10" />地址管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="item flex-bc">
          <span class="flex-c"><van-icon name="aim" class="font18 mr-10" />节点设置</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-box {
  width: 100%;height: 100%;background: #eee;padding-bottom: 50px;
}
.p-header-box {
  padding: 15px;background: #bae5ff;
}
.p-list-box {
  background: #fff;margin-top: 15px;
  .item {
    padding: 12px 15px;border-bottom: 1px solid #eee;font-size: 14px;color: #333333;cursor: pointer;
  }
}
</style>

<script>

export default {
  name: 'person',

}
</script>